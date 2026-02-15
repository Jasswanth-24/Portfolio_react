# Portfolio Backend API

Production-ready backend server for portfolio contact section built with Node.js, Express.js, and MongoDB.

## Features

- ✅ RESTful API for contact form submissions
- ✅ MongoDB integration with Mongoose ODM
- ✅ Input validation with express-validator
- ✅ Security headers with Helmet
- ✅ Rate limiting to prevent abuse
- ✅ CORS enabled for frontend communication
- ✅ NoSQL injection prevention
- ✅ MVC folder architecture
- ✅ Proper error handling

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- MongoDB (local or Atlas)

### Installation

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio_db
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## API Endpoints

### Contact

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/contact | Submit contact form |
| GET | /api/contact | Get all contacts (admin) |
| GET | /api/contact/:id | Get single contact (admin) |
| PATCH | /api/contact/:id/read | Mark as read (admin) |
| DELETE | /api/contact/:id | Delete contact (admin) |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Server health status |

## Request/Response Examples

### Submit Contact Form

**Request:**
```json
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I would like to discuss a potential project..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon.",
  "data": {
    "id": "65f1234567890abcdef12345",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "createdAt": "2026-02-15T10:30:00.000Z"
  }
}
```

**Validation Error Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please provide a valid email address" }
  ]
}
```

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   └── contactController.js   # Contact business logic
├── middleware/
│   ├── errorHandler.js    # Global error handling
│   └── validateContact.js # Input validation
├── models/
│   └── Contact.js         # Mongoose schema
├── routes/
│   └── contactRoutes.js   # API routes
├── .env                   # Environment variables
├── .env.example           # Environment template
├── .gitignore
├── package.json
├── README.md
└── server.js              # Entry point
```

## Security Features

- **Helmet**: Sets various HTTP headers for security
- **Rate Limiting**: 100 requests per 15 min (API), 5 submissions per hour (contact form)
- **CORS**: Configurable allowed origins
- **Input Validation**: Server-side validation with express-validator
- **NoSQL Injection Prevention**: Using express-mongo-sanitize
- **Request Size Limit**: 10KB body limit

## Frontend Integration

Example React fetch call:

```javascript
const submitContact = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Handle success
      console.log(data.message);
    } else {
      // Handle validation errors
      console.error(data.errors);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};
```

## License

MIT
