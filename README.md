Store Rating System

A Full Stack Web Application that enables users to discover stores, submit ratings, and manage store information through a secure role-based platform.

Developed as a Full Stack Development project using React.js, Express.js, MySQL, and JWT Authentication, this application follows clean architecture principles and provides dedicated dashboards for System Administrators, Normal Users, and Store Owners.

Project Overview

The Store Rating System is designed to simplify the process of managing stores and collecting user feedback through a centralized platform.

The application provides secure authentication, role-based authorization, CRUD operations, rating management, search & sorting functionality, dashboard analytics, and responsive user interfaces.

Features

Authentication
- Secure Login System
- User Registration
- JWT Authentication
- Role-Based Authorization
- Protected Routes
- Logout Functionality
- Change Password

System Administrator

- Dashboard with statistics
  - Total Users
  - Total Stores
  - Total Ratings

- User Management
  - Add User
  - Edit User
  - Delete User
  - View User Details

- Store Management
  - Add Store
  - Edit Store
  - Delete Store
  - View Store Details

- Search & Filter
  - Name
  - Email
  - Address

- Sorting
  - Ascending
  - Descending

Normal User

- Register Account
- Secure Login
- Browse Registered Stores
- Search Stores
- Submit Ratings (1–5)
- Update Submitted Rating
- Change Password
- Logout

Store Owner

- Secure Login
- Dashboard
- View Average Store Rating
- View Users Who Submitted Ratings
- Change Password
- Logout


Tech Stack
 
Frontend

- React.js
- React Router DOM
- Bootstrap 5
- Axios
- React Toastify

Backend

- Node.js
- Express.js
- Sequelize ORM
- JWT Authentication
- bcrypt.js

Database

- MySQL

Project Structure

Store-Rating-System
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── validators
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   └── App.jsx
│   └── package.json
│
└── README.md

Application will run on:

Frontend:
http://localhost:5173

Backend:
http://localhost:5000


Database

The project uses MySQL with Sequelize ORM.

Main Tables:

- Users
- Stores
- Ratings

Relationships:

- One Store Owner → Many Stores
- One User → Many Ratings
- One Store → Many Ratings

Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Role-Based Access Control
- Input Validation
- Secure Password Update

Future Enhancements

- Email Verification
- Forgot Password
- Profile Management
- Pagination
- Image Upload for Stores
- Advanced Filters
- Dark Mode
- REST API Documentation
