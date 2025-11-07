"""
Residential Apartment Rental Portal - Backend API
Author: Nancy Verma
Flask REST API for apartment management system
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime, timedelta
import os
from database import db, init_db, User, Unit, Amenity, Booking, Lease

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    'postgresql://apartment_user:apartment_pass@postgres:5432/apartment_db'
)

CORS(app)
jwt = JWTManager(app)
db.init_app(app)

# JWT Error Handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({'error': 'Token has expired'}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({'error': 'Invalid token', 'details': str(error)}), 422

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({'error': 'Authorization token is missing'}), 401

# Initialize database
with app.app_context():
    try:
        init_db()
    except Exception as e:
        print(f"Database initialization note: {e}")

# Authentication endpoints
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')
    
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    hashed_password = generate_password_hash(password)
    user = User(username=username, email=email, password_hash=hashed_password, role=role)
    db.session.add(user)
    db.session.commit()
    
    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        'access_token': access_token,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role
        }
    }), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        'access_token': access_token,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role
        }
    })

@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'role': user.role
    })

# Public endpoints - Units and Amenities
@app.route('/api/units', methods=['GET'])
def get_units():
    units = Unit.query.filter_by(is_available=True).all()
    return jsonify([{
        'id': u.id,
        'tower_name': u.tower_name,
        'unit_number': u.unit_number,
        'bedrooms': u.bedrooms,
        'bathrooms': u.bathrooms,
        'area': u.area,
        'rent': u.rent,
        'is_available': u.is_available,
        'amenities': [a.name for a in u.amenities]
    } for u in units])

@app.route('/api/amenities', methods=['GET'])
def get_amenities():
    amenities = Amenity.query.all()
    return jsonify([{
        'id': a.id,
        'name': a.name,
        'description': a.description,
        'icon': a.icon
    } for a in amenities])

# Booking endpoints
@app.route('/api/bookings', methods=['GET'])
@jwt_required()
def get_bookings():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    
    if user.role == 'admin':
        bookings = Booking.query.all()
    else:
        bookings = Booking.query.filter_by(user_id=user_id).all()
    
    return jsonify([{
        'id': b.id,
        'unit_id': b.unit_id,
        'unit_number': b.unit.unit_number,
        'tower_name': b.unit.tower_name,
        'user_id': b.user_id,
        'user_name': b.user.username,
        'status': b.status,
        'requested_date': b.requested_date.isoformat(),
        'created_at': b.created_at.isoformat()
    } for b in bookings])

@app.route('/api/bookings', methods=['POST'])
@jwt_required()
def create_booking():
    user_id = int(get_jwt_identity())
    data = request.json
    unit_id = data.get('unit_id')
    
    unit = Unit.query.get(unit_id)
    if not unit or not unit.is_available:
        return jsonify({'error': 'Unit not available'}), 400
    
    booking = Booking(
        user_id=user_id,
        unit_id=unit_id,
        status='pending',
        requested_date=datetime.now()
    )
    db.session.add(booking)
    db.session.commit()
    
    return jsonify({
        'id': booking.id,
        'unit_id': booking.unit_id,
        'status': booking.status,
        'requested_date': booking.requested_date.isoformat()
    }), 201

@app.route('/api/bookings/<int:booking_id>/approve', methods=['POST'])
@jwt_required()
def approve_booking(booking_id):
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    booking = Booking.query.get(booking_id)
    if not booking:
        return jsonify({'error': 'Booking not found'}), 404
    
    booking.status = 'approved'
    booking.unit.is_available = False
    
    # Create lease
    lease = Lease(
        user_id=booking.user_id,
        unit_id=booking.unit_id,
        start_date=datetime.now(),
        end_date=datetime.now() + timedelta(days=365),
        monthly_rent=booking.unit.rent,
        status='active'
    )
    db.session.add(lease)
    db.session.commit()
    
    return jsonify({'message': 'Booking approved', 'booking_id': booking.id})

@app.route('/api/bookings/<int:booking_id>/decline', methods=['POST'])
@jwt_required()
def decline_booking(booking_id):
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    booking = Booking.query.get(booking_id)
    if not booking:
        return jsonify({'error': 'Booking not found'}), 404
    
    booking.status = 'declined'
    db.session.commit()
    
    return jsonify({'message': 'Booking declined', 'booking_id': booking.id})

# Admin endpoints - Units
@app.route('/api/admin/units', methods=['GET'])
@jwt_required()
def admin_get_units():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    units = Unit.query.all()
    return jsonify([{
        'id': u.id,
        'tower_name': u.tower_name,
        'unit_number': u.unit_number,
        'bedrooms': u.bedrooms,
        'bathrooms': u.bathrooms,
        'area': u.area,
        'rent': u.rent,
        'is_available': u.is_available,
        'amenities': [{'id': a.id, 'name': a.name} for a in u.amenities]
    } for u in units])

@app.route('/api/admin/units', methods=['POST'])
@jwt_required()
def admin_create_unit():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.json
    unit = Unit(
        tower_name=data.get('tower_name'),
        unit_number=data.get('unit_number'),
        bedrooms=data.get('bedrooms'),
        bathrooms=data.get('bathrooms'),
        area=data.get('area'),
        rent=data.get('rent'),
        is_available=data.get('is_available', True)
    )
    
    amenity_ids = data.get('amenity_ids', [])
    if amenity_ids:
        amenities = Amenity.query.filter(Amenity.id.in_(amenity_ids)).all()
        unit.amenities = amenities
    
    db.session.add(unit)
    db.session.commit()
    
    return jsonify({
        'id': unit.id,
        'tower_name': unit.tower_name,
        'unit_number': unit.unit_number
    }), 201

@app.route('/api/admin/units/<int:unit_id>', methods=['PUT'])
@jwt_required()
def admin_update_unit(unit_id):
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    unit = Unit.query.get(unit_id)
    if not unit:
        return jsonify({'error': 'Unit not found'}), 404
    
    data = request.json
    unit.tower_name = data.get('tower_name', unit.tower_name)
    unit.unit_number = data.get('unit_number', unit.unit_number)
    unit.bedrooms = data.get('bedrooms', unit.bedrooms)
    unit.bathrooms = data.get('bathrooms', unit.bathrooms)
    unit.area = data.get('area', unit.area)
    unit.rent = data.get('rent', unit.rent)
    unit.is_available = data.get('is_available', unit.is_available)
    
    amenity_ids = data.get('amenity_ids')
    if amenity_ids is not None:
        amenities = Amenity.query.filter(Amenity.id.in_(amenity_ids)).all()
        unit.amenities = amenities
    
    db.session.commit()
    return jsonify({'message': 'Unit updated', 'unit_id': unit.id})

@app.route('/api/admin/units/<int:unit_id>', methods=['DELETE'])
@jwt_required()
def admin_delete_unit(unit_id):
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    unit = Unit.query.get(unit_id)
    if not unit:
        return jsonify({'error': 'Unit not found'}), 404
    
    db.session.delete(unit)
    db.session.commit()
    return jsonify({'message': 'Unit deleted'})

# Admin endpoints - Amenities
@app.route('/api/admin/amenities', methods=['GET'])
@jwt_required()
def admin_get_amenities():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    amenities = Amenity.query.all()
    return jsonify([{
        'id': a.id,
        'name': a.name,
        'description': a.description,
        'icon': a.icon
    } for a in amenities])

@app.route('/api/admin/amenities', methods=['POST'])
@jwt_required()
def admin_create_amenity():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.json
    amenity = Amenity(
        name=data.get('name'),
        description=data.get('description', ''),
        icon=data.get('icon', '🏢')
    )
    db.session.add(amenity)
    db.session.commit()
    
    return jsonify({
        'id': amenity.id,
        'name': amenity.name,
        'description': amenity.description,
        'icon': amenity.icon
    }), 201

# Admin endpoints - Reports
@app.route('/api/admin/reports/occupancy', methods=['GET'])
@jwt_required()
def get_occupancy_report():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    total_units = Unit.query.count()
    occupied_units = Unit.query.filter_by(is_available=False).count()
    available_units = total_units - occupied_units
    occupancy_rate = (occupied_units / total_units * 100) if total_units > 0 else 0
    
    return jsonify({
        'total_units': total_units,
        'occupied_units': occupied_units,
        'available_units': available_units,
        'occupancy_rate': round(occupancy_rate, 2)
    })

@app.route('/api/admin/reports/payments', methods=['GET'])
@jwt_required()
def get_payments_report():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    leases = Lease.query.filter_by(status='active').all()
    payments = []
    for lease in leases:
        payments.append({
            'lease_id': lease.id,
            'tenant_name': lease.user.username,
            'unit': f"{lease.unit.tower_name} - {lease.unit.unit_number}",
            'monthly_rent': lease.monthly_rent,
            'status': 'paid',
            'due_date': (datetime.now() + timedelta(days=5)).strftime('%Y-%m-%d')
        })
    
    total_revenue = sum(p['monthly_rent'] for p in payments)
    
    return jsonify({
        'payments': payments,
        'total_revenue': total_revenue,
        'active_leases': len(payments)
    })

@app.route('/api/admin/tenants', methods=['GET'])
@jwt_required()
def get_tenants():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    leases = Lease.query.filter_by(status='active').all()
    tenants = []
    for lease in leases:
        tenants.append({
            'user_id': lease.user.id,
            'username': lease.user.username,
            'email': lease.user.email,
            'unit': f"{lease.unit.tower_name} - {lease.unit.unit_number}",
            'lease_start': lease.start_date.isoformat(),
            'lease_end': lease.end_date.isoformat(),
            'monthly_rent': lease.monthly_rent
        })
    
    return jsonify(tenants)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

