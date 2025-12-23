# 🗺️ BACKEND LEARNING ROADMAP

## Complete Learning Path for KRUTANIC Backend

---

## WEEK 1: FOUNDATIONS

### Day 1: Server Setup & Overview (3 hours)

#### Morning (1.5 hours)
- [ ] Read `BACKEND_QUICK_REFERENCE.md` completely
- [ ] Understand overall architecture
- [ ] Know file organization

**Exercise:** Draw the backend architecture on paper

#### Afternoon (1.5 hours)
- [ ] Install Node.js if not already installed
- [ ] Navigate to BACKEND folder
- [ ] Run `npm install`
- [ ] Create `.env` file with all variables
- [ ] Start server: `npm start`
- [ ] Test: Visit `http://localhost:5000/`

**Expected Output:**
```
Connected to MongoDB
Server running on port 5000
```

---

### Day 2: server.js Detailed Study (3 hours)

#### Morning (2 hours)
- [ ] Read [BACKEND/server.js](BACKEND/server.js) line by line
- [ ] Understand each import
- [ ] Understand middleware setup
- [ ] Understand route registration
- [ ] Understand database connection

**Code Understanding:**
```javascript
// What each line does:
const express = require("express");           // Load Express
const mongoose = require("mongoose");         // Load MongoDB
const cors = require("cors");                 // Load CORS
const dotenv = require("dotenv");             // Load .env
dotenv.config();                              // Read .env variables
const app = express();                        // Create app instance
app.use(cors({...}));                         // Enable CORS
app.use(bodyParser.json());                   // Parse JSON
app.use("/", UserRoutes);                     // Register routes
mongoose.connect(...)                         // Connect to DB
app.listen(PORT, ...)                         // Start server
```

#### Afternoon (1 hour)
- [ ] Create a simple test route in server.js
- [ ] Test the new route in Postman

**Exercise:** Add this route to server.js:
```javascript
app.get("/test", (req, res) => {
  res.json({ message: "Test route works!" });
});
```

Then test: `GET http://localhost:5000/test`

---

### Day 3: Middleware Understanding (3 hours)

#### Morning (1.5 hours)
- [ ] Read [middleware/UserAuth.js](BACKEND/middleware/UserAuth.js)
- [ ] Understand JWT concept
- [ ] Understand how tokens are verified

**JWT Flow Diagram:**
```
JWT Token = Header.Payload.Signature

Header: { alg: "HS256", typ: "JWT" }
Payload: { id: "...", email: "..." }
Signature: HMACSHA256(Header + Payload + SECRET)

When verified:
1. Decode token
2. Extract payload
3. Recalculate signature
4. Compare signatures - must match
5. If match → Token is valid
6. If no match → Token is invalid (rejected)
```

#### Afternoon (1.5 hours)
- [ ] Read [middleware/cloudinary.js](BACKEND/middleware/cloudinary.js)
- [ ] Understand file upload configuration
- [ ] Understand what environment variables are needed
- [ ] Read [middleware/verifyAdminCookie.js](BACKEND/middleware/verifyAdminCookie.js)

**Exercise:** Create your own middleware:
```javascript
// middleware/loggingMiddleware.js
const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = loggingMiddleware;
```

---

### Day 4: Database Models (3 hours)

#### Morning (2 hours)
- [ ] Read [models/User.js](BACKEND/models/User.js) completely
- [ ] Understand each field type
- [ ] Understand validation rules
- [ ] Understand default values

**Schema Fields Reference:**
```javascript
// String field - text data
title: { type: String }

// Required field - must be provided
fullname: { type: String, required: true }

// Unique field - no duplicates allowed
email: { type: String, unique: true }

// Default value - used if not provided
status: { type: String, default: 'active' }

// Date field - for timestamps
createdAt: { type: Date, default: Date.now }

// Boolean field - true/false
isActive: { type: Boolean, default: false }

// Map field - key-value pairs
sessions: { type: Map, of: String }

// Array field - list of items
tags: [String]
```

#### Afternoon (1 hour)
- [ ] Read [models/CreateCourse.js](BACKEND/models/CreateCourse.js)
- [ ] Read [models/CreateJob.js](BACKEND/models/CreateJob.js)
- [ ] Compare the two schemas

**Exercise:** Create a simple schema:
```javascript
// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number },
  pages: { type: Number },
  isRead: { type: Boolean, default: false }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
```

---

### Day 5: Routes & Endpoints (4 hours)

#### Morning (2 hours)
- [ ] Read [routes/CreateCourse.js](BACKEND/routes/CreateCourse.js) completely
- [ ] Understand the 4 CRUD operations (Create, Read, Update, Delete)
- [ ] Understand error handling

**CRUD Operations Reference:**
```javascript
// CREATE - POST
router.post("/create", async (req, res) => {
  const item = new Model(req.body);
  await item.save();
  res.status(201).json(item);
});

// READ - GET all
router.get("/all", async (req, res) => {
  const items = await Model.find();
  res.json(items);
});

// READ - GET single
router.get("/:id", async (req, res) => {
  const item = await Model.findById(req.params.id);
  res.json(item);
});

// UPDATE - PUT
router.put("/:id", async (req, res) => {
  const item = await Model.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(item);
});

// DELETE - DELETE
router.delete("/:id", async (req, res) => {
  const item = await Model.findByIdAndDelete(req.params.id);
  res.json(item);
});
```

#### Afternoon (2 hours)
- [ ] Test CreateCourse routes in Postman
- [ ] Create a course (POST)
- [ ] Get all courses (GET)
- [ ] Get single course (GET with ID)
- [ ] Update course (PUT)
- [ ] Delete course (DELETE)

**Postman Test Plan:**
```
1. POST /createcourse → Should return 201 with new course
2. GET /getcourses → Should return 200 with all courses
3. GET /getcourses?courseId=xxx → Should return 200 with single course
4. PUT /editcourse/xxx → Should return 200 with updated course
5. DELETE /deletecourse/xxx → Should return 200 with deleted course
```

---

## WEEK 2: AUTHENTICATION & USERS

### Day 6: User Routes Complete Study (4 hours)

#### Morning (2 hours)
- [ ] Read [routes/User.js](BACKEND/routes/User.js) completely
- [ ] Study the 5 main endpoints:
  1. POST /users - Create user
  2. GET /users - Get users
  3. PUT /users/:id - Update user
  4. POST /checkuserauth - Login
  5. GET /dashboard - Protected route

#### Afternoon (2 hours)
- [ ] Test all User endpoints in Postman

**Test Plan:**
```
1. Create user → POST /users
2. Login → POST /checkuserauth
3. Save token from response
4. Get user → GET /users?userId=xxx
5. Update user → PUT /users/xxx
6. Access dashboard → GET /dashboard with token
```

---

### Day 7: OTP Authentication (3 hours)

