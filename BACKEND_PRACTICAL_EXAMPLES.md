# 🔧 BACKEND PRACTICAL GUIDE - Real Code Examples

## Complete Real Examples from KRUTANIC

---

## 1. USER AUTHENTICATION FLOW (Complete Example)

### User Registration (Create User)

**Route: POST /users**

```javascript
router.post("/users", async (req, res) => {
  // 1. Extract data from request body
  const { fullname, email, phone } = req.body;
  
  try {
    // 2. Check if user already exists (prevent duplicates)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "User already created check in active users" 
      });
    }

    // 3. Create new user object
    const newUser = new User({
      fullname,
      email,
      phone,
      // password defaults to 'Krutanic@123'
      // status defaults to 'active'
    });

    // 4. Save to MongoDB
    await newUser.save();

    // 5. Send success response with the created user
    res.status(200).json({ 
      message: "User created successfully", 
      user: newUser 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
```

**How to Test (Postman):**
```
POST http://localhost:5000/users
Content-Type: application/json

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
    "atschecker": false,
    "jobboard": false,
    ...
  }
}
```

---

### User Login with Email & Password

**Route: POST /checkuserauth**

```javascript
router.post("/checkuserauth", async (req, res) => {
  // 1. Extract email and password from request
  const { email, password } = req.body;
  
  try {
    // 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        message: "Invalid email or password" 
      });
    }

    // 3. Check if account is active
    if (user.status === "inactive") {
      return res.status(403).json({ 
        message: "Your account is inactive. Please contact support." 
      });
    }

    // 4. Verify password matches
    if (password !== user.password) {
      return res.status(401).json({ 
        message: "Invalid email or password" 
      });
    }

    // 5. Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },  // Payload
      process.env.JWT_SECRET,               // Secret key
      { expiresIn: "1h" }                   // Expire in 1 hour
    );

    // 6. Send token to frontend
    res.status(200).json({ 
      token, 
      _id: user._id, 
      email: user.email 
    });
  } catch (err) {
    console.error("Error during login", err);
    res.status(500).json({ message: "Server error" });
  }
});
```

**How to Test (Postman):**
```
POST http://localhost:5000/checkuserauth
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Krutanic@123"
}

Expected Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "_id": "507f1f77bcf86cd799439011",
  "email": "john@example.com"
}

Error Response (401):
{
  "message": "Invalid email or password"
}
```

---

### OTP-Based Login Flow

**Step 1: Send OTP**

```javascript
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        message: "User not found enter a valid email" 
      });
    }

    // Generate random 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000);
    
    // Set OTP expiration to 10 minutes from now
    const otpExpires = Date.now() + 10 * 60 * 1000;

    // Create formatted email message
    const EmailMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; 
                  border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #F15B29; color: #fff; text-align: center; padding: 20px;">
          <h1>Krutanic</h1>
        </div>
        <div style="padding: 20px; text-align: center;">
          <p style="font-size: 16px; color: #333;">
            Hello, Login to your account using the OTP below:
          </p>
          <p style="font-size: 24px; font-weight: bold; color: #4a90e2; margin: 10px 0;">
            ${otp}
          </p>
          <p style="font-size: 14px; color: #555;">
            This OTP is valid for <strong>10 minutes</strong>. 
            Please do not share it with anyone.
          </p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #888; 
                    padding: 10px 0; border-top: 1px solid #ddd;">
          <p>&copy; 2024 Krutanic. All Rights Reserved.</p>
        </div>
      </div>
    `;

    // Save OTP and expiration to user
    user.otp = otp;
    user.otpExpires = otpExpires;

    // Save user and send email simultaneously
    await Promise.all([
      user.save(),
      sendEmail({ 
        email, 
        subject: "Your OTP for Login", 
        message: EmailMessage 
      }),
    ]);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending OTP" });
  }
});
```

**Step 2: Verify OTP**

```javascript
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if account is active
    if (user.status === "inactive") {
      return res.status(403).json({ 
        message: "Your account is inactive. Please contact support." 
      });
    }

    // Check if OTP exists and hasn't expired
    if (!user.otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ 
        message: "OTP expired. Please request a new one." 
      });
    }

    // Verify OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Clear OTP after successful verification
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return token for future requests
    res.status(200).json({ 
      token, 
      _id: user._id, 
      email: user.email 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error verifying OTP" });
  }
});
```

---

## 2. COURSE MANAGEMENT (Complete CRUD)

### Create Course

**Route: POST /createcourse**

```javascript
router.post("/createcourse", async (req, res) => {
  // Extract course data
  const { title, description } = req.body;
  
  try {
    // Create new course instance
    const course = new CreateCourse({
      title,
      description,
      // session defaults to empty object
    });

    // Save to database
    await course.save();

    // Return created course with generated _id
    res.status(201).json(course);  // 201 = Resource Created
  } catch (error) {
    res.status(400).json({ message: error.message });  // 400 = Bad Request
  }
});
```

**Test Example:**
```
POST http://localhost:5000/createcourse
Content-Type: application/json

