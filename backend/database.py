"""
Residential Apartment Rental Portal - Database Models
Author: Nancy Verma
Database schema and initialization for apartment management system
"""

import os
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='user')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    bookings = db.relationship('Booking', backref='user', lazy=True)
    leases = db.relationship('Lease', backref='user', lazy=True)

class Unit(db.Model):
    __tablename__ = 'units'
    id = db.Column(db.Integer, primary_key=True)
    tower_name = db.Column(db.String(100), nullable=False)
    unit_number = db.Column(db.String(50), nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    area = db.Column(db.Float, nullable=False)
    rent = db.Column(db.Float, nullable=False)
    is_available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    bookings = db.relationship('Booking', backref='unit', lazy=True)
    leases = db.relationship('Lease', backref='unit', lazy=True)
    amenities = db.relationship('Amenity', secondary='unit_amenities', backref='units')

unit_amenities = db.Table('unit_amenities',
    db.Column('unit_id', db.Integer, db.ForeignKey('units.id'), primary_key=True),
    db.Column('amenity_id', db.Integer, db.ForeignKey('amenities.id'), primary_key=True)
)

class Amenity(db.Model):
    __tablename__ = 'amenities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    icon = db.Column(db.String(20), default='🏢')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    unit_id = db.Column(db.Integer, db.ForeignKey('units.id'), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, approved, declined
    requested_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Lease(db.Model):
    __tablename__ = 'leases'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    unit_id = db.Column(db.Integer, db.ForeignKey('units.id'), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    monthly_rent = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='active')  # active, expired
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

def init_db():
    db.create_all()
    
    admin_email = os.getenv('ADMIN_EMAIL', 'admin@apartment.com')
    admin_password = os.getenv('ADMIN_PASSWORD', 'admin123')

    # Create default admin user
    if not User.query.filter_by(email=admin_email).first():
        admin = User(
            username='admin',
            email=admin_email,
            password_hash=generate_password_hash(admin_password),
            role='admin'
        )
        db.session.add(admin)
        db.session.commit()
    
    seed_sample_data = os.getenv('SEED_SAMPLE_DATA', 'true').lower() == 'true'

    # Create default amenities
    if seed_sample_data and Amenity.query.count() == 0:
        amenities = [
            Amenity(name='Gym', description='Fully equipped fitness center', icon='🏋️'),
            Amenity(name='Swimming Pool', description='Outdoor swimming pool', icon='🏊'),
            Amenity(name='Parking', description='Covered parking spaces', icon='🚗'),
            Amenity(name='Security', description='24/7 security services', icon='🔒'),
            Amenity(name='Garden', description='Landscaped gardens', icon='🌳'),
            Amenity(name='Playground', description='Children playground', icon='🛝')
        ]
        for amenity in amenities:
            db.session.add(amenity)
        db.session.commit()
    
    # Create sample units
    if seed_sample_data and Unit.query.count() == 0:
        units = [
            Unit(tower_name='Tower A', unit_number='A-101', bedrooms=2, bathrooms=2, area=1200, rent=25000, is_available=True),
            Unit(tower_name='Tower A', unit_number='A-102', bedrooms=3, bathrooms=2, area=1500, rent=30000, is_available=True),
            Unit(tower_name='Tower B', unit_number='B-201', bedrooms=2, bathrooms=1, area=1100, rent=22000, is_available=True),
            Unit(tower_name='Tower B', unit_number='B-202', bedrooms=4, bathrooms=3, area=2000, rent=40000, is_available=True),
            Unit(tower_name='Tower C', unit_number='C-301', bedrooms=1, bathrooms=1, area=800, rent=18000, is_available=True),
        ]
        
        gym = Amenity.query.filter_by(name='Gym').first()
        pool = Amenity.query.filter_by(name='Swimming Pool').first()
        parking = Amenity.query.filter_by(name='Parking').first()
        
        for unit in units:
            unit.amenities = [gym, pool, parking]
            db.session.add(unit)
        db.session.commit()