#### Morning (1.5 hours)
- [ ] Continue reading [routes/User.js](BACKEND/routes/User.js#L105-L160)
- [ ] Understand OTP generation
- [ ] Understand OTP verification
- [ ] Understand OTP expiration

**OTP Flow:**
```
1. User requests OTP → POST /send-otp
2. Backend generates 6-digit random number
3. Save OTP + expiration (10 mins) to user
4. Send OTP via email
5. User receives email with OTP
6. User submits email + OTP → POST /verify-otp
7. Backend verifies OTP matches and not expired
8. Clear OTP from database
9. Generate JWT token
10. Return token to user
```

#### Afternoon (1.5 hours)
- [ ] Test OTP flow in Postman
- [ ] Send OTP → POST /send-otp
- [ ] Check email for OTP
- [ ] Verify OTP → POST /verify-otp
- [ ] Use returned token for future requests

---

### Day 8: Admin Authentication (3 hours)

#### Morning (1.5 hours)
- [ ] Read [routes/AdminLogin.js](BACKEND/routes/AdminLogin.js)
- [ ] Understand admin registration
- [ ] Understand admin OTP login
- [ ] Compare with user authentication

#### Afternoon (1.5 hours)
- [ ] Test admin endpoints in Postman
- [ ] Create admin → POST /admin
- [ ] Send admin OTP → POST /otpsend
- [ ] Verify admin OTP → POST /otpverify
- [ ] Get admin dashboard → GET /admin/dashboard with token

---

### Day 9: Job Management (3 hours)

#### Morning (1.5 hours)
- [ ] Read [routes/CreateJob.js](BACKEND/routes/CreateJob.js)
- [ ] Understand job creation
- [ ] Understand job retrieval
- [ ] Understand job filtering

#### Afternoon (1.5 hours)
- [ ] Read [routes/JobApplication.js](BACKEND/routes/JobApplication.js)
- [ ] Test job endpoints in Postman
- [ ] Test job application endpoints

---

### Day 10: Additional Routes (3 hours)

#### Morning (1.5 hours)
- [ ] Read [routes/Certificate.js](BACKEND/routes/Certificate.js)
- [ ] Read [routes/MasterClass.js](BACKEND/routes/MasterClass.js)
- [ ] Read [routes/AddEvent.js](BACKEND/routes/AddEvent.js)

#### Afternoon (1.5 hours)
- [ ] Read [routes/Mentorship.js](BACKEND/routes/Mentorship.js)
- [ ] Read [routes/ReferAndEarn.js](BACKEND/routes/ReferAndEarn.js)
- [ ] Understand the pattern - all follow same CRUD structure

---

## WEEK 3: ADVANCED TOPICS

### Day 11: File Uploads & Cloudinary (3 hours)

#### Morning (1.5 hours)
- [ ] Study [middleware/cloudinary.js](BACKEND/middleware/cloudinary.js)
- [ ] Understand Cloudinary configuration
- [ ] Understand file upload process

#### Afternoon (1.5 hours)
- [ ] Look for file upload examples in routes
- [ ] Understand formidable/busboy for parsing
- [ ] Test file upload endpoints

---

### Day 12: Email & Notifications (3 hours)

#### Morning (1.5 hours)
- [ ] Read [controllers/emailController.js](BACKEND/controllers/emailController.js)
- [ ] Understand email template formatting
- [ ] Understand sendEmail function

**Email Structure:**
```javascript
const EmailMessage = `
  <div style="...">  ← HTML template
    <h1>Header</h1>
    <p>Content</p>
    <p>${variableData}</p>  ← Insert data
  </div>
`;

await sendEmail({
  email: recipient,
  subject: "Email Subject",
  message: EmailMessage
});
```

#### Afternoon (1.5 hours)
- [ ] Look at OTP email examples
- [ ] Look at offer letter examples
- [ ] Understand HTML email formatting

---

### Day 13: PDF Generation (3 hours)

#### Morning (1.5 hours)
- [ ] Read [controllers/offerLetter.js](BACKEND/controllers/offerLetter.js)
- [ ] Understand PDF generation with pdf-lib
- [ ] Understand certificate generation

#### Afternoon (1.5 hours)
- [ ] Study PDF-lib documentation
- [ ] Understand how to manipulate PDF files
- [ ] Test certificate generation if available

---

### Day 14: Integration & Testing (4 hours)

#### All Day
- [ ] Connect frontend to backend
- [ ] Test complete user flows:
  1. Registration → Login → Dashboard
  2. Create course → Enroll → Access
  3. Apply for job → Receive email
- [ ] Test error scenarios
- [ ] Document any issues found
- [ ] Fix bugs discovered

---

## MONTH 2+: ADVANCED UNDERSTANDING

### Week 4: Deep Dives by Module

- **Day 15-16:** BDA (Sales) Module
  - CreateBDA routes
  - TeamName models
  - Revenue calculations

- **Day 17-18:** Operations Module
  - CreateOperation routes
  - Payment tracking
  - Transaction management

- **Day 19-20:** Marketing Module
  - CreateMarketing routes
  - Campaign management

---

## HANDS-ON PROJECTS

### Project 1: Simple To-Do API (1 day)

**Create your own simple REST API:**

```javascript
// models/Todo.js
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  createdAt: { type: Date, default: Date.now }
});

// routes/todos.js
// Implement: POST, GET, PUT, DELETE
// Test with Postman
```

### Project 2: User Management System (2 days)

**Build a complete user system:**
1. User registration
2. User login with email/password
3. User profile update
4. User deletion
5. List all users
6. Complete with JWT authentication

### Project 3: Blog API (3 days)

**Create a blogging platform:**
1. User authentication
2. Create blog posts
3. Add comments
4. Delete posts
5. Get posts by author
6. Get all posts with pagination

---

## TESTING STRATEGY

### Unit Testing
```javascript
// Test individual functions
const result = someFunction(input);
expect(result).toBe(expectedOutput);
```

### Integration Testing
```javascript
// Test API endpoints
POST /users
Expected: 201 status, user object
Actual: ✓ Correct
```

### End-to-End Testing
```javascript
// Test complete user flow
1. Register user
2. Login
3. Create resource
4. Update resource
5. Delete resource
All should work together
```

---

## DEBUGGING TECHNIQUES

### 1. Console Logging
```javascript
console.log("Variable:", variable);
console.log("Request:", req.body);
console.log("Error:", error.message);
```

### 2. Debugger
```bash
node --inspect server.js
# Then visit chrome://inspect
```

### 3. Postman Testing
- Set up test collection
- Use variables for dynamic data
- Check response status and body

### 4. MongoDB Compass
- View documents in real-time
- Verify data saved correctly
- Run manual queries

---

## CHECKLIST - YOU'LL KNOW BACKEND WHEN:

- [ ] You can read and understand any route file
- [ ] You can write a new route from scratch
- [ ] You understand how JWT works
- [ ] You can set up MongoDB connections
- [ ] You understand async/await
- [ ] You can debug issues in Postman
- [ ] You understand error handling
- [ ] You can validate user input
- [ ] You understand database schemas
- [ ] You can connect frontend to backend
- [ ] You understand middleware
- [ ] You can implement authentication
- [ ] You can send emails
- [ ] You understand status codes
- [ ] You can implement pagination

---

## TIME ESTIMATE

| Phase | Duration | Effort |
|-------|----------|--------|
| Week 1 - Foundations | 20 hours | High |
| Week 2 - Authentication | 20 hours | High |
| Week 3 - Advanced | 15 hours | Medium |
| Month 2+ - Mastery | 40+ hours | Medium |
| **Total** | **95+ hours** | - |

---

## RESOURCES & DOCUMENTATION

**Express.js:**
- https://expressjs.com/
- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs

**MongoDB & Mongoose:**
- https://mongoosejs.com/docs/
- https://docs.mongodb.com/

**Authentication:**
- https://jwt.io/
- https://en.wikipedia.org/wiki/JSON_Web_Token

**Node.js:**
- https://nodejs.org/en/docs/
- https://nodejs.org/en/docs/guides/nodejs-web-development-tutorials/

**Video Resources:**
- Express.js Full Course on YouTube
- MongoDB with Node.js on YouTube
- REST API Development on YouTube

---

## DAILY PRACTICE ROUTINE

Each day after learning:

```
1. Review what you learned (10 mins)
2. Look at 2-3 related files (15 mins)
3. Test in Postman (20 mins)
4. Try to modify something (15 mins)
5. Document your findings (10 mins)
Total: 70 minutes daily
```

---

## SUCCESS INDICATORS

✅ You can explain what happens when a request comes in  
✅ You can read any route file and understand what it does  
✅ You can find bugs and fix them  
✅ You can add a new endpoint without help  
✅ You can explain JWT authentication  
✅ You understand databases and schemas  
✅ You know all the status codes  
✅ You can test APIs in Postman  
✅ You can debug issues  
✅ You feel confident about the backend  

---

*This roadmap will take you from zero to full backend understanding in 2-3 months with consistent effort.*

*Start with Day 1 and progress steadily. Don't rush - understanding is more important than speed.*
