export enum CourseLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  rating: number;
}

export interface Module {
  title: string;
  duration: string;
  lessons: { title: string; type: 'video' | 'quiz' | 'assignment' }[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  price: number;
  originalPrice: number;
  thumbnail: string;
  rating: number;
  reviewsCount: number;
  level: CourseLevel;
  duration: string;
  lastUpdated: string;
  instructor: Instructor;
  syllabus: Module[];
  skills: string[];
  features: string[]; // e.g. "Internship Included", "Certificate"
  reviews: Review[];
  bestseller?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  enrolledCourses: string[]; // Course IDs
  avatar?: string;
}

export interface CartItem {
  course: Course;
}
