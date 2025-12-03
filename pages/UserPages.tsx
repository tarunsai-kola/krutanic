import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, useCart } from '../context';
import { Button } from '../components/UI';
import { Trash2, CreditCard, Lock, CheckCircle, GraduationCap } from 'lucide-react';
import { orderAPI } from '../services/api';
import { MOCK_COURSES } from '../constants'; // Fallback for enrolled visualization

// --- Auth Pages ---
export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        // Assume register functionality is available in context or just use login for demo
        // For this specific file I need to import register from context but it was missing in previous interface
        // I will just use login for both or update context to support register (Done in context.tsx)
        const { register } = useAuth(); 
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate(-1);
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">{isRegister ? 'Sign Up' : 'Log In'}</Button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          {isRegister ? 'Already have an account?' : "Don't have an account?"} 
          <button onClick={() => setIsRegister(!isRegister)} className="text-blue-600 font-medium ml-1 hover:underline">
            {isRegister ? 'Log in' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Cart Page ---
export const Cart: React.FC = () => {
  const { items, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <Trash2 size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added any courses yet.</p>
        <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.course.id} className="p-6 flex flex-col sm:flex-row gap-4">
                <img src={item.course.thumbnail} alt={item.course.title} className="w-full sm:w-32 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{item.course.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">By {item.course.instructor.name}</p>
                  <div className="flex items-center text-sm text-blue-600 font-medium">
                    {item.course.features.includes('Internship Included') && <span>• Internship Support Included</span>}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="font-bold text-lg">₹{item.course.price.toLocaleString()}</span>
                  <button onClick={() => removeFromCart(item.course.id)} className="text-red-500 text-sm hover:underline flex items-center">
                    <Trash2 size={14} className="mr-1" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:w-1/3">
           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
             <h3 className="text-lg font-bold text-gray-500 mb-2">Total:</h3>
             <div className="text-4xl font-bold text-gray-900 mb-6">₹{total.toLocaleString()}</div>
             <Button size="lg" className="w-full mb-4" onClick={() => navigate('/checkout')}>Checkout Now</Button>
             <p className="text-xs text-gray-500 text-center">30-Day Money-Back Guarantee</p>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Checkout Page ---
export const Checkout: React.FC = () => {
  const { total, items, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if(!user) {
    navigate('/login');
    return null;
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      if (token) {
        await orderAPI.createOrder(token, items, total);
      }
      setTimeout(() => {
        setStep(2);
        clearCart();
        setIsProcessing(false);
      }, 1500);
    } catch (error) {
      alert("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  if(step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
            <CheckCircle size={64} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">You have been enrolled in your courses.</p>
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Billing Details</h2>
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
               <input type="text" className="w-full border border-gray-300 rounded p-2" defaultValue={user.name} />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
               <input type="email" className="w-full border border-gray-300 rounded p-2" defaultValue={user.email} disabled />
             </div>
          </div>
          
          <h2 className="text-xl font-bold mt-8 mb-4">Payment Method</h2>
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-3">
             <div className="flex items-center p-3 border border-blue-500 bg-blue-50 rounded cursor-pointer">
                <CreditCard className="mr-3 text-blue-600" />
                <span className="font-medium">Credit / Debit Card</span>
             </div>
             <div className="flex items-center p-3 border border-gray-200 rounded cursor-pointer opacity-70">
                <span className="font-medium ml-9">UPI / Net Banking</span>
             </div>
          </div>
        </div>

        <div>
           <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
             <h3 className="font-bold text-lg mb-4">Order Summary</h3>
             <div className="flex justify-between mb-2">
               <span>Original Price</span>
               <span className="line-through text-gray-500">₹{(total * 1.5).toLocaleString()}</span>
             </div>
             <div className="flex justify-between mb-4 pb-4 border-b border-gray-200">
               <span>Discounts</span>
               <span className="text-green-600">-₹{(total * 0.5).toLocaleString()}</span>
             </div>
             <div className="flex justify-between text-xl font-bold mb-6">
               <span>Total</span>
               <span>₹{total.toLocaleString()}</span>
             </div>
             
             <Button size="lg" className="w-full flex items-center justify-center" onClick={handlePayment} disabled={isProcessing}>
               {isProcessing ? 'Processing...' : (
                 <>
                   <Lock size={16} className="mr-2" /> Pay Securely
                 </>
               )}
             </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Student Dashboard ---
export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // In a real app, fetch enrolled courses from user.enrolledCourses via API
  // For demo persistence without DB connection in this specific view, we visualize using MOCK
  const enrolledCourses = MOCK_COURSES.slice(0, 2);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}</h1>
      <p className="text-gray-500 mb-8">Let's continue learning.</p>

      {/* Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium uppercase mb-2">Courses in Progress</h3>
          <p className="text-3xl font-bold text-gray-900">2</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium uppercase mb-2">Certificates Earned</h3>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium uppercase mb-2">Internship Status</h3>
          <p className="text-lg font-bold text-green-600">Eligible</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">My Courses</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {enrolledCourses.map(course => (
          <div key={course.id} className="bg-white border border-gray-200 rounded-lg flex overflow-hidden">
            <img src={course.thumbnail} alt={course.title} className="w-32 object-cover" />
            <div className="p-4 flex-1">
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{course.title}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mb-3">35% Complete</p>
              <Button size="sm">Continue Learning</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start space-x-4">
         <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <GraduationCap size={24} />
         </div>
         <div>
           <h3 className="font-bold text-lg text-blue-900 mb-1">Ready for your Internship?</h3>
           <p className="text-blue-700 text-sm mb-4">Complete 80% of your Web Development course to unlock the internship portal.</p>
           <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">View Requirements</Button>
         </div>
      </div>
    </div>
  );
};