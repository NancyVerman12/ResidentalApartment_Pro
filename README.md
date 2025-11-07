# Residential Apartment Rental Portal

A full-stack web application for managing apartment rentals with separate interfaces for residents and administrators. Built with Angular, Flask, and PostgreSQL.

**Author:** Nancy Verma

## Overview

This project provides a complete solution for apartment management companies to handle unit listings, bookings, tenant management, and reporting. The application consists of two main portals:

- **Resident Portal**: Browse available apartments, view amenities, request bookings, and track booking status
- **Admin Portal**: Manage units, approve/decline bookings, handle tenants, and generate reports

## Features

### Resident Features
- Browse and search available apartments with filters (location, bedrooms, rent)
- View detailed property information including amenities and pricing
- Request bookings for available units
- Track booking status (pending, approved, declined)

### Admin Features
- Manage apartment units (add, edit, delete)
- Manage building amenities
- Approve or decline booking requests
- View and manage active tenants
- Generate occupancy and revenue reports
- View payment analytics

## Tech Stack

**Frontend:**
- Angular 19 (TypeScript)
- Tailwind CSS for styling
- Standalone components architecture

**Backend:**
- Python Flask
- Flask-JWT-Extended for authentication
- Flask-SQLAlchemy for ORM
- PostgreSQL database

**Deployment:**
- Docker and Docker Compose
- Ready for Google Cloud Platform deployment

## Getting Started

### Prerequisites

You'll need the following installed:
- Node.js 20+ and npm
- Python 3.11+
- PostgreSQL 14+ (or Docker Desktop)
- Git

### Quick Start with Docker

The easiest way to get everything running:

```bash
git clone https://github.com/NancyVerman12/ResidentalApartment.git
cd ResidentalApartment
docker-compose up --build
```

Then access:
- Frontend: http://localhost:4200
- Backend API: http://localhost:5000

### Local Development Setup

If you prefer running services separately:

**Backend:**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
export DATABASE_URL="postgresql://apartment_user:apartment_pass@localhost:5432/apartment_db"
export JWT_SECRET_KEY="your-secret-key-here"
python app.py
```

**Frontend:**

```bash
cd frontend
npm install
npm start
```

## Default Credentials

**Admin Account:**
- Email: `admin@apartment.com`
- Password: `admin123`

**Note:** Change these credentials before deploying to production.

## Sample Data

On first run, the application automatically creates:
- 5 sample apartment units (prices range from ₹18,000 to ₹40,000 per month)
- 6 amenities (Gym, Swimming Pool, Parking, Security, Garden, Playground)
- Admin user account

All prices are displayed in Indian Rupees (₹).

## Project Structure

```
ResidentalApartment/
├── frontend/              # Angular application
│   ├── src/app/
│   │   ├── components/    # UI components (public, admin, shared)
│   │   ├── services/     # API and auth services
│   │   ├── guards/       # Route guards
│   │   └── interceptors/ # HTTP interceptors
│   └── Dockerfile
├── backend/              # Flask API
│   ├── app.py           # Main application file
│   ├── database.py      # Models and database initialization
│   └── requirements.txt
└── docker-compose.yml   # Docker orchestration
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires JWT)

### Public Endpoints
- `GET /api/units` - List available units
- `GET /api/amenities` - List amenities

### Booking Endpoints (Authenticated)
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking request

### Admin Endpoints (Admin Role Required)
- `GET /api/admin/units` - List all units
- `POST /api/admin/units` - Create unit
- `PUT /api/admin/units/:id` - Update unit
- `DELETE /api/admin/units/:id` - Delete unit
- `GET /api/admin/amenities` - List amenities
- `POST /api/admin/amenities` - Create amenity
- `POST /api/bookings/:id/approve` - Approve booking
- `POST /api/bookings/:id/decline` - Decline booking
- `GET /api/admin/reports/occupancy` - Occupancy report
- `GET /api/admin/reports/payments` - Payments report
- `GET /api/admin/tenants` - List tenants

## Database Schema

The application uses the following main tables:
- **users** - User accounts (residents and admins)
- **units** - Apartment units
- **amenities** - Building amenities
- **bookings** - Booking requests
- **leases** - Active tenant leases
- **unit_amenities** - Many-to-many relationship between units and amenities

## Configuration

**Backend Environment Variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET_KEY` - Secret key for JWT tokens

**Frontend:**
- API URL configured in `src/app/services/api.service.ts`
- Proxy config in `proxy.conf.json` for local development

## Docker Setup

The project includes complete Docker configuration for easy deployment and development.

### Docker Compose Services

The `docker-compose.yml` file orchestrates three services:

1. **PostgreSQL Database** (`postgres`)
   - Image: `postgres:15-alpine`
   - Port: `5432`
   - Database: `apartment_db`
   - User: `apartment_user` / Password: `apartment_pass`
   - Persistent volume for data storage

2. **Flask Backend API** (`backend`)
   - Built from `backend/Dockerfile`
   - Port: `5000`
   - Auto-initializes database on first run
   - Environment variables configured in `docker-compose.yml`

3. **Angular Frontend** (`frontend`)
   - Built from `frontend/Dockerfile` (multi-stage build)
   - Served via Nginx
   - Port: `4200`
   - Proxies API requests to backend

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/NancyVerman12/ResidentalApartment.git
cd ResidentalApartment

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:4200
# Backend: http://localhost:5000
```

### Docker Commands

```bash
# Start services in background
docker-compose up -d

# View logs
docker-compose logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres

# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Rebuild everything
docker-compose up --build --force-recreate
```

### Dockerfiles

- **`backend/Dockerfile`**: Python 3.11 slim image, installs dependencies, runs Flask app
- **`frontend/Dockerfile`**: Multi-stage build (Node.js for build, Nginx for serving)

## Deployment

For production deployment, you can use Google Cloud Platform or any container orchestration platform.

Before deploying to production:
- Change default admin credentials
- Set a strong JWT_SECRET_KEY
- Configure environment variables properly
- Enable HTTPS
- Set up database backups

## Troubleshooting

**Docker issues:**
```bash
docker-compose down
docker-compose up --build
```

**Database connection problems:**
- Check if PostgreSQL container is running: `docker ps`
- Verify DATABASE_URL environment variable
- Ensure database credentials are correct

**Frontend API errors:**
- Make sure backend is running on port 5000
- Check proxy.conf.json configuration
- Verify CORS settings in backend

**Port conflicts:**
- Ensure ports 4200, 5000, and 5432 are not in use
- Modify ports in docker-compose.yml if needed

## Author

**Nancy Verma**

This project was developed as a full-stack web application demonstrating modern development practices with Angular, Flask, and PostgreSQL. The application showcases skills in frontend development, backend API design, database management, and containerized deployment.

## License

This project is for educational and demonstration purposes.

