# Team X Fifteen Backend API

A robust TypeScript + Express + MongoDB backend featuring an **Authentication System**, **Admin-Only User Management**, and **Events & Seminar Management**.

---

## 🚀 Getting Started

### 1. Configure Environment Variables
Ensure `.env` in the root directory contains:
```env
NODE_ENV=development
PORT=5000
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/team_fifteen
JWT_ACCESS_SECRET=team_x_fifteen_super_secret_jwt_key_2026_eastdelta
JWT_TOKEN_EXPIRES_IN=7d
ADMIN_EMAIL=admin@eastdelta.edu.bd
ADMIN_PASSWORD=Admin@123456
```

### 2. Run the Server
```bash
npm run dev
```

> **Note**: On startup, the backend automatically connects to MongoDB and:
> 1. Auto-creates the default Admin user (`admin@eastdelta.edu.bd` / `Admin@123456`) if no admin exists.
> 2. Auto-seeds the initial 8 events (`EVENTS_DATA`) if the collection is empty.

---

## 🔐 1. Authentication System Endpoints

All authentication routes are accessible at `/api/v1/auth` (or `/auth`, `/api/auth`).

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/v1/auth/register` (or `/signup`) | Public | Register new user account (returns user details & JWT access token) |
| **POST** | `/api/v1/auth/login` (or `/signin`) | Public | Login with email and password (returns user details & JWT access token) |
| **GET** | `/api/v1/auth/me` (or `/profile`) | Authenticated | Get currently authenticated user profile |
| **POST** | `/api/v1/auth/change-password` | Authenticated | Change password with `oldPassword` and `newPassword` |

### Default Admin Credentials (Auto-created on startup)
- **Email**: `admin@eastdelta.edu.bd`
- **Password**: `Admin@123456`
- **Role**: `admin`

### Example Register Payload (`POST /api/v1/auth/register`):
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@eastdelta.edu.bd",
  "password": "Password123!",
  "department": "Department of Computer Science & Engineering",
  "studentId": "2026-CSE-001",
  "phone": "+880 1800 000000"
}
```

### Example Login Payload (`POST /api/v1/auth/login`):
```json
{
  "email": "admin@eastdelta.edu.bd",
  "password": "Admin@123456"
}
```

### Example Login / Register Response:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "66d3a1f4...",
      "name": "System Administrator",
      "email": "admin@eastdelta.edu.bd",
      "role": "admin",
      "status": "active",
      "department": "Administration"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 👥 2. User Management (Admin Only)

All user management routes are protected by the `auth("admin")` middleware. Pass your JWT token in the header:
```
Authorization: Bearer <your_jwt_access_token>
```

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/users` | Admin Only | Get all users with search, role/status filtering, and pagination |
| **GET** | `/api/v1/users/stats` | Admin Only | Get total user count, admin count, active/blocked counts |
| **GET** | `/api/v1/users/:id` | Admin Only | Get single user details by ID |
| **PATCH** | `/api/v1/users/:id/role` | Admin Only | Update user role (`admin`, `user`, `moderator`) |
| **PATCH** | `/api/v1/users/:id/status` | Admin Only | Update user status (`active`, `blocked`, `inactive`) |
| **PATCH** | `/api/v1/users/:id` | Admin Only | Update user profile data |
| **DELETE** | `/api/v1/users/:id` | Admin Only | Delete user account |

### Query Parameters for `GET /api/v1/users`:
- `search` / `searchTerm`: Search by name, email, department, studentId, phone
- `role`: Filter by `admin`, `user`, or `moderator`
- `status`: Filter by `active`, `blocked`, or `inactive`
- `department`: Filter by department
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Field to sort by (`createdAt`, `name`, `email`)
- `sortOrder`: `asc` or `desc`

---

## 📅 3. Events Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/v1/events` (or `/events`) | Get all events with search, filters, pagination & sorting |
| **GET** | `/api/v1/events/:id` | Get single event by custom slug `id` (e.g. `edu-mind-mastery-2026`) or MongoDB `_id` |
| **GET** | `/api/v1/events/featured` | Get featured events |
| **GET** | `/api/v1/events/categories` | Get all unique categories with event counts |
| **GET** | `/api/v1/events/departments` | Get all unique departments with event counts |
| **GET** | `/api/v1/events/stats` | Get overview statistics (total events, occupancy, etc.) |
| **POST** | `/api/v1/events` | Create a new event (validated via Zod) |
| **PATCH** / **PUT** | `/api/v1/events/:id` | Update an existing event |
| **DELETE** | `/api/v1/events/:id` | Delete an event |
| **POST** | `/api/v1/events/:id/register` | Register a participant for an event |
| **POST** | `/api/v1/events/seed` | Seed / re-seed default initial `EVENTS_DATA` into MongoDB |
