# 📚 BACKEND QUICK REFERENCE GUIDE

## 🎯 WHERE TO START LEARNING (In Order)

### 1. **START HERE: server.js** (Entry Point)
**Location:** `BACKEND/server.js`

**What to understand:**
- How Express app is initialized
- How middleware is registered
- How routes are registered
- How database connection works
- How server starts listening

**Key lines to read:**
- Lines 1-35: Imports and setup
- Lines 45-65: CORS and middleware configuration
- Lines 85-125: Route registration
- Lines 150-162: MongoDB connection

---

### 2. **SECOND: package.json** (Dependencies)
**Location:** `BACKEND/package.json`

**What to understand:**
- What each dependency does
- Which are for production, which for development
- How npm scripts work

**Key dependencies:**
```
express          - Web framework
mongoose         - Database ODM
jsonwebtoken     - JWT authentication
cors             - Enable cross-origin requests
nodemailer       - Send emails
cloudinary       - File uploads
```

---

### 3. **THIRD: Middleware** (Request Processing)
**Location:** `BACKEND/middleware/`

**Files to study:**
1. `UserAuth.js` - JWT verification
2. `cloudinary.js` - File upload config
3. `verifyAdminCookie.js` - Admin verification

**What you'll learn:**
- How to authenticate users
- How to validate requests
- How to process file uploads

---

### 4. **FOURTH: Models** (Database Schemas)
**Location:** `BACKEND/models/`

**Start with these 3:**
1. `User.js` - User data structure
2. `CreateCourse.js` - Course data structure
3. Pick one more based on interest

**What you'll learn:**
- MongoDB schema definition
- Data types and validation
- Default values
- Unique constraints

---

### 5. **FIFTH: Routes** (API Endpoints)
**Location:** `BACKEND/routes/`

**Start with these 2:**
1. `User.js` - Complete CRUD + authentication
2. `CreateCourse.js` - Simple CRUD example

**What you'll learn:**
- How to handle GET, POST, PUT, DELETE
- Error handling patterns
- Database queries with Mongoose
- Response formatting

---

### 6. **SIXTH: Controllers** (Business Logic)
**Location:** `BACKEND/controllers/`

**Files:**
1. `emailController.js` - Email sending logic
2. `offerLetter.js` - PDF generation
3. `oppEmailController.js` - Automated emails

---

## 🏗️ BACKEND ARCHITECTURE

```
Client (React Frontend)
    ↓ HTTP Request (JSON)
    
Express Server (server.js)
    ↓ Routes request
    
Middleware Layer
  - CORS check
  - JSON parsing
  - Authentication (JWT)
  - File upload handling
    ↓
    
Route Handler (routes/*.js)
    ↓ Validates input
    ↓ Calls database
    
Model (models/*.js)
    ↓ MongoDB ODM
    
Database (MongoDB)
    ↓ Stores/retrieves data
    
Response sent back
    ↓ HTTP Response (JSON)
    
Client receives data
```

---

## 📝 COMMON CODE PATTERNS

### Pattern 1: Basic Route Handler
```javascript
router.get("/endpoint", async (req, res) => {
  try {
    // 1. Get data from request
    const { param } = req.query;
    
    // 2. Process data
    const result = await Model.find({ field: param });
    
    // 3. Send response
    res.status(200).json(result);
  } catch (error) {
    // 4. Handle errors
    res.status(500).json({ message: error.message });
  }
});
```

### Pattern 2: Protected Route
```javascript
router.get("/protected", authMiddleware, async (req, res) => {
  // Only executes if middleware passes
  // req.user contains verified user data
  const user = req.user;
  res.json(user);
});
```

### Pattern 3: Create with Validation
```javascript
router.post("/create", async (req, res) => {
  const { field1, field2 } = req.body;
  
  // Validate
  if (!field1 || !field2) {
    return res.status(400).json({ message: "Missing fields" });
  }
  
  // Check duplicate
  const existing = await Model.findOne({ field1 });
  if (existing) {
    return res.status(400).json({ message: "Already exists" });
  }
  
  // Create
  const newItem = new Model({ field1, field2 });
  await newItem.save();
  
  res.status(201).json(newItem);
});
```

### Pattern 4: Update
```javascript
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  
  const item = await Model.findByIdAndUpdate(
    id,
    updateData,
    { new: true }  // Return updated document
  );
  
  if (!item) {
    return res.status(404).json({ message: "Not found" });
  }
  
  res.json(item);
});
```

### Pattern 5: Delete
```javascript
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Model.findByIdAndDelete(id);
  
  if (!item) {
    return res.status(404).json({ message: "Not found" });
  }
  
  res.json({ message: "Deleted successfully", item });
});
```

---

## 🔌 HTTP METHODS

| Method | Purpose | Status Code | Example |
|--------|---------|-------------|---------|
| GET | Read data | 200 | `GET /users` |
| POST | Create data | 201 | `POST /users` |
| PUT | Update data | 200 | `PUT /users/123` |
| DELETE | Delete data | 200 | `DELETE /users/123` |

---

## 📊 STATUS CODES

| Code | Meaning | When to Use |
|------|---------|------------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid/missing data |
| 401 | Unauthorized | Invalid credentials |
| 403 | Forbidden | No access (inactive account) |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected error |

---

## 🔐 AUTHENTICATION FLOW

### Option 1: Email/Password Login
```
User enters email + password
    ↓
POST /checkuserauth
    ↓
Backend verifies password
    ↓
JWT token created
    ↓
Token sent to frontend
    ↓
Frontend stores in localStorage
    ↓
Future requests include token in Authorization header
```

