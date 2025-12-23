# KRUTANIC CODEBASE OVERVIEW

## Project Overview
**KRUTANIC** is a full-stack educational platform with management system for courses, mentorship, BDA operations, and talent placement. It's built with a **Node.js/Express backend** and a **React frontend** with multiple user roles.

---

## 📁 PROJECT STRUCTURE

### **BACKEND** (Node.js + Express + MongoDB)
```
BACKEND/
├── server.js                  # Main server entry point
├── package.json              # Backend dependencies
├── vercel.json               # Vercel deployment config
├── .env                      # Environment variables
├── config/
│   └── exercise.json         # Exercise configuration
├── controllers/              # Business logic
│   ├── emailController.js    # Email operations
│   ├── offerLetter.js        # Offer letter generation
│   └── oppEmailController.js # Opportunity email handling
├── middleware/               # Custom middleware
│   ├── cloudinary.js         # Image/file upload handling
│   ├── UserAuth.js           # User authentication
│   └── verifyAdminCookie.js  # Admin authentication
├── models/                   # MongoDB schemas (23 models)
│   ├── User.js              # User schema
│   ├── CreateCourse.js      # Course schema
│   ├── CreateJob.js         # Job postings
│   ├── Advance.js           # Advanced features
│   ├── Mentorship.js        # Mentorship program
│   ├── Certificate.js       # Certificate management
│   ├── EventApplication.js  # Event registration
│   ├── JobApplication.js    # Job applications
│   ├── MasterClass.js       # Master classes
│   ├── Alumni.js            # Alumni data
│   ├── ReferAndEarn.js      # Referral program
│   ├── CreateBDA.js         # BDA management
│   ├── CreateOperation.js   # Operations team
│   ├── CreateMarketing.js   # Marketing team
│   └── ... (more models)
└── routes/                   # API endpoints (20+ routes)
    ├── User.js              # User authentication & profile
    ├── CreateCourse.js      # Course CRUD
    ├── CreateJob.js         # Job management
    ├── JobApplication.js    # Job application handling
    ├── Mentorship.js        # Mentorship endpoints
    ├── Advance.js           # Advanced features
    ├── MasterClass.js       # Master class management
    ├── AddEvent.js          # Event management
    ├── Certificate.js       # Certificate issuance
    ├── ReferAndEarn.js      # Referral system
    ├── CreateBDA.js         # BDA team management
    ├── CreateOperation.js   # Operations management
    ├── CreateMarketing.js   # Marketing team management
    ├── AdminLogin.js        # Admin authentication
    ├── mock.js              # Mock interview endpoints
    ├── excercise.js         # Exercise management
    ├── resumeats.js         # Resume ATS system
    └── ... (more routes)
```

### **FRONTEND** (React + Vite + Tailwind CSS)
```
FRONTEND/
├── package.json             # Frontend dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── index.html              # HTML entry point
├── public/
│   └── sitemap.xml         # SEO sitemap
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main app with routing
│   ├── API.jsx             # API configuration
│   ├── axiosConfig.jsx     # Axios setup
│   ├── checkAdminAuth.jsx  # Admin auth check
│   ├── index.css           # Global styles
│   ├── Admin/              # Admin dashboard components
│   │   ├── AdminHeader.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AddCourse.jsx
│   │   ├── AddModule.jsx
│   │   ├── AddEvent.jsx
│   │   ├── CreateBDA.jsx
│   │   ├── CreateOperation.jsx
│   │   ├── CreateMarketing.jsx
│   │   ├── MasterClasses.jsx
│   │   ├── EventRegistration.jsx
│   │   ├── BookedList.jsx
│   │   ├── FullPaidList.jsx
│   │   ├── DefaultList.jsx
│   │   ├── AcceptedApplication.jsx
│   │   ├── PendingApplication.jsx
│   │   └── ... (more admin components)
│   ├── BDA/                # BDA Team Dashboard
│   │   ├── TeamLogin.jsx
│   │   ├── Home.jsx
│   │   ├── BDAHeader.jsx
│   │   ├── Booked.jsx
│   │   ├── FullPaid.jsx
│   │   ├── Default.jsx
│   │   ├── AddUser.jsx
│   │   ├── TeamDetail.jsx
│   │   ├── BDARevenueSheet.jsx
│   │   └── ... (more BDA components)
│   ├── Operation/          # Operations Team Dashboard
│   │   ├── OperationLogin.jsx
│   │   ├── OperationDashboard.jsx
│   │   ├── BookedPayment.jsx
│   │   ├── FullPayment.jsx
│   │   └── ... (more operation components)
│   ├── User/               # User pages
│   ├── Components/         # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ... (more shared components)
│   ├── page/               # Page components
│   │   ├── landing.jsx     # Homepage
│   │   ├── Login.jsx
│   │   ├── Career.jsx
│   │   ├── AdvanceCourses.jsx
│   │   ├── MasterClass.jsx
│   │   ├── Mentorship.jsx
│   │   ├── Alumni.jsx
│   │   ├── ContactUs.jsx
│   │   └── AdvanceCourse/  # Advanced courses
│   │       ├── DataScience.jsx
│   │       ├── MernStack.jsx
│   │       ├── DigitalMarket.jsx
│   │       └── ... (more courses)
│   ├── Event/              # Event management components
│   ├── Marketing/          # Marketing team components
│   └── assets/             # Images, icons, etc.
```