{
  "title": "Node.js Advanced",
  "description": "Master backend development with Node.js"
}

Response (201):
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Node.js Advanced",
  "description": "Master backend development with Node.js",
  "session": {}
}
```

---

### Read All Courses (with optional filtering)

**Route: GET /getcourses**

```javascript
router.get("/getcourses", async (req, res) => {
  // Optional: Get specific course by ID from query params
  const { courseId } = req.query;
  
  try {
    let courses;
    
    if (courseId) {
      // Get single course by ID
      courses = await CreateCourse.findById(courseId);
      
      if (!courses) {
        return res.status(404).json({ message: "Course not found" });
      }
    } else {
      // Get all courses sorted by newest first
      courses = await CreateCourse.find().sort({ _id: -1 });
      // sort({ _id: -1 }) means: sort by _id in descending order (-1)
    }
    
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
```

**Test Examples:**
```
# Get all courses
GET http://localhost:5000/getcourses

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Node.js Advanced",
    "description": "...",
    "session": {}
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "React Advanced",
    "description": "...",
    "session": {}
  }
]

# Get specific course
GET http://localhost:5000/getcourses?courseId=507f1f77bcf86cd799439011

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Node.js Advanced",
  ...
}
```

---

### Update Course

**Route: PUT /editcourse/:_id**

```javascript
router.put("/editcourse/:_id", async (req, res) => {
  // Extract ID from URL parameter
  const { _id } = req.params;
  
  // Extract updated data from request body
  const { title, description } = req.body;

  try {
    // Find and update course by ID
    // { new: true } returns the updated document instead of original
    const course = await CreateCourse.findByIdAndUpdate(
      _id,
      { title, description },
      { new: true }
    );

    // If course doesn't exist
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Return updated course
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
```

**Test Example:**
```
PUT http://localhost:5000/editcourse/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "title": "Node.js Mastery",
  "description": "Complete Node.js course for professionals"
}

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Node.js Mastery",
  "description": "Complete Node.js course for professionals",
  "session": {}
}
```

---

### Delete Course

**Route: DELETE /deletecourse/:_id**

```javascript
router.delete("/deletecourse/:_id", async (req, res) => {
  const { _id } = req.params;
  
  try {
    // Find and delete course by ID
    const course = await CreateCourse.findByIdAndDelete(_id);
    
    // Return deleted course as confirmation
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
```

**Test Example:**
```
DELETE http://localhost:5000/deletecourse/507f1f77bcf86cd799439011

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Node.js Mastery",
  "description": "...",
  "session": {}
}
```

---

## 3. PROTECTED ROUTE WITH AUTHENTICATION

### Using Middleware for Protected Routes

**Protected Route Example:**

```javascript
// This route requires valid JWT token
router.get("/dashboard", authMiddleware, (req, res) => {
  // authMiddleware checks for valid token before this executes
  // req.user is set by middleware if token is valid
  
  res.status(200).json({ 
    message: "Welcome to the dashboard!",
    user: req.user  // Contains { id, email }
  });
});
```

**How it works:**

```
Request: GET /dashboard
  ↓
Authorization header checked
  ↓
Token extracted and verified
  ↓
If valid → req.user set, continue
If invalid → Return 401 error
  ↓
Route handler executes
  ↓
Response sent back
```

**Frontend Code to Use Protected Route:**

```javascript
// After login, store token
localStorage.setItem('token', response.data.token);

// For protected routes, include token in header
const response = await axios.get(
  'http://localhost:5000/dashboard',
  {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  }
);
```

---

## 4. ADMIN AUTHENTICATION (OTP Flow)

**Route: POST /otpsend (Send OTP to Admin)**

```javascript
router.post("/otpsend", expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Find admin by email in AdminMail collection
    const admin = await adminMail.findOne({ email });
    if (!admin) {
      return res.status(500).json({ error: "Admin email not found" });
    }

    // Verify the provided email matches admin email
    if (email !== admin.email) {
      return res.status(401).json({ 
        error: "You are not authorized as admin" 
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000);

    // Create HTML email template
    const EmailMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; 
                  border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #F15B29; color: #fff; text-align: center; padding: 20px;">
          <h1>Krutanic</h1>
        </div>
        <div style="padding: 20px; text-align: center;">
          <p style="font-size: 16px; color: #333;">Welcome back! ADMIN,</p>
          <p style="font-size: 14px; color: #555;">
            Your One-Time Password (OTP) for verification is:
          </p>
          <p style="font-size: 24px; font-weight: bold; color: #4a90e2; margin: 10px 0;">
            ${otp}
          </p>
          <p style="font-size: 14px; color: #555;">
            This OTP is valid for <strong>10 minutes</strong>. 
            Please do not share it with anyone.
          </p>
        </div>
      </div>
    `;

    // Save OTP to admin document
    admin.otp = otp;

    // Execute both operations in parallel
    await Promise.all([
      admin.save(),
      sendEmail({ 
        email, 
        subject: "Krutanic Admin Login Credentials", 
        message: EmailMessage 
      }),
    ]);

    res.status(200).json({ message: "OTP sent to your email!" });
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to send OTP", 
      error: error.message 
    });
  }
}));
```

---

## 5. UPDATING USER PASSWORD

**Route: PUT /updatepassword**

```javascript
router.put("/updatepassword", async (req, res) => {
  try {
    // Extract email and new password
    const { email, newPassword } = req.body;

    // Validate input
    if (!email || !newPassword) {
      return res.status(400).json({ 
        message: "Email and new password are required" 
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Send success message
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
```

**Test Example:**
```
PUT http://localhost:5000/updatepassword
Content-Type: application/json

{
  "email": "john@example.com",
  "newPassword": "NewSecurePassword@123"
}

Response (200):
{
  "message": "Password updated successfully"
}
```

---

## KEY PATTERNS IN THIS CODEBASE

### 1. Error Handling Pattern
```javascript
try {
  // Attempt database operation
  const result = await Model.findById(id);
  
  // Check for not found
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  
  // Success
  res.status(200).json(result);
} catch (error) {
  // Server error
  res.status(500).json({ message: "Server error" });
}
```

### 2. Data Validation Pattern
```javascript
// Check if required fields exist
if (!email || !password) {
  return res.status(400).json({ 
    message: "Email and password are required" 
  });
}

// Check if user exists
const user = await User.findOne({ email });
if (!user) {
  return res.status(404).json({ message: "User not found" });
}

// Check status/conditions
if (user.status === "inactive") {
  return res.status(403).json({ message: "Account inactive" });
}
```

### 3. Password Verification Pattern
```javascript
// Simple string comparison (note: in production use bcrypt!)
if (user.password !== password) {
  return res.status(401).json({ message: "Invalid password" });
}
```

### 4. JWT Token Creation Pattern
```javascript
const token = jwt.sign(
  { id: user._id, email: user.email },  // Payload
  process.env.JWT_SECRET,               // Secret
  { expiresIn: "1h" }                   // Options
);
```

### 5. Email Sending Pattern
```javascript
const emailMessage = `<html template>`;

await Promise.all([
  user.save(),
  sendEmail({ email, subject: "...", message: emailMessage })
]);
```

---

## RESPONSE STATUS CODES USED

| Code | Status | When Used |
|------|--------|-----------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Missing/invalid data |
| 401 | Unauthorized | Invalid credentials or invalid token |
| 403 | Forbidden | Valid user but no access (inactive account) |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected server error |

---

## DEBUGGING TIPS

1. **Check Request Body:**
```javascript
console.log("Request body:", req.body);
console.log("Request params:", req.params);
console.log("Request query:", req.query);
```

2. **Check Database Results:**
```javascript
const user = await User.findOne({ email });
console.log("Found user:", user);
```

3. **Check Errors:**
```javascript
catch (error) {
  console.error("Detailed error:", error);
  console.error("Error message:", error.message);
  console.error("Error stack:", error.stack);
}
```

4. **Use Postman to Test:**
- Set breakpoints in code
- Log all variables
- Check request/response in Postman network tab

---

*This guide covers the most important patterns used throughout the KRUTANIC backend!*
