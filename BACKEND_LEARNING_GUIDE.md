# 🚀 COMPLETE BACKEND LEARNING GUIDE - KRUTANIC

## TABLE OF CONTENTS
1. [Backend Overview](#backend-overview)
2. [Where to Start](#where-to-start)
3. [Core Concepts](#core-concepts)
4. [Understanding Dependencies](#understanding-dependencies)
5. [Folder Structure Explained](#folder-structure-explained)
6. [Step-by-Step Learning Path](#step-by-step-learning-path)
7. [Code Flow & Examples](#code-flow--examples)
8. [Database Models](#database-models)
9. [APIs & Routes](#apis--routes)
10. [Running & Testing](#running--testing)

---

## BACKEND OVERVIEW

The KRUTANIC backend is a **Node.js/Express** server that manages:
- User authentication & profiles
- Course management
- Job postings & applications
- Event management
- Team management (BDA, Operations, Marketing)
- Payments & transactions
- Email notifications
- File uploads to Cloudinary
- PDF generation for certificates

**Architecture Pattern**: REST API with Express.js and MongoDB

---

## WHERE TO START

### The Learning Path (In Order):

1. **[server.js](#serverjs-entry-point)** - Understand the entry point
2. **package.json** - Know the dependencies
3. **[Middleware](#middleware)** - Learn how requests are processed
4. **[Models](#models)** - Understand data structure
5. **[Routes](#routes)** - Learn API endpoints
6. **[Controllers](#controllers)** - Understand business logic
7. **Run & Test** - Actually run the server and test endpoints

---

## CORE CONCEPTS

### 1. **Express.js Server**
- Web framework for Node.js
- Handles HTTP requests (GET, POST, PUT, DELETE)
- Routes requests to appropriate handlers
- Manages middleware

### 2. **MongoDB & Mongoose**
- MongoDB: NoSQL database
- Mongoose: Object Data Modeling (ODM) for MongoDB
- Schemas define data structure
- Models interact with database

### 3. **REST API**
- Uses HTTP methods: GET (read), POST (create), PUT (update), DELETE (delete)
- JSON format for data exchange
- Status codes: 200 (OK), 201 (Created), 400 (Error), 404 (Not Found), 500 (Server Error)

### 4. **Authentication**
- JWT (JSON Web Tokens) for user sessions
- Middleware validates tokens on protected routes
- OTP verification for login

### 5. **Middleware**
- Functions that process requests before reaching route handlers
- Can validate, transform, or reject requests
- Execute in order they are registered

---

## UNDERSTANDING DEPENDENCIES

### Key Libraries in package.json

```json
{
  "express": "Web framework for API",
  "mongoose": "MongoDB object modeling",
  "jsonwebtoken": "JWT token creation & verification",
  "cors": "Enable cross-origin requests",
  "dotenv": "Load environment variables",
  "nodemailer": "Send emails",
  "cloudinary": "Image/file cloud storage",
  "formidable": "Parse file uploads",
  "busboy": "Stream-based file upload parsing",
  "body-parser": "Parse incoming request bodies",
  "express-async-handler": "Simplify async error handling",
  "express-rate-limit": "Rate limiting for endpoints",
  "pdf-lib": "Create/edit PDF documents",
  "pdf-parse": "Extract text from PDFs",
  "@google/generative-ai": "Google AI API (Gemini)",
  "cookie-parser": "Parse cookies",
  "nodemon": "Auto-restart server on file changes (dev)"
}
```

---

## FOLDER STRUCTURE EXPLAINED

### 📁 BACKEND/

```
BACKEND/
│
├── server.js ⭐ ENTRY POINT
│   - Starts Express app
│   - Configures middleware
│   - Connects to MongoDB
│   - Registers all routes
│   - Listens on PORT
│
├── package.json
│   - Project dependencies
│   - Scripts (npm start)
│
├── .env ⭐ IMPORTANT
│   - Database connection string
│   - JWT secret
│   - API keys (Cloudinary, Gmail)
│   - Frontend URL
│
├── config/
│   └── exercise.json - Exercise question configurations
│
├── middleware/ ⭐ REQUEST PROCESSORS
│   ├── UserAuth.js - Verify JWT tokens
│   ├── verifyAdminCookie.js - Verify admin access
│   └── cloudinary.js - Cloudinary configuration
│
├── models/ ⭐ DATA SCHEMAS
│   ├── User.js - User profile schema
│   ├── CreateCourse.js - Course schema
│   ├── CreateJob.js - Job posting schema
│   ├── JobApplication.js - Job application schema
│   ├── Mentorship.js - Mentorship program schema
│   ├── EventApplication.js - Event registration schema
│   ├── Certificate.js - Certificate schema
│   ├── CreateBDA.js - BDA team schema
│   ├── CreateOperation.js - Operations team schema
│   ├── CreateMarketing.js - Marketing team schema
│   └── ... (more models)
│
├── routes/ ⭐ API ENDPOINTS
│   ├── User.js - User auth & profile endpoints
│   ├── CreateCourse.js - Course CRUD endpoints
│   ├── CreateJob.js - Job management endpoints
│   ├── JobApplication.js - Job application endpoints
│   ├── AdminLogin.js - Admin authentication
│   ├── Mentorship.js - Mentorship endpoints
│   ├── AddEvent.js - Event management
│   ├── Certificate.js - Certificate endpoints
│   ├── mock.js - Mock interview endpoints
│   ├── excercise.js - Exercise endpoints
│   └── ... (more routes)
│
└── controllers/ ⭐ BUSINESS LOGIC
    ├── emailController.js - Email sending logic
    ├── offerLetter.js - Offer letter generation
    └── oppEmailController.js - Opportunity emails
```

---

## STEP-BY-STEP LEARNING PATH

### PHASE 1: Server Setup & Entry Point

#### **File: server.js** 🔥 START HERE

```javascript
// 1. IMPORTS - Load required libraries
const express = require("express");              // Web framework
const mongoose = require("mongoose");            // Database ODM
const cors = require("cors");                   // Enable CORS
const dotenv = require("dotenv");               // Environment variables

// 2. LOAD ROUTES
const User = require("./routes/User");
const CreateCourse = require("./routes/CreateCourse");
const CreateJob = require("./routes/CreateJob");
// ... more routes imported

// 3. CONFIGURATION
dotenv.config();                                // Load .env file
const app = express();
const PORT = process.env.PORT || 5000;

// 4. MIDDLEWARE (In order of execution)
app.use(cors({...}));                          // Allow cross-origin requests
app.use(bodyParser.json());                    // Parse JSON bodies
app.use(express.json());                       // Parse JSON

// 5. ROUTE REGISTRATION
app.use("/", User);                            // Use user routes
app.use("/", CreateCourse);                    // Use course routes
app.use("/", CreateJob);                       // Use job routes
// ... all routes registered at root

// 6. DATABASE CONNECTION
mongoose.connect(process.env.DB_NAME, {...})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect", err));

// 7. START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**What Happens When Server Starts:**
1. Load environment variables from `.env`
2. Create Express app instance
3. Register CORS and JSON parsing middleware
4. Import and register all route handlers
5. Connect to MongoDB
6. Start listening on port 5000

---

### PHASE 2: Understanding Middleware

#### **What is Middleware?**
Functions that process every request before it reaches the route handler.

#### **File: middleware/UserAuth.js**

```javascript
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  // 1. Check if authorization header exists
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    // 2. Verify the JWT token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Attach user data to request object
    req.user = verified;
    
    // 4. Pass control to next middleware/route
    next();
  } catch (err) {
    // 5. Invalid token
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
```

**Flow Diagram:**
```
Request comes in
    ↓
Check for Authorization header
    ↓
If no token → Return 403 (Access denied)
    ↓
Verify JWT token with secret
    ↓
If invalid → Return 401 (Invalid token)
    ↓
If valid → Attach user to req and call next()
    ↓
Route handler receives request
```

**Usage in routes:**
```javascript
router.get("/profile", authMiddleware, async (req, res) => {
  // Can access user info via req.user
  const user = await User.findById(req.user.id);
  res.json(user);
});
```

---

### PHASE 3: Database Models (Schemas)

#### **What is a Mongoose Schema?**
Blueprint for database documents. Defines fields, types, and validation.

#### **File: models/User.js**

```javascript
const mongoose = require('mongoose');

// Define schema structure
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,  // Must provide this field
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,    // No duplicate emails
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: 'Krutanic@123',
  },
  status: {
    type: String,
    default: 'active',
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  pdfUrl: {
    type: String,
  },
  jobResume: {
    type: String,
  },
  // Feature flags
  atschecker: { type: Boolean, default: false },
  jobboard: { type: Boolean, default: false },
  myjob: { type: Boolean, default: false },
  mockinterview: { type: Boolean, default: false },
  exercise: { type: Boolean, default: false }
});

// Create model from schema
const User = mongoose.model('User', userSchema);

module.exports = User;
```

**Key Concepts:**
- `type: String` - Field is a string
- `required: true` - Field must be provided
- `unique: true` - No duplicate values allowed
- `default: value` - Default value if not provided
- `lowercase: true` - Auto-convert to lowercase

#### **File: models/CreateCourse.js**

```javascript
const mongoose = require("mongoose");

const CreateCourseSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  session: {
    type: Map,  // Key-value pairs
    of: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    default: {},
  },
});

const CreateCourse = mongoose.model("CreateCourse", CreateCourseSchema);
module.exports = CreateCourse;
```

**Common CRUD Operations with Models:**

```javascript
// CREATE
const user = new User({ fullname: "John", email: "john@example.com" });
await user.save();

// READ
const user = await User.findById(id);
const users = await User.find();

// UPDATE
const user = await User.findByIdAndUpdate(id, { status: "inactive" }, { new: true });

// DELETE
await User.findByIdAndDelete(id);
```

---

### PHASE 4: Routes & API Endpoints

#### **What is a Route?**
Maps HTTP requests (GET, POST, PUT, DELETE) to handler functions.

#### **File: routes/CreateCourse.js**

```javascript
const express = require("express");
const CreateCourse = require("../models/CreateCourse");
const router = express.Router();

// POST /createcourse
// Purpose: Create a new course
// Request: { title, description }
// Response: { _id, title, description, ... }
router.post("/createcourse", async (req, res) => {
  const { title, description } = req.body;
  try {
    const course = new CreateCourse({
      title,
      description,
    });
    await course.save();
    res.status(201).json(course);  // 201 = Created
  } catch (error) {
    res.status(400).json({ message: error.message });  // 400 = Bad Request
  }
});

// GET /getcourses
// Purpose: Retrieve all courses or single course by ID
// Query: ?courseId=xxx (optional)
// Response: [{ courses... }] or { single course }
router.get("/getcourses", async (req, res) => {
  const { courseId } = req.query;
  try {
    let courses;
    if (courseId) {
      // Get single course
      courses = await CreateCourse.findById(courseId);
    } else {
      // Get all courses, sorted newest first
      courses = await CreateCourse.find().sort({ _id: -1 });
    }
    res.status(200).json(courses);  // 200 = OK
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /editcourse/:_id
// Purpose: Update a course
// URL Parameter: _id
// Request: { title, description }
// Response: { updated course }
router.put("/editcourse/:_id", async (req, res) => {
  const { _id } = req.params;
  const { title, description } = req.body;

  try {
    const course = await CreateCourse.findByIdAndUpdate(
      _id,
      { title, description },
      { new: true }  // Return updated document
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /deletecourse/:_id
// Purpose: Delete a course
// URL Parameter: _id
// Response: { deleted course }
router.delete("/deletecourse/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const course = await CreateCourse.findByIdAndDelete(_id);
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
```

**HTTP Methods Explained:**

| Method | Purpose | Example |
|--------|---------|---------|
| `GET` | Retrieve data | `GET /getcourses` |
| `POST` | Create data | `POST /createcourse` |
| `PUT` | Update data | `PUT /editcourse/123` |
| `DELETE` | Delete data | `DELETE /deletecourse/123` |

---

### PHASE 5: User Authentication Flow

#### **File: routes/User.js** (Partial)

```javascript
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/UserAuth");
const { sendEmail } = require("../controllers/emailController");
const crypto = require('crypto');

// POST /users
// Create new user
router.post("/users", async (req, res) => {
  const { fullname, email, phone } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "User already created check in active users" 
      });
    }

    // Create new user
    const newUser = new User({
      fullname,
      email,
      phone,
    });
    await newUser.save();
    
    res.status(200).json({ 
      message: "User created successfully", 
      user: newUser 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST /checkuserauth
// User login with email & password
router.post("/checkuserauth", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }  // Token valid for 7 days
    );

    res.status(200).json({ 
      message: "User authenticated", 
      token,
      user 
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET /users (Protected - requires token)
router.get("/users", async (req, res) => {
  const { userId } = req.query;
  try {
    let users;
    if (userId) {
      users = await User.findById(userId);
      if (!users) {
        return res.status(404).json({ 
          message: "user not found for the given userId" 
        });
      }
    } else {
      users = await User.find().sort({ _id: -1 });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching data",
      error: error.message,
    });
  }
});

// PUT /users/:id
// Update user details
router.put("/users/:id", async (req, res) => {
  const { status, fullname, email, phone, password } = req.body;
  const { id } = req.params;
  try {
    const updatedFields = {
      status,
      fullname,
      email,
      phone,
      password,
    };
    const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
```

**Authentication Flow Diagram:**

```
Frontend (React) → Backend (Node.js)

LOGIN FLOW:
1. User enters email & password
2. POST /checkuserauth with { email, password }
3. Backend finds user in database
4. Verify password matches
5. Generate JWT token
6. Return token to frontend
7. Frontend stores token in localStorage
8. Every future request includes token in Authorization header

PROTECTED ROUTE FLOW:
1. Frontend makes request with Authorization header
2. Backend middleware checks for token
3. Middleware verifies token with JWT_SECRET
4. If valid, attach user to request object
5. Route handler processes request
6. If invalid, return 401 Unauthorized
```

---

## CODE FLOW & EXAMPLES

### Example 1: Creating a Course

**Frontend (React):**
```javascript
// User clicks "Create Course" button
const createCourse = async () => {
  const response = await axios.post('http://localhost:5000/createcourse', {
    title: 'Node.js Basics',
    description: 'Learn Node.js from scratch'
  });
  console.log(response.data);
};
```

**Backend Flow:**
```
1. Request arrives: POST /createcourse
   Body: { title: 'Node.js Basics', description: '...' }

2. server.js middleware processes:
   - CORS check ✓
   - JSON parsing ✓
   - Routes request to CreateCourse route

3. CreateCourse.js handler executes:
   const course = new CreateCourse({
     title: 'Node.js Basics',
     description: '...'
   });
   await course.save();  // Save to MongoDB

4. Response sent back:
   { _id: '507f1f77bcf86cd799439011', title: '...', ... }

5. Frontend receives and displays course
```

### Example 2: Getting All Users (Protected Route)

**Frontend:**
```javascript
const headers = {
  Authorization: localStorage.getItem('token')  // JWT token
};
const response = await axios.get('http://localhost:5000/users', { headers });
```

**Backend Flow:**
```
1. Request arrives: GET /users
   Headers: { Authorization: 'eyJhbGciOiJIUzI1NiIs...' }

2. If route uses authMiddleware:
   - Extract token from Authorization header
   - Verify token with JWT_SECRET
   - If invalid → Return 401
   - If valid → Attach user to req.user

3. Route handler:
   const users = await User.find().sort({ _id: -1 });

4. Return all users sorted by creation date (newest first)
```

---

## DATABASE MODELS

### User Model
Stores user profile, credentials, and feature flags

```javascript
{
  _id: ObjectId,
  fullname: String,
  email: String (unique),
  phone: String,
  password: String,
  status: String (default: 'active'),
  otp: String,
  otpExpires: Date,
  pdfUrl: String,
  jobResume: String,
  atschecker: Boolean,
  jobboard: Boolean,
  myjob: Boolean,
  mockinterview: Boolean,
  exercise: Boolean
}
```

### Course Model
Stores course information with sessions

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  session: Map {
    "session1": {
      title: String,
      description: String
    },
    "session2": { ... }
  }
}
```

### Job Model
Stores job postings

### JobApplication Model
Stores user job applications

### Certificate Model
Stores user certificates

### Mentorship Model
Stores mentorship program details

### Event Models
- AddEvent: Event details
- EventApplication: Event registrations
- EventRegistration: Attendee data

### Team Models
- CreateBDA: BDA team members
- CreateOperation: Operations team
- CreateMarketing: Marketing team
- TeamName: Team organization

---

## APIs & ROUTES

### User Routes
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/users` | Create new user |
| GET | `/users` | Get all users |
| GET | `/users?userId=xxx` | Get specific user |
| PUT | `/users/:id` | Update user |
| POST | `/checkuserauth` | User login |

### Course Routes
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/createcourse` | Create course |
| GET | `/getcourses` | Get all courses |
| GET | `/getcourses?courseId=xxx` | Get specific course |
| PUT | `/editcourse/:id` | Update course |
| DELETE | `/deletecourse/:id` | Delete course |

### Job Routes
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/createjob` | Create job |
| GET | `/getjobs` | Get all jobs |
| POST | `/applyjob` | Apply for job |

### Event Routes
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/addevent` | Create event |
| GET | `/getevents` | Get all events |
| POST | `/registerevent` | Register for event |

*(See specific route files for complete endpoint list)*

---

## RUNNING & TESTING

### Setup

1. **Install dependencies:**
```bash
cd BACKEND
npm install
```

2. **Create .env file:**
```env
DB_NAME=mongodb+srv://user:password@cluster.mongodb.net/krutanic
FRONTEND_URL=http://localhost:5173
PORT=5000
JWT_SECRET=your-secret-key-here
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

3. **Start server:**
```bash
npm start
# Or with auto-restart on file changes:
npx nodemon server.js
```

**Expected Output:**
```
Connected to MongoDB
Server running on port 5000
```

### Testing with Postman

#### Test 1: Create User
```
POST http://localhost:5000/users
Header: Content-Type: application/json
Body:
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}

Expected Response: 200
{
  "_id": "...",
  "fullname": "John Doe",
  "email": "john@example.com",
  ...
}
```

#### Test 2: Get All Courses
```
GET http://localhost:5000/getcourses

Expected Response: 200
[
  {
    "_id": "...",
    "title": "Node.js",
    "description": "..."
  },
  ...
]
```

#### Test 3: Create Course
```
POST http://localhost:5000/createcourse
Header: Content-Type: application/json
Body:
{
  "title": "React Advanced",
  "description": "Learn advanced React patterns"
}

Expected Response: 201
{
  "_id": "...",
  "title": "React Advanced",
  ...
}
```

#### Test 4: Update Course
```
PUT http://localhost:5000/editcourse/123abc
Header: Content-Type: application/json
Body:
{
  "title": "Updated Title",
  "description": "Updated description"
}

Expected Response: 200
{
  "_id": "123abc",
  "title": "Updated Title",
  ...
}
```

#### Test 5: Delete Course
```
DELETE http://localhost:5000/deletecourse/123abc

Expected Response: 200
{
  "_id": "123abc",
  ...
}
```

### Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot connect to MongoDB` | DB_NAME incorrect or DB offline | Check .env DB_NAME and MongoDB Atlas connection |
| `JWT token invalid` | Token expired or wrong secret | Ensure JWT_SECRET matches in .env |
| `CORS error` | Frontend URL not in CORS whitelist | Add frontend URL to ALLOWED_ORIGINS in server.js |
| `Cannot find module` | Dependency not installed | Run `npm install` |
| `Port already in use` | Another app using port 5000 | Change PORT in .env or kill process on port 5000 |

---

## KEY TAKEAWAYS

✅ **Start with server.js** - It's the entry point  
✅ **Understand middleware** - How requests are processed  
✅ **Learn models** - Data structure in MongoDB  
✅ **Study routes** - API endpoints and logic  
✅ **Test with Postman** - Verify API functionality  
✅ **Use async/await** - Handle asynchronous database operations  
✅ **Always check for errors** - Try-catch blocks are essential  
✅ **Return proper status codes** - 200, 201, 400, 404, 500, etc.  
✅ **Validate user input** - Check for required fields  
✅ **Use environment variables** - Never hardcode sensitive data  

---

## NEXT STEPS

1. **Start the server** and verify it connects to MongoDB
2. **Test endpoints** using Postman or Insomnia
3. **Study one route file** completely (e.g., User.js)
4. **Create a simple CRUD route** for practice
5. **Read through a model** and understand the schema
6. **Connect to the frontend** and test end-to-end flow
7. **Add authentication** to protected routes
8. **Handle errors** properly with try-catch
9. **Test edge cases** (missing fields, duplicate emails, etc.)
10. **Study advanced features** (file uploads, email, PDF generation)

---

*Now you have a complete understanding of the backend! Start with server.js and work your way through the files.*