---

## 🔧 KEY TECHNOLOGIES

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Cloudinary, Formidable, Busboy
- **Email**: Nodemailer
- **PDF**: pdf-lib, pdf-parse
- **Rate Limiting**: express-rate-limit
- **AI**: Google Generative AI
- **Dev**: Nodemon

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, Emotion (CSS-in-JS)
- **Routing**: React Router DOM v7
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **UI Components**: Material-UI, Lucide Icons
- **Animations**: Framer Motion, GSAP
- **Charts**: Chart.js + react-chartjs-2
- **Rich Text**: Quill, React-Quill
- **Video**: React Player
- **Carousels**: React Owl Carousel, React Slick
- **Notifications**: React Toastify, React Hot Toast
- **Machine Learning**: TensorFlow.js, Facemesh

---

## 👥 USER ROLES & MODULES

### 1. **Student/User Module**
- Registration & Login (with OTP)
- Course enrollment
- Mentorship participation
- Job applications
- Master class registration
- Certificate download
- Referral program
- Event registration

### 2. **Admin Dashboard**
- Manage courses (add, edit, modules)
- Event management
- User management
- Application reviews (accepted/pending)
- Team management (BDA, Operations, Marketing)
- Revenue tracking
- Alumni data management
- Master class management
- Referral program monitoring

### 3. **BDA (Business Development Associate) Team**
- Personal dashboard
- Booked leads management
- Full paid leads
- Default leads
- Revenue sheet
- Team members management
- Target assignment
- Company leads tracking
- Performance reports

### 4. **Operations Team**
- Payment tracking (Booked, Full, Default)
- Revenue sheets
- Transaction management
- Performance analytics

### 5. **Marketing Team**
- Campaign management
- Team coordination
- Lead management

---

## 🔐 AUTHENTICATION & MIDDLEWARE

### Authentication Flow
1. **User Login**: Email + OTP verification
2. **JWT Tokens**: Used for session management
3. **Admin Authentication**: Cookie-based verification
4. **Role-based Access**: Different dashboards for different roles

### Middleware Used
- `UserAuth.js` - Verifies JWT tokens
- `verifyAdminCookie.js` - Checks admin credentials
- `cloudinary.js` - Handles file uploads to Cloudinary
- CORS middleware for cross-origin requests
- Body parser for JSON parsing

---

## 📡 API STRUCTURE

### Key API Routes

#### User Routes (`/api/user`)
- POST `/signup` - User registration
- POST `/login` - User login with OTP
- GET `/profile` - Get user profile
- PUT `/profile` - Update profile

#### Course Routes (`/api/course`)
- GET `/courses` - List all courses
- POST `/create-course` - Create new course
- PUT `/update-course/:id` - Update course
- GET `/course/:id` - Get course details

#### Job Routes (`/api/jobs`)
- GET `/jobs` - List jobs
- POST `/create-job` - Create job
- POST `/apply-job` - Apply for job
- GET `/applications` - Get applications

#### Admin Routes (`/api/admin`)
- POST `/login` - Admin login
- GET `/dashboard` - Dashboard data
- GET `/team-details` - Team information

#### BDA Routes
- GET `/bda/dashboard` - BDA metrics
- GET `/bda/leads` - Lead management
- PUT `/bda/target` - Assign targets

#### Event Routes
- POST `/events/create` - Create events
- POST `/events/register` - Register for event
- GET `/events` - List events

#### Other Key Routes
- Mentorship management
- Certificate generation & distribution
- Master class management
- Mock interview scheduling
- Exercise/Practice problems
- Referral & earn program
- Resume ATS system

---

## 📊 DATABASE MODELS (MongoDB Collections)

| Model | Purpose |
|-------|---------|
| `User` | Student/User profiles |
| `CreateCourse` | Course information |
| `CreateJob` | Job postings |
| `JobApplication` | Job applications |
| `Mentorship` | Mentorship program details |
| `Advance` | Advanced feature settings |
| `Certificate` | User certificates |
| `EventApplication` | Event registrations |
| `EventRegistration` | Event attendee data |
| `AddEvent` | Event details |
| `MasterClass` | Master class content |
| `Alumni` | Alumni directory |
| `CreateBDA` | BDA team members |
| `CreateOperation` | Operations team |
| `CreateMarketing` | Marketing team |
| `TeamName` | Team naming/grouping |
| `MarketingTeamName` | Marketing team organization |
| `NewStudentEnroll` | Student enrollment tracking |
| `ReferAndEarn` | Referral rewards |
| `AddTransactionId` | Payment transactions |
| `AdminMail` | Admin email settings |
| `PlacementCoordinator` | Placement coordination |
| `result` | Test/exam results |

