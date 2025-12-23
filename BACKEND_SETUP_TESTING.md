# 🚀 BACKEND SETUP & TESTING GUIDE

## STEP 1: ENVIRONMENT SETUP

### 1.1 Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account or local MongoDB
- Postman (for testing)
- VS Code or any code editor

### 1.2 Create .env File

**Location:** `BACKEND/.env`

```env
# Database Configuration
DB_NAME=mongodb+srv://username:password@cluster0.mongodb.net/krutanic

# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173

# JWT Configuration
JWT_SECRET=your-super-secret-key-change-this-in-production

# Cloudinary Configuration (for file uploads)
CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# Google AI API (for AI features)
GOOGLE_AI_API_KEY=your-google-ai-key
```

### 1.3 Getting Environment Secrets

#### MongoDB Connection String
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

#### Cloudinary Credentials
1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard
3. Copy: Cloud Name, API Key, API Secret

#### Gmail App Password (for Nodemailer)
1. Enable 2FA on Gmail
2. Create App Password: [Google Account](https://myaccount.google.com/apppasswords)
3. Copy the 16-character password

#### JWT Secret
- Can be any random string
- Example: `your-super-secret-jwt-key-12345`

---

## STEP 2: INSTALLATION

### 2.1 Install Dependencies

```bash
# Navigate to backend folder
cd BACKEND

# Install all dependencies
npm install

# Or using yarn
yarn install
```

**Expected Output:**
```
added 156 packages in 45s
```

### 2.2 Verify Installation

```bash
# Check if all packages installed
npm list

# Or check specific package
npm ls express
```

---

## STEP 3: START THE SERVER

### 3.1 Development Mode (with auto-restart)

```bash
# Install nodemon globally (if not already installed)
npm install -g nodemon

# Start with nodemon
npx nodemon server.js
```

**Expected Output:**
```
Connected to MongoDB
Server running on port 5000
```

### 3.2 Production Mode (simple start)

```bash
npm start
```

### 3.3 Custom Port

```bash
# Change PORT in .env file
PORT=8000

# Server will now run on localhost:8000
```

---

## STEP 4: VERIFY SERVER IS RUNNING

### 4.1 Test Base URL

Open browser and go to:
```
http://localhost:5000/
```

**Expected Response:**
```
Welcome to the Backend Server!
```

### 4.2 Check MongoDB Connection

Look at console output for:
```
Connected to MongoDB
```

If you see this, database is connected ✅

---

## STEP 5: TESTING WITH POSTMAN

### 5.1 Install & Open Postman
- Download from [postman.com](https://www.postman.com/downloads/)
- Create account and sign in
- Create new workspace

### 5.2 Create Collection

1. Click "Collections" → "+"
2. Name it "KRUTANIC Backend"
3. Create sub-folders:
   - Authentication
   - Users
   - Courses
   - Jobs
   - etc.

---

## COMPLETE TEST SCENARIOS

### SCENARIO 1: USER REGISTRATION & LOGIN

#### Test 1.1: Register User

```
Method: POST
URL: http://localhost:5000/users
Headers:
  Content-Type: application/json

Body (JSON):
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
}

Expected Response (200):
{
  "message": "User created successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "password": "Krutanic@123",
    "status": "active",
    "otp": null,
    "otpExpires": null,
    "pdfUrl": null,
    "jobResume": null,
    "atschecker": false,
    "jobboard": false,
    "myjob": false,
    "mockinterview": false,
    "exercise": false,
    "__v": 0
  }
}

Save the "_id" value for future tests!
```

#### Test 1.2: Login User

```
Method: POST
URL: http://localhost:5000/checkuserauth
Headers:
  Content-Type: application/json

Body (JSON):
{
  "email": "john@example.com",
  "password": "Krutanic@123"
}

Expected Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImlhdCI6MTcwMjc2MzQ1NiwiZXhwIjoxNzAyNzY3MDU2fQ.abc123xyz",
  "_id": "507f1f77bcf86cd799439011",
  "email": "john@example.com"
}

Save the "token" - you'll need this for protected routes!
```

#### Test 1.3: Get User Profile

```
Method: GET
URL: http://localhost:5000/users?userId=507f1f77bcf86cd799439011
Headers:
  Content-Type: application/json

Expected Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "fullname": "John Doe",
  ...
}
```

---

### SCENARIO 2: COURSE MANAGEMENT

#### Test 2.1: Create Course

```
Method: POST
URL: http://localhost:5000/createcourse
Headers:
  Content-Type: application/json

Body (JSON):
{
  "title": "Advanced Node.js",
  "description": "Learn Node.js and Express for building scalable APIs"
}

Expected Response (201):
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Advanced Node.js",
  "description": "Learn Node.js and Express for building scalable APIs",
  "session": {},
  "__v": 0
}

Save the "_id" for the next tests!
```

#### Test 2.2: Get All Courses

```
Method: GET
URL: http://localhost:5000/getcourses
Headers:
  Content-Type: application/json

Expected Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Advanced Node.js",
    "description": "...",
    "session": {}
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "title": "React Mastery",
    "description": "...",
    "session": {}
  }
]
```

#### Test 2.3: Get Single Course

```
Method: GET
URL: http://localhost:5000/getcourses?courseId=507f1f77bcf86cd799439012
Headers:
  Content-Type: application/json

Expected Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Advanced Node.js",
  "description": "...",
  "session": {}
}
```

#### Test 2.4: Update Course

```
Method: PUT
URL: http://localhost:5000/editcourse/507f1f77bcf86cd799439012
Headers:
  Content-Type: application/json

Body (JSON):
{
  "title": "Advanced Node.js & Express",
  "description": "Master Node.js, Express, and MongoDB for production applications"
}

Expected Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Advanced Node.js & Express",
  "description": "Master Node.js, Express, and MongoDB for production applications",
  "session": {}
}
```

#### Test 2.5: Delete Course

```
Method: DELETE
URL: http://localhost:5000/deletecourse/507f1f77bcf86cd799439012
Headers:
  Content-Type: application/json

Expected Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Advanced Node.js & Express",
  "description": "...",
  "session": {}
}

(Course is now deleted from database)
```

---

### SCENARIO 3: OTP-BASED LOGIN

#### Test 3.1: Send OTP

```
Method: POST
URL: http://localhost:5000/send-otp
Headers:
  Content-Type: application/json

Body (JSON):
{
  "email": "john@example.com"
}

Expected Response (200):
{
  "message": "OTP sent successfully"
}

(Check email for OTP - it's valid for 10 minutes)
```

#### Test 3.2: Verify OTP

```
Method: POST
URL: http://localhost:5000/verify-otp
Headers:
  Content-Type: application/json

Body (JSON):
{
  "email": "john@example.com",
  "otp": "123456"  (Replace with actual OTP from email)
}

Expected Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "_id": "507f1f77bcf86cd799439011",
  "email": "john@example.com"
}
```

---

### SCENARIO 4: UPDATE PASSWORD

#### Test 4.1: Change Password

```
Method: PUT
URL: http://localhost:5000/updatepassword
Headers:
  Content-Type: application/json

Body (JSON):
{
  "email": "john@example.com",
  "newPassword": "NewSecurePassword@123"
}

Expected Response (200):
{
  "message": "Password updated successfully"
}

(Old password is no longer valid)
```

---

### SCENARIO 5: ADMIN LOGIN

#### Test 5.1: Create Admin

```
Method: POST
URL: http://localhost:5000/admin
Headers:
  Content-Type: application/json

Body (JSON):
{
  "email": "admin@krutanic.com",
  "password": "AdminSecure@123",
  "otp": null
}

Expected Response (200):
{
  "message": "Admin email saved successfully"
}
```

#### Test 5.2: Send Admin OTP

```
Method: POST
URL: http://localhost:5000/otpsend
Headers:
  Content-Type: application/json

Body (JSON):
{
  "email": "admin@krutanic.com"
}

Expected Response (200):
{
  "message": "OTP sent to your email!"
}

(Check email for OTP)
```

#### Test 5.3: Verify Admin OTP

```
Method: POST
URL: http://localhost:5000/otpverify
Headers:
  Content-Type: application/json

Body (JSON):
{
  "email": "admin@krutanic.com",
  "otp": "123456"  (Replace with actual OTP)
}

Expected Response (200):
{
  "message": "OTP verified successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "_id": "admin-id",
  "email": "admin@krutanic.com"
}
```

---

## COMMON ERRORS & SOLUTIONS

### Error 1: Cannot Connect to MongoDB

**Error Message:**
```
Failed to connect to MongoDB: MongoNetworkError
```

**Solutions:**
1. Check DB_NAME in .env file
2. Verify MongoDB Atlas cluster is running
3. Add your IP to MongoDB Atlas whitelist
4. Check username/password in connection string

**Test Connection:**
```bash
# In MongoDB Compass, paste connection string:
mongodb+srv://username:password@cluster0.mongodb.net/krutanic
```

---

### Error 2: Port Already in Use

**Error Message:**
```
listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

**Windows:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
PORT=8000
```

---

### Error 3: Cannot Find Module

**Error Message:**
```
Cannot find module 'express'
```

**Solutions:**
```bash
# Reinstall all dependencies
npm install

# Or install specific package
npm install express

# Check if node_modules exists
ls node_modules/
```

---

### Error 4: JWT Token Invalid

**Error Message:**
```
{
  "message": "Invalid token"
}
```

**Solutions:**
1. Ensure you copied full token from login response
2. Check JWT_SECRET in .env matches server
3. Token might be expired (default 1 hour)
4. Get new token by logging in again

---

### Error 5: CORS Error

**Browser Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**
1. Check FRONTEND_URL in .env matches your frontend URL
2. Restart server after changing .env
3. Check if requests have proper headers:
```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': 'your-token-here'  // For protected routes
}
```

---

## PERFORMANCE TIPS

### 1. Database Indexing
```javascript
// Add indexes to frequently queried fields
email: { type: String, unique: true, index: true },
status: { type: String, index: true }
```

### 2. Pagination (for large datasets)
```javascript
router.get("/users", async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  
  const users = await User.find()
    .skip(skip)
    .limit(limit);
    
  res.json(users);
});

// Usage: GET /users?page=1&limit=10
```

### 3. Projection (fetch only needed fields)
```javascript
// Instead of fetching all fields
const user = await User.findById(id);

// Fetch only specific fields
const user = await User.findById(id).select('fullname email');
```

---

## DEPLOYMENT CHECKLIST

Before deploying to production:

- [ ] All environment variables set correctly
- [ ] Database backups configured
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] Input validation added
- [ ] Error logging setup
- [ ] Password encryption (bcrypt) used
- [ ] JWT secrets are strong
- [ ] CORS origins whitelisted
- [ ] Database indexes created
- [ ] API documentation complete

---

## HELPFUL COMMANDS

```bash
# Start server with nodemon
npx nodemon server.js

# Check for syntax errors
node -c server.js

# View all running processes
ps aux | grep node

# Stop server
Ctrl + C

# Clear npm cache
npm cache clean --force

# Check npm version
npm --version

# Check Node version
node --version

# Install specific version
npm install express@4.21.2

# Uninstall package
npm uninstall express

# Update all packages
npm update

# See available npm scripts
npm run
```

---

## NEXT STEPS

1. ✅ Setup environment variables
2. ✅ Install dependencies
3. ✅ Start the server
4. ✅ Test all endpoints with Postman
5. ✅ Check MongoDB for created documents
6. ✅ Review error handling
7. ✅ Add input validation
8. ✅ Test authentication flows
9. ✅ Connect frontend to backend
10. ✅ Deploy to production

---

*You now have everything you need to run and test the KRUTANIC backend!*
