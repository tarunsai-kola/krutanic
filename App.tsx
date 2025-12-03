import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider, CartProvider } from './context';
import { Navbar, Footer, DashboardLayout } from './components/Layout';
import { Home, AllCourses, CourseDetail } from './pages/PublicPages';
import { Login, Cart, Checkout, StudentDashboard } from './pages/UserPages';
import { AdminDashboard } from './pages/AdminPages';

// Layout for public pages (Navbar + Content + Footer)
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<AllCourses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Login />} /> {/* Using Login for demo */}
              <Route path="/checkout" element={<Checkout />} />
              {/* Placeholders for other required pages */}
              <Route path="/placements" element={<div className="p-20 text-center text-2xl">Placement & Internship Report Page</div>} />
              <Route path="/about" element={<div className="p-20 text-center text-2xl">About Krutanic</div>} />
            </Route>

            {/* Dashboard Routes (User) */}
            <Route path="/dashboard" element={<DashboardLayout><Outlet /></DashboardLayout>}>
              <Route index element={<StudentDashboard />} />
              <Route path="certificates" element={<div className="p-10">Certificates Section</div>} />
              <Route path="settings" element={<div className="p-10">Settings Section</div>} />
            </Route>

             {/* Admin Routes */}
             <Route path="/admin" element={<div className="flex min-h-screen bg-gray-100"><div className="w-64 bg-gray-900 text-white p-6">Admin Sidebar</div><div className="flex-1 overflow-y-auto"><AdminDashboard /></div></div>} />

          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;