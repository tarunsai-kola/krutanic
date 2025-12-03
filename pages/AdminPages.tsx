import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, DollarSign, BookOpen } from 'lucide-react';

const data = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
             <DollarSign className="text-green-500" size={20} />
           </div>
           <p className="text-3xl font-bold text-gray-900">₹12,45,000</p>
           <p className="text-green-500 text-sm mt-2">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-gray-500 text-sm font-medium">Active Students</h3>
             <Users className="text-blue-500" size={20} />
           </div>
           <p className="text-3xl font-bold text-gray-900">1,234</p>
           <p className="text-green-500 text-sm mt-2">+5% new enrollments</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-gray-500 text-sm font-medium">Total Courses</h3>
             <BookOpen className="text-purple-500" size={20} />
           </div>
           <p className="text-3xl font-bold text-gray-900">24</p>
           <p className="text-gray-500 text-sm mt-2">2 pending approval</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold mb-6">Revenue Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold mb-6">Enrollments by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                  { name: 'Dev', val: 65 },
                  { name: 'Design', val: 40 },
                  { name: 'Data', val: 55 },
                  { name: 'Cloud', val: 30 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="val" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Orders Table (Simplified) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
         <div className="p-6 border-b border-gray-200">
           <h3 className="font-bold">Recent Enrollments</h3>
         </div>
         <table className="w-full text-left text-sm">
           <thead className="bg-gray-50 text-gray-500">
             <tr>
               <th className="p-4 font-medium">Student</th>
               <th className="p-4 font-medium">Course</th>
               <th className="p-4 font-medium">Date</th>
               <th className="p-4 font-medium">Amount</th>
               <th className="p-4 font-medium">Status</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
             {[1,2,3].map(i => (
               <tr key={i} className="hover:bg-gray-50">
                 <td className="p-4">John Doe</td>
                 <td className="p-4">Full Stack Development</td>
                 <td className="p-4">Oct 24, 2024</td>
                 <td className="p-4">₹4,999</td>
                 <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Paid</span></td>
               </tr>
             ))}
           </tbody>
         </table>
      </div>
    </div>
  );
};
