# Contact Management API 📞

visit site: https://shiv-contact.vercel.app/

A RESTful API built with Node.js, Express, and MongoDB for managing contacts with user authentication and authorization.

## 🚀 Features

- **User Authentication**: Register, login, and JWT-based authentication
- **Contact Management**: Full CRUD operations for contacts
- **User Authorization**: Users can only access their own contacts
- **Secure**: Password hashing with bcrypt and JWT token validation
- **Production Ready**: Docker support, health checks, and deployment configurations

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Environment Management**: dotenv
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd contact-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
CONNECTION_STRING=mongodb://localhost:27017/contactdb
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database_name
ACCESS_TOKEN_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
PORT=5000
NODE_ENV=development
```

### 4. Start the Server
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 🐳 Docker Deployment

### Using Docker
```bash
# Build the image
npm run docker:build

# Run the container
npm run docker:run
```

### Using Docker Compose (with MongoDB)
```bash
npm run docker:compose
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "id": "user_id",
  "email": "john@example.com"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "accessToken": "jwt_token_here"
}
```

#### Get Current User
```http
GET /api/users/current
Authorization: Bearer <jwt_token>
```

### Contact Endpoints

> **Note**: All contact endpoints require authentication. Include the JWT token in the Authorization header.

#### Get All Contacts
```http
GET /api/contacts
Authorization: Bearer <jwt_token>
```

#### Create Contact
```http
POST /api/contacts
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890"
}
```

#### Get Single Contact
```http
GET /api/contacts/:id
Authorization: Bearer <jwt_token>
```

#### Update Contact
```http
PUT /api/contacts/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Jane Smith Updated",
  "email": "jane.updated@example.com",
  "phone": "+1234567890"
}
```

#### Delete Contact
```http
DELETE /api/contacts/:id
Authorization: Bearer <jwt_token>
```

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

## 📊 Data Models

### User Model
```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Model
```javascript
{
  user_id: ObjectId (required, ref: 'User'),
  name: String (required),
  email: String (required),
  phone: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication Flow

1. **Register**: Create a new user account
2. **Login**: Authenticate and receive JWT token
3. **Access Protected Routes**: Include JWT token in Authorization header
4. **Token Validation**: Server validates token for each protected request

### Authorization Header Format
```
Authorization: Bearer <your_jwt_token>
```

## 🧪 Testing the API

### Using cURL

**Register a new user:**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Create a contact:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"1234567890"}'
```

### Using Postman

1. Import the API endpoints into Postman
2. Set up environment variables for base URL and JWT token
3. Test each endpoint with sample data

## 📁 Project Structure

```
contact-backend/
├── config/
│   └── dbConnection.js          # Database connection configuration
├── controllers/
│   ├── contactController.js     # Contact CRUD operations
│   └── userController.js        # User authentication logic
├── middleware/
│   ├── errorHandler.js          # Global error handling
│   └── validateTokenHandler.js  # JWT token validation
├── models/
│   ├── contactModel.js          # Contact data model
│   └── userModel.js            # User data model
├── routes/
│   ├── contactRoutes.js         # Contact API routes
│   └── userRoutes.js           # User API routes
├── .env.example                # Environment variables template
├── .dockerignore              # Docker ignore file
├── .gitignore                 # Git ignore file
├── constant.js                # Application constants
├── DEPLOYMENT_GUIDE.md        # Comprehensive deployment guide
├── docker-compose.yml         # Docker Compose configuration
├── Dockerfile                 # Docker container configuration
├── healthcheck.js            # Health check script
├── package.json              # Node.js dependencies and scripts
├── railway.json              # Railway deployment configuration
├── README.md                 # This file
└── server.js                 # Application entry point
```

## 🚀 Deployment

This application is ready for deployment on various platforms. Check out the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions on:

- **Railway** (Recommended - Free tier)
- **Render** (Free tier available)
- **Heroku**
- **DigitalOcean App Platform**
- **AWS EC2**
- **Docker-based deployments**

### Quick Deploy to Railway
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `CONNECTION_STRING` | MongoDB connection string | Yes |
| `ACCESS_TOKEN_SECRET` | JWT secret key (use a long, random string) | Yes |
| `PORT` | Server port (default: 5000) | No |
| `NODE_ENV` | Environment mode (development/production) | No |

## 🐛 Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Missing or invalid JWT token
- **403 Forbidden**: Access denied to resource
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

All errors return JSON responses with descriptive messages.

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with token validation
- User-specific data access (users can only access their own contacts)
- Input validation and sanitization
- Environment variable protection for sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

If you have any questions or issues, please:

1. Check the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment help
2. Review the API documentation above
3. Create an issue in the repository

---

**Happy Coding! 🎉**
