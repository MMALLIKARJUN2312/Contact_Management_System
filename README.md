# Contact Management System API 

A comprehensive RESTful API for managing user authentication, contact CRUD operations, and file handling capabilities, including advanced features like user registration, login, email verification, password reset, OTP verification, rate limiting, and file handling through CSV/Excel uploads. This project is built using **Node.js** with **Express.js** for the backend and **MySQL** for database. 

---

## Table of Contents

1. [Objective](#objective)
2. [Features](#features)
3. [Requirements](#requirements)
4. [Technologies Used](#technologies-used)
5. [key dependencies](#key-dependencies)
6. [Installation and Setup](#installation-and-setup)
7. [Database Setup](#database-setup)
8. [ER diagram components](#er-diagram-components)
9. [ER diagram](#er-diagram)
10. [Project Structure](#project-structure)
11. [API Endpoints](#api-endpoints)
- [Register a User](#1-register-a-user)
- [Authenticate a User](#2-authenticate-a-user)
- [Verify email of User](#3-verify-email-of-user)
- [Reset password of User](#4-reset-password-of-user)
- [Update password of User](#5-update-password-of-user)
- [Add a Contact](#6-add-a-contact)
- [Get All Contacts](#7-get-all-contacts)
- [Update a Contact](#8-update-a-contact)
- [Delete a Contact](#9-delete-a-contact)
- [Bulk Upload Contacts via CSV/Excel](#10-bulk-upload-contacts-via-csvexcel)
- [Generate OTP for User](#11-generate-otp-for-user)
- [Verify OTP for User](#12-verify-otp-for-user)
- [Password Reset via OTP](#13-password-reset-via-otp)
12. [Usage](#usage)
13. [Error Handling](#error-handling)
14. [Security Features](#security-features)
15. [License](#license)

---

## Objective

The purpose of this project is to develop an API that enables users to manage contacts efficiently with features like implementing user authentication using JWT, email verification, password reset, OTP-based verification and data validation using **MySQL** as the database. The API provides functionality for user authentication, email verification, OTP verification, and CRUD operations on contacts. Additionally, users can upload contact details via CSV/Excel files.

---

## Features

- **User Authentication** with JWT tokens.
- **Email verification** upon registration.
- **CRUD operations** for managing contacts.
- **OTP Verification** for sensitive operations (password reset, etc.).
- **Rate Limiting** to prevent abuse of sensitive routes.
- Protect routes with JWT-based authentication.
- Error handling and validation.
- Batch processing for contact creation or updates via CSV/Excel.
- Date-time handling with conversion to the user’s specified timezone.

---

## Requirements

- **Node.js**: 16.x or later
- **MySQL**: For database storage
- **Postman**: For API testing
- **Ngrok**: For email services and testing OTPs online.

---

## Technologies Used

- **Backend Framework**: [Node.js](https://nodejs.org) with [Express.js](https://expressjs.com/)
- **Database**: MySQL (using [mysql2](https://www.npmjs.com/package/mysql2) package)
- **Tools**: [Postman](https://www.postman.com/) for API testing
- **Other Tools**: [ngrok](https://ngrok.com/) to expose localhost for testing email services.

---

## Key Dependencies

- **bcrypt**: For password hashing and validation.
- **body-parser (`^1.20.3`)**: Middleware for parsing incoming request bodies.
- **cors (`^2.8.5`)**: Middleware for enabling Cross-Origin Resource Sharing in API requests.
- **dotenv (`^16.4.5`)**: Loads environment variables from `.env` file into `process.env`.
- **express (`^4.21.1`)**: Framework used to build the backend API.
- **express-rate-limit (`^7.4.1`)**: Middleware to limit repeated requests to public APIs.
- **jsonwebtoken (`^9.0.2`)**: Implements JWT for secure authentication.
- **moment-timezone (`^0.5.46`)**: Library for handling and converting timezones.
- **multer: (`^1.4.5-lts.1`):  middleware for handling multipart/form-data, primarily used for uploading files
- **mysql2 (`^3.11.3`)**: MySQL driver for Node.js to interact with the MySQL database.
- **nodemailer (`^6.9.15`)**: Module for sending emails, used for OTP and password reset emails.
- **nodemon (`^3.1.7`)**: Tool for auto-restarting the server during development.
- **sequelize (`^6.37.4`)**: ORM for managing MySQL databases.

---

## Installation and Setup

Follow the below instructions in cmd/bash to install and set up necessary dependencies:

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/contact-management-system.git
cd contact-management-system
```

### Step 2: Initialize the Project

```bash
npm init -y
```

### Step 3: Install Dependencies

```bash
npm install bcrypt body-parser cors dotenv express express-rate-limit jsonwebtoken moment-timezone multer mysql2 nodemailer sequelize
```

### Step 4: Install Development Dependencies

```bash
npm install nodemon --save-dev
```

### Step 5: Database Configuration

Configure the database connection settings in `.env` as follows:

```plaintext
DB_HOST=localhost
DB_NAME=contact_management
DB_USER=root
DB_PASSWORD=Mallik@MYSQL365
JWT_SECRET=your_jwt_secret
EMAIL_USER=mmallikarjunnaidu99@gmail.com
EMAIL_PASS=vyfm amht oznz awwq
BASE_URL=https://6b9a-2409-40f0-30aa-b2a6-10dd-e848-dbb5-4938.ngrok-free.app
PORT=3000
```

### Step 6: Initialize the Database

Create the database in MySQL and configure Sequelize to initialize the tables:

```bash
node config/db.js
```

### Step 7: Run the Application

```bash
npm start
```

### Step 8: Expose Local Server with ngrok

1. Install ngrok if you haven't installed:

```bash
npm install -g ngrok
```

2. Configure ngrok

Add your ngrok authToken to configure your ngrok account:

```bash
ngrok config add-authtoken 5nsZVQzMYBWiOrxCxfWeBQWyVjo_5hYnM9LceZkTteMV9aqDK
```

3. Expose local server with ngrok:

Start ngrok to expose your local server (default port 3000):

```bash
ngrok http 3000
```

Copy the generated ngrok URL (e.g., https://<ngrok-id>.ngrok.io) and use it as BASE_URL in .env file

4. Using the API Endpoints

Use the ngrok URL to access your API endpoints. For example, to verify email:

Ensure to include your authorization token in the request headers as follows:

Authorization: Bearer <ngrok_token>

---

## Database Setup

The database is managed using **MySQL**. Here is the schema for the relevant tables:

### 1. Users Table (`users`)

- **id** (INTEGER): Primary key, auto-incremented.
- **name** (VARCHAR): User’s name.
- **email** (VARCHAR): User’s email, with unique constraint.
- **password** (VARCHAR): Hashed password.
- **isVerified** (BOOLEAN): Status of email verification.
- **verificationToken** (VARCHAR): Verification token.
- **resetToken** (VARCHAR): Reset token.
- **createdAt** (TIMESTAMP): Timestamp of user creation.
- **updatedAt** (TIMESTAMP): Timestamp of updation.

### 2. Contacts Table (`contacts`)

- **id** (INTEGER): Primary key, auto-incremented.
- **userId** (INTEGER): Foreign key linking to `users` table.
- **name** (VARCHAR): Contact name.
- **email** (VARCHAR): Contact email, with unique constraint.
- **phone** (VARCHAR): Contact phone number.
- **address** (TEXT): Contact address.
- **timezone** (VARCHAR): Timezone of the contact.
- **isDeleted** (BOOLEAN): indicates contact is considered (soft delete) and defaults to FALSE
- **createdAt** (TIMESTAMP): Timestamp of contact creation.
- **updatedAt** (TIMESTAMP): Timestamp of contact updation.

### 3. OTPs Table (`otps`)

- **id** (INTEGER): Primary Key, auto-incremented.
- **email** (VARCHAR): email, associated with otp.
- **otp** (VARCHAR): actual OTP value typically 6 digit-code.
- **expiry** (DATETIME): expiration time for otp. 
- **createdAT** (DATETIME): Timestamp when OTP is created.
- **updatedAt** (DATETIME): Timestamp when OTP is updated.
- **used** (BOOLEAN): indicates OTP is used or unused.

---

## ER Diagram Components

1. **Users Table**
- **Fields**: `id`, `name`, `email`, `password`, `isVerified`, `verificationToken`, `resetToken`, `createdAt`, `updatedAt`
- **Primary Key**: `id`
- **Relationships**: Has a one-to-many relationship with `contacts`

2. **Contacts Table**
- **Fields**: `id`, `userId`, `name`, `email`, `phone`, `address`, `timezone`, `isDeleted`, `createdAt`, `updatedAt`
- **Primary Key**: `id`
- **Foreign Key**: `userId` references `users(id)`
- **Relationships**: Belongs to `users`

3. **OTPs Table**
- **Fields**: `id`, `email`, `otp`, `expiry`, `createdAt`, `updatedAt`, `used`
- **Primary Key**: `id`
- **Relationships**: Independent table for OTP management (not directly linked to `users` for flexibility)


---

## ER Diagram

## Users Table

| Field              | Type                | Description                    |
|--------------------|---------------------|--------------------------------|
| id (PK)            | INT (AUTO_INCREMENT)| Primary Key                    |
| name               | VARCHAR(255)        | User's name                    |
| email (UNIQUE)     | VARCHAR(255)        | User's email, must be unique   |
| password           | VARCHAR(255)        | User's password                |
| isVerified         | BOOLEAN             | Verification status of the user|
| verificationToken  | VARCHAR(255)        | Token for verification         |
| resetToken         | VARCHAR(255)        | Token for password reset       |
| createdAt          | TIMESTAMP           | Record creation timestamp      |
| updatedAt          | TIMESTAMP           | Record update timestamp        |

## Contacts Table

| Field              | Type                | Description                    |
|--------------------|---------------------|--------------------------------|
| id (PK)            | INT (AUTO_INCREMENT)| Primary Key                    |
| userId (FK)        | INT                 | Foreign Key to Users table     |
| name               | VARCHAR(255)        | Contact's name                 |
| email (UNIQUE)     | VARCHAR(255)        | Contact's email, must be unique|
| phone              | VARCHAR(50)         | Contact's phone number         |
| address            | TEXT                | Contact's address              |
| timezone           | VARCHAR(50)         | Contact's timezone             |
| isDeleted          | BOOLEAN             | Deletion status of the contact |
| createdAt          | TIMESTAMP           | Record creation timestamp      |
| updatedAt          | TIMESTAMP           | Record update timestamp        |

## OTPs Table

| Field              | Type                | Description                    |
|--------------------|---------------------|--------------------------------|
| id (PK)            | INT (AUTO_INCREMENT)| Primary Key                    |
| email              | VARCHAR(255)        | Email associated with the OTP  |
| otp                | VARCHAR(6)          | One-time password              |
| expiry             | DATETIME            | OTP expiration time            |
| createdAt          | DATETIME            | Record creation timestamp      |
| updatedAt          | DATETIME            | Record update timestamp        |
| used               | BOOLEAN             | OTP usage status               |

---

## Relationship Summary

- **Users to Contacts**: One-to-Many relationship (`1:N`), where one user can have multiple contacts.
- **Foreign Key Constraint**: `userId` in Contacts references `id` in Users, with `ON DELETE CASCADE` to automatically remove associated contacts when a user is deleted.
- **OTPs Table**: Independent table storing OTP codes for email verification and password reset purposes, linked to the user's email field instead of a user ID for flexibility.

---

## Project Structure

```

contact-management-system/
│
├── controllers/
│   ├── userController.js      # Handles user registration, login, OTP, password reset
│   ├── contactController.js    # Manages CRUD operations for contacts
│   └── otpController.js        # Manages OTP generation and verification
│
├── models/
│   ├── user.js                 # Defines the User model (database schema)
│   ├── contact.js              # Defines the Contact model (database schema)
│   └── otp.js                  # Defines the OTP model (if separate from user model)
│
├── routes/
│   ├── userRoutes.js           # API routes for user operations (registration, login, etc.)
│   ├── contactRoutes.js        # API routes for managing contacts (CRUD operations)
│   └── otpRoutes.js            # API routes for OTP handling (send, verify)
│
├── middlewares/
│   ├── authMiddleware.js       # JWT authentication middleware for protecting routes
│   ├── errorHandler.js         # Global error handler for managing application errors
│   ├── rateLimitMiddleware.js   # Middleware to limit the number of requests from clients
│   └── otpMiddleware.js        # Middleware for verifying OTP (if needed)
│
├── utils/
│   ├── csvParser.js            # Utility to parse CSV files for contacts import
│   ├── timeConverter.js        # Utility for converting time zones
│   ├── otpGenerator.js         # Utility to generate OTPs
│   └── otpSender.js            # Utility for sending OTPs via email/SMS
│
├── services/
│   ├── jwtService.js           # Service for generating and verifying JWT tokens
│   ├── fileService.js          # Service for handling file operations (CSV/Excel uploads)
│   └── otpService.js           # Service for generating and validating OTPs
│
├── config/
│   ├── db.js                   # MySQL database connection setup
│   ├── emailService.js         # Configuration for sending emails (for OTPs, password resets)
│   └── otpService.js           # OTP configuration settings (e.g., expiration time, length)
│   └── schema.sql              # SQL script to create necessary database tables 
│
├── public/
│   └── uploads/                # Folder to store uploaded files (e.g., CSV/Excel)
│
├── .env                        # Environment variables for configuration (e.g., database URL, secret keys)
├── package.json                # Project dependencies and scripts
├── server.js                   # Entry point for the application (starts the server)
└── README.md                   # Documentation for the project (setup instructions, usage)

```

---

## API Endpoints

### 1. Register a User

**Endpoint**: `POST /register`
**Description**: Registers a new user and sends a verification email.

**Request Body**:

```json
{
  "name" : "Arjun Naidu",
  "email" : "mallikarjunpersonal1234@gmail.com",
  "password" : "Arjun@2312"
}
```

**Response**:

```json
{
  "message": "User registered successfully. Please verify your email."
}
```

---

### 2. Authenticate a User

**Endpoint**: `POST /login`
**Description**: Authenticates a user and returns a JWT token.

**Request Body**:

```json
{
  "email" : "arjunpersona5599@gmail.com",
  "password" : "Arjun@2312"
}
```

**Response**:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp12345.eyJpZCI6OCwiaWF0IjoxNzI5ODU1ODQ1LCJleHAiOjE3Mjk5NDIyNDV9.ROMQvm678912OX70c61rZiVUDvZc1f336SKFdVIEScY"
}
```

---

### 3. Verify Email of user

**Endpoint**: `GET /verify-email`
**Description**: Verifies the user's email address using a ngrok token.

**Params**:

token:  <ngrok_token>

**Response**:

```json
{
  "message": "Email verified successfully."
}
```

---

### 4. Reset Password of user

**Endpoint**: `POST /reset-password`
**Description**: Initiates the password reset process by sending a reset link.

**Request Body**:

```json
{
  "email": "arjunpersonal5599@gmail.com"
}
```

**Response**:

```json
{
  "message": "Password reset email sent."
}
```

---

### 5. Update Password of user

**Endpoint**: `POST /update-password`
**Description**: Updates the user's password after they have received a reset link.

**Request Body**:

```json
{
    "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp5599.eyJpZCI6MTAsImlhdCI6MTcyOTg2MDA1NywiZXhwIjoxNzI5OTQ2NDU3fQ.wTgHw1kUTufFEs2312XeHmX8yQ4CdV98765BjgNWLhY",
    "newPassword" : "Arjun@Naidu108"
}
```

**Response**:

```json
{
  "message": "Password updated successfully"
}
```

### 6. Add a Contact

**Endpoint**: `POST /add`
**Description**: Adds a new contact for the authenticated user.

**Authorization**: Bearer <token>

**Request Body**:

```json
{
    "name": "Kochi",
    "email": "kochi@gmail.com",
    "phone": "+914842345678",
    "address": "Fort Kochi, Kochi, Kerala, India",
    "timezone": "Asia/Kolkata"
}
```

**Response**:

```json
{
    "isDeleted": false,
    "id": 75,
    "userId": 10,
    "name": "Kochi",
    "email": "kochi@gmail.com",
    "phone": "+914842345678",
    "address": "Fort Kochi, Kochi, Kerala, India",
    "timezone": "Asia/Kolkata",
    "updatedAt": "2024-10-25T12:49:31.809Z",
    "createdAt": "2024-10-25T12:49:31.809Z"
}
```

---

### 7. Get all Contacts

**Endpoint**: `GET /`
**Description**: Retrieves all contacts for the authenticated user.

**Authorization**: Bearer <token>

**Response**:

```json
[
    {
        "id": 76,
        "userId": 6,
        "name": "Edinburgh",
        "email": "edinburgh@gmail.com",
        "phone": "+441312345678",
        "address": "Edinburgh Castle, Edinburgh, Scotland",
        "timezone": "Europe/London",
        "isDeleted": false,
        "createdAt": "2024-10-25T13:07:39.000Z",
        "updatedAt": "2024-10-25T13:07:39.000Z"
    },
    {
        "id": 77,
        "userId": 6,
        "name": "Copenhagen",
        "email": "copenhagen@gmail.com",
        "phone": "+4532123456",
        "address": "Nyhavn, Copenhagen, Denmark",
        "timezone": "Europe/Copenhagen",
        "isDeleted": false,
        "createdAt": "2024-10-25T13:08:24.000Z",
        "updatedAt": "2024-10-25T13:08:24.000Z"
    },
    {
        "id": 78,
        "userId": 6,
        "name": "Glasgow",
        "email": "glasgow@gmail.com",
        "phone": "+441412345678",
        "address": "Glasgow Cathedral, Glasgow, Scotland",
        "timezone": "Europe/London",
        "isDeleted": false,
        "createdAt": "2024-10-25T13:09:25.000Z",
        "updatedAt": "2024-10-25T13:09:25.000Z"
    },
    {
        "id": 79,
        "userId": 6,
        "name": "Baku",
        "email": "baku@gmail.com",
        "phone": "+994123456789",
        "address": "Flame Towers, Baku, Azerbaijan",
        "timezone": "Asia/Baku",
        "isDeleted": false,
        "createdAt": "2024-10-25T13:10:00.000Z",
        "updatedAt": "2024-10-25T13:10:00.000Z"
    },
    {
        "id": 80,
        "userId": 6,
        "name": "Brooklyn",
        "email": "brooklyn@gmail.com",
        "phone": "+17183765432",
        "address": "Brooklyn Bridge, Brooklyn, NY, USA",
        "timezone": "America/New_York",
        "isDeleted": false,
        "createdAt": "2024-10-25T13:11:40.000Z",
        "updatedAt": "2024-10-25T13:11:40.000Z"
    },
    {
        "id": 81,
        "userId": 6,
        "name": "Indore",
        "email": "indore@gmail.com",
        "phone": "+917312345678",
        "address": "Rajwada Palace, Indore, Madhya Pradesh, India",
        "timezone": "Asia/Kolkata",
        "isDeleted": false,
        "createdAt": "2024-10-25T13:12:15.000Z",
        "updatedAt": "2024-10-25T13:12:15.000Z"
    }
]
```

---

### 8. Update a Contact

**Endpoint**: `PUT /update/:id`
**Description**: Updates an existing contact for the authenticated user.

**Authorization**: Bearer <token>

**Request Body**:

```json
{
      "name": "Indore",
      "email": "indore@gmail.com",
      "phone": "+917358916284",
      "address": "Rajwada Palace, Indore, Madhya Pradesh, India",
      "timezone": "Asia/Kolkata"
}
```

**Response**:

```json
{
    "message": "Contact updated successfully"
}
```

---

### 9. Delete a Contact

**Endpoint**: `DELETE /:id`
**Description**: Deletes a contact for the authenticated user.

**Authorization**: Bearer <token>

**Response**:

```json
{
  "message": "Contact deleted successfully"
}
```

---

### 10. Batch upload of Contacts

**Endpoint**: `POST /add`
**Description**: Adds new contacts for the authenticated user more than one in one go.

**Authorization**: Bearer <token>

**Request Body**:

```json
[
    {
        "name": "Jaipur",
        "email": "jaipur@gmail.com",
        "phone": "+911412345678",
        "address": "Hawa Mahal, Jaipur, Rajasthan, India",
        "timezone": "Asia/Kolkata"
    },
    {
        "name": "Surat",
        "email": "surat@gmail.com",
        "phone": "+912612345678",
        "address": "Surat Castle, Surat, Gujarat, India",
        "timezone": "Asia/Kolkata"
    },
    {
        "name": "Warangal",
        "email": "warangal@gmail.com",
        "phone": "+914084567890",
        "address": "Warangal Fort, Warangal, Telangana, India",
        "timezone": "Asia/Kolkata"
    }
]
```

**Response**:

```json
{
    "message": "Contacts uploaded successfully",
    "contacts": [
        {
            "isDeleted": false,
            "id": 82,
            "userId": 6,
            "name": "Jaipur",
            "email": "jaipur@gmail.com",
            "phone": "+911412345678",
            "address": "Hawa Mahal, Jaipur, Rajasthan, India",
            "timezone": "Asia/Kolkata",
            "updatedAt": "2024-10-25T13:22:15.310Z",
            "createdAt": "2024-10-25T13:22:15.310Z"
        },
        {
            "isDeleted": false,
            "id": 83,
            "userId": 6,
            "name": "Surat",
            "email": "surat@gmail.com",
            "phone": "+912612345678",
            "address": "Surat Castle, Surat, Gujarat, India",
            "timezone": "Asia/Kolkata",
            "updatedAt": "2024-10-25T13:22:15.318Z",
            "createdAt": "2024-10-25T13:22:15.318Z"
        },
        {
            "isDeleted": false,
            "id": 84,
            "userId": 6,
            "name": "Warangal",
            "email": "warangal@gmail.com",
            "phone": "+914084567890",
            "address": "Warangal Fort, Warangal, Telangana, India",
            "timezone": "Asia/Kolkata",
            "updatedAt": "2024-10-25T13:22:15.323Z",
            "createdAt": "2024-10-25T13:22:15.323Z"
        }
    ]
}
```

---

### 11. Generate OTP for a user

**Endpoint**: `POST /generate`
**Description**: Generates a One-Time Password (OTP) for a user and sends it to their registered email address.

**Authorization**: Bearer <token>

**Request Body**:

```json
{
  "email": "mmallikarjunnaidutop10@gmail.com"
}
```

**Response**:

```json
{
    "message": "OTP sent to mmallikarjunnaidutop10@gmail.com"
}
```

---

### 12. Reset Password of user

**Endpoint**: `POST /verify`
**Description**: verifies the OTP entered by the user.

**Authorization**: Bearer <token>

**Request Body**:

```json
{
  "email": "mmallikarjunnaidutop10@gmail.com",
  "otp": "115599"
}
```

**Response**:

```json
{
  "message": "OTP verified successfully."
}
```

---

### 13. Reset Password Via OTP for user

**Endpoint**: `POST /reset-password`
**Description**: Reset their password using the verified OTP.

**Authorization**: Bearer <token>

**Request Body**:

```json
{
  "email": "arjunpersonal5599@gmail.com",
  "otp": "115599",
  "newPassword" : "Arjun@108"
}
```

**Response**:

```json
{
  "message": "Password reset successful."
}
```

---

## Usage

1. **Run** the server: `npm start`
2. **Send Requests** via Postman or any API client to interact with the endpoints.
3. **Access Protected Endpoints**: Include the JWT token in the `Authorization` header as a Bearer token for routes requiring authentication.

--- 

## Error Handling

- **400 Bad Request**: Invalid request data or missing parameters.
- **401 Unauthorized**: Invalid or missing JWT token.
- **404 Not Found**: Requested resource does not exist.
- **429 Too Many Requests**: When the rate limit is exceeded.
- **500 Internal Server Error**: Server or database issues.

---

## Security Features

- **JWT Authentication**: All protected routes require valid JWT tokens and secures the API.
- **Password Hashing**: User passwords are hashed using **bcrypt** before storage.
- **Email Verification**: Users must verify their email before accessing their account.
- **CSV Upload**: Bulk upload contacts via CSV/Excel.
- **Rate Limiting**: Prevents abuse of sensitive routes.
- **OTP Verification**: Adds an extra layer of security for critical actions.

---

## License 

This project is licensed under the MIT License.

---