---

## 🎨 FRONTEND ARCHITECTURE

### Page Structure
- **Landing Page** - Homepage with course showcases
- **Course Pages** - Individual course details (Data Science, MERN, Digital Marketing, etc.)
- **Authentication** - Login with OTP, Registration
- **User Dashboard** - Personal profile and enrollments
- **Admin Dashboard** - Complete management interface
- **BDA Dashboard** - Sales and lead management
- **Operation Dashboard** - Revenue and payment tracking
- **Career Page** - Job listings and applications
- **Events Page** - Event management and registration
- **Alumni Page** - Alumni directory

### Key Components
- **Header/Navigation** - Dynamic based on user role
- **Sidebar** - Dashboard navigation
- **Forms** - Data collection (courses, users, events)
- **Tables** - Data display (leads, payments, applications)
- **Charts** - Revenue and performance analytics
- **Modal Dialogs** - Quick actions and confirmations
- **Cards** - Course and event display

---

## 🚀 DEPLOYMENT

### Backend
- Deployed on **Vercel** (serverless)
- Configuration in `vercel.json`
- Environment variables managed via `.env`

### Frontend
- Built with Vite
- Deployed on **Vercel**
- Production build: `npm run build`

---

## 🔄 WORKFLOW EXAMPLES

### Student Enrollment Flow
1. User lands on homepage
2. Browse courses → Click "Enroll"
3. Login/Register with OTP
4. Complete enrollment & payment
5. Access course materials in dashboard
6. Get certificate upon completion

### BDA Sales Flow
1. BDA logs in to personal dashboard
2. View assigned leads/targets
3. Manage booked, paid, and default leads
4. Track revenue performance
5. Team collaboration and reporting

### Admin Management Flow
1. Admin logs in to main dashboard
2. Create/manage courses, events, jobs
3. Review pending applications
4. Manage team members (BDA, Operations, Marketing)
5. Generate revenue reports
6. Monitor platform metrics

---

## 📝 ENVIRONMENT VARIABLES (.env)

```
DB_NAME=<MongoDB connection string>
FRONTEND_URL=<Frontend base URL>
PORT=5000
JWT_SECRET=<JWT secret key>
CLOUDINARY_NAME=<Cloudinary account>
CLOUDINARY_API_KEY=<Cloudinary API key>
CLOUDINARY_API_SECRET=<Cloudinary secret>
EMAIL_USER=<Sender email>
EMAIL_PASS=<Email password/app token>
VITE_API_URL=<Backend API URL>
```

---

## 🔄 DATA FLOW

```
User Client (React)
    ↓
Axios API Calls
    ↓
Express Server (Node.js)
    ↓
Middleware (Auth, Upload)
    ↓
Route Handlers
    ↓
Controllers (Business Logic)
    ↓
MongoDB Models
    ↓
Database Operations
```

---

## 📌 IMPORTANT FILES TO UNDERSTAND

1. **[BACKEND/server.js](BACKEND/server.js)** - Server setup, route registration
2. **[BACKEND/models/User.js](BACKEND/models/User.js)** - User schema
3. **[BACKEND/routes/User.js](BACKEND/routes/User.js)** - User endpoints
4. **[FRONTEND/src/App.jsx](FRONTEND/src/App.jsx)** - Main routing
5. **[FRONTEND/src/API.jsx](FRONTEND/src/API.jsx)** - API configuration
6. **[FRONTEND/package.json](FRONTEND/package.json)** - Frontend dependencies

---

## 🎯 KEY FEATURES

✅ Multi-role authentication (Student, Admin, BDA, Operations, Marketing)  
✅ Course management with modules and materials  
✅ Job posting and application system  
✅ Mentorship program  
✅ Master classes  
✅ Event management and registration  
✅ Certificate generation  
✅ Referral and earning rewards  
✅ Resume ATS (Applicant Tracking System)  
✅ Revenue tracking and reporting  
✅ Team management  
✅ Payment gateway integration  
✅ File uploads to Cloudinary  
✅ Email notifications (Nodemailer)  
✅ OTP-based login  
✅ Real-time notifications  
✅ Responsive design (Tailwind CSS)  

---

## 📞 NEXT STEPS

1. **Setup Environment**: Configure `.env` with MongoDB URI and API credentials
2. **Backend Start**: `npm start` (port 5000)
3. **Frontend Start**: `npm run dev` (port 5173)
4. **Explore Routes**: Check specific route files for API documentation
5. **Understand Models**: Review MongoDB schemas in `/models`
6. **Admin Access**: Create admin accounts and test dashboard features

---

*This codebase is a comprehensive educational platform with enterprise-grade features for course management, sales tracking, and team collaboration.*
