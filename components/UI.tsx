import React from 'react';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { Course } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export const CourseCard: React.FC<{ course: Course; onClick: () => void }> = ({ course, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col h-full"
    >
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {course.bestseller && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
            Bestseller
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wider">
          {course.category}
        </div>
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {course.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {course.shortDescription}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center mb-3">
            <span className="font-bold text-amber-500 mr-1">{course.rating}</span>
            <div className="flex text-amber-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(course.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-gray-400 text-xs ml-2">({course.reviewsCount})</span>
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex flex-col">
               <span className="text-lg font-bold text-gray-900">₹{course.price.toLocaleString()}</span>
               <span className="text-xs text-gray-500 line-through">₹{course.originalPrice.toLocaleString()}</span>
            </div>
            <Button size="sm" variant="outline" className="group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-8 text-center">
    <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
    {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);