### Option 2: OTP Login
```
User enters email
    ↓
POST /send-otp
    ↓
OTP generated and emailed
    ↓
User receives OTP
    ↓
POST /verify-otp with email + otp
    ↓
JWT token created and sent
    ↓
Same as Option 1
```

---

## 🗄️ DATABASE OPERATIONS

### CREATE
```javascript
const newItem = new Model({ field1, field2 });
await newItem.save();
```

### READ - Single
```javascript
const item = await Model.findById(id);
const item = await Model.findOne({ email: "test@example.com" });
```

### READ - Multiple
```javascript
const items = await Model.find();
const items = await Model.find({ status: "active" });
```

### READ - With Sorting
```javascript
const items = await Model.find().sort({ _id: -1 });  // Newest first
const items = await Model.find().sort({ name: 1 });  // A-Z
```

### UPDATE
```javascript
const updated = await Model.findByIdAndUpdate(
  id,
  { field: newValue },
  { new: true }
);
```

### DELETE
```javascript
const deleted = await Model.findByIdAndDelete(id);
```

---

## ⚙️ ENVIRONMENT VARIABLES NEEDED

```env
# Database
DB_NAME=mongodb+srv://...

# Server
PORT=5000
FRONTEND_URL=http://localhost:5173

# Authentication
JWT_SECRET=your-secret-key

# File Uploads
CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=api-key
CLOUDINARY_API_SECRET=api-secret

# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app-password

# AI
GOOGLE_AI_API_KEY=api-key
```

---

## 🧪 TESTING CHECKLIST

Before considering the backend complete:

- [ ] All routes respond correctly
- [ ] CRUD operations work (Create, Read, Update, Delete)
- [ ] Error handling works
- [ ] Authentication works
- [ ] Database saves data correctly
- [ ] Frontend can connect and get data
- [ ] Email notifications work
- [ ] File uploads work (if applicable)
- [ ] Status codes are correct
- [ ] Validation works

---

## 📁 FILE ORGANIZATION

```
BACKEND/
├── server.js           ← START HERE
├── package.json        ← Dependencies
├── .env                ← Secrets (DON'T COMMIT)
│
├── middleware/         ← Request processors
│   ├── UserAuth.js
│   ├── cloudinary.js
│   └── verifyAdminCookie.js
│
├── models/             ← Database schemas
│   ├── User.js
│   ├── CreateCourse.js
│   ├── CreateJob.js
│   └── ... (20+ more)
│
├── routes/             ← API endpoints
│   ├── User.js
│   ├── CreateCourse.js
│   ├── CreateJob.js
│   ├── AdminLogin.js
│   └── ... (15+ more)
│
├── controllers/        ← Business logic
│   ├── emailController.js
│   ├── offerLetter.js
│   └── oppEmailController.js
│
└── config/
    └── exercise.json
```

---

## 🚀 QUICK START

```bash
# 1. Navigate to backend
cd BACKEND

# 2. Install dependencies
npm install

# 3. Create .env file with all variables
# (See environment section above)

# 4. Start server
npm start
# Or with auto-reload
npx nodemon server.js

# 5. Expected output
# Connected to MongoDB
# Server running on port 5000

# 6. Test in Postman
# GET http://localhost:5000/
# Should see: "Welcome to the Backend Server!"
```

---

## 🔍 DEBUGGING

### Log everything
```javascript
console.log("Variable:", variable);
console.log("Request:", req.body);
console.log("User:", req.user);
console.log("Error:", error);
```

### Use Postman for testing
- Set request method
- Set URL
- Add headers
- Add body (for POST/PUT)
- Click Send
- Check Response

### Common issues
- **DB connection fails**: Check connection string in .env
- **Port in use**: Change PORT in .env
- **Module not found**: Run `npm install`
- **Token invalid**: Ensure JWT_SECRET matches
- **CORS error**: Check FRONTEND_URL in .env

---

## 📚 RECOMMENDED LEARNING ORDER

1. Read `server.js` completely (30 mins)
2. Read `middleware/UserAuth.js` (15 mins)
3. Read `models/User.js` (15 mins)
4. Read `routes/CreateCourse.js` (20 mins)
5. Read `routes/User.js` fully (30 mins)
6. Install dependencies and start server (10 mins)
7. Test all endpoints in Postman (45 mins)
8. Read `routes/AdminLogin.js` (20 mins)
9. Read other route files as needed (varies)
10. Build your own simple route (60 mins)

**Total: ~4-5 hours to fully understand the backend**

---

## 🎓 LEARNING RESOURCES

- **Express.js Docs**: https://expressjs.com/
- **Mongoose Docs**: https://mongoosejs.com/
- **JWT**: https://jwt.io/
- **MongoDB**: https://docs.mongodb.com/
- **Nodemailer**: https://nodemailer.com/
- **Cloudinary**: https://cloudinary.com/documentation

---

## ✅ KEY TAKEAWAYS

1. **server.js is the entry point** - everything starts here
2. **Routes handle HTTP requests** - GET, POST, PUT, DELETE
3. **Models define data structure** - schemas for MongoDB
4. **Middleware processes requests** - validation, auth, etc.
5. **Async/await is essential** - for database operations
6. **Error handling is critical** - try-catch blocks everywhere
7. **Status codes matter** - 200, 201, 400, 404, 500
8. **JWT tokens secure routes** - included in Authorization header
9. **Environment variables are secrets** - never hardcode them
10. **Test with Postman** - verify each endpoint works

---

*You now have a complete quick reference for the KRUTANIC backend!*
*Start with server.js and work through in recommended order.*
