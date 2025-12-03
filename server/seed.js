const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');

dotenv.config();

// Copied mock data from constants.ts to avoid TS import issues in simple Node script
const MOCK_COURSES = [
  {
    id: 'c1',
    title: 'Full Stack Web Development with React & Node.js',
    shortDescription: 'Master the MERN stack and build production-ready applications with internship support.',
    longDescription: 'This comprehensive bootcamp takes you from zero to hero in full-stack web development. You will learn modern JavaScript, React 18, Node.js, Express, and MongoDB. The course includes real-world projects, resume building, and guaranteed internship opportunities upon completion.',
    category: 'Development',
    price: 4999,
    originalPrice: 12999,
    thumbnail: 'https://picsum.photos/800/450?random=1',
    rating: 4.8,
    reviewsCount: 1240,
    level: 'Intermediate',
    duration: '12 Weeks',
    lastUpdated: 'September 2024',
    instructor: {
      id: 'i1',
      name: 'Sarah Jenkins',
      bio: 'Senior Software Engineer at TechCorp with 10+ years of experience.',
      avatarUrl: 'https://picsum.photos/100/100?random=10',
      rating: 4.9
    },
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
    features: ['Internship Included', 'Placement Assistance', 'Live Projects'],
    syllabus: [
      { title: 'Frontend Foundations', duration: '2 Weeks', lessons: [{ title: 'HTML5 & CSS3 Mastery', type: 'video'}, { title: 'JS ES6+ Deep Dive', type: 'video'}] },
      { title: 'React Ecosystem', duration: '4 Weeks', lessons: [{ title: 'Hooks & Context API', type: 'video'}, { title: 'Redux Toolkit', type: 'assignment'}] },
      { title: 'Backend Engineering', duration: '4 Weeks', lessons: [{ title: 'RESTful APIs with Express', type: 'video'}, { title: 'Database Design', type: 'quiz'}] }
    ],
    bestseller: true
  },
  {
    id: 'c2',
    title: 'Data Science & Machine Learning Bootcamp',
    shortDescription: 'Learn Python, SQL, and ML algorithms. Includes capstone project and job assistance.',
    longDescription: 'Dive into the world of data. This course covers everything from Python basics to advanced Deep Learning using TensorFlow. You will work on real datasets provided by our industry partners.',
    category: 'Data Science',
    price: 5999,
    originalPrice: 14999,
    thumbnail: 'https://picsum.photos/800/450?random=2',
    rating: 4.7,
    reviewsCount: 850,
    level: 'Beginner',
    duration: '16 Weeks',
    lastUpdated: 'August 2024',
    instructor: {
      id: 'i2',
      name: 'Dr. Alan Grant',
      bio: 'PhD in Computer Science, ex-Google Data Scientist.',
      avatarUrl: 'https://picsum.photos/100/100?random=11',
      rating: 4.8
    },
    skills: ['Python', 'Pandas', 'Scikit-Learn', 'SQL', 'TensorFlow'],
    features: ['Job Guarantee Program', '1-on-1 Mentorship', 'Portfolio Building'],
    syllabus: [
        { title: 'Python for Data Analysis', duration: '3 Weeks', lessons: [{ title: 'NumPy & Pandas', type: 'video'}] },
        { title: 'Machine Learning Basics', duration: '4 Weeks', lessons: [{ title: 'Regression & Classification', type: 'video'}] }
    ]
  },
  {
    id: 'c3',
    title: 'UI/UX Design Masterclass',
    shortDescription: 'Design beautiful interfaces and user experiences using Figma and Adobe XD.',
    longDescription: 'Understanding the user is key to great products. Learn research methods, wireframing, prototyping, and high-fidelity design.',
    category: 'Design',
    price: 2999,
    originalPrice: 6999,
    thumbnail: 'https://picsum.photos/800/450?random=3',
    rating: 4.9,
    reviewsCount: 500,
    level: 'Beginner',
    duration: '8 Weeks',
    lastUpdated: 'October 2024',
    instructor: {
      id: 'i3',
      name: 'Emily Chen',
      bio: 'Product Designer at Airbnb.',
      avatarUrl: 'https://picsum.photos/100/100?random=12',
      rating: 4.9
    },
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    features: ['Portfolio Review', 'Freelancing Guide'],
    syllabus: [
        { title: 'Design Thinking', duration: '2 Weeks', lessons: [{ title: 'Empathize & Define', type: 'video'}] },
        { title: 'Figma Mastery', duration: '4 Weeks', lessons: [{ title: 'Auto-layout & Components', type: 'video'}] }
    ]
  },
  {
    id: 'c4',
    title: 'Cloud Computing with AWS',
    shortDescription: 'Prepare for the AWS Solutions Architect Associate exam with hands-on labs.',
    longDescription: 'Cloud is the future. Master EC2, S3, RDS, Lambda, and more. This course is designed to get you certified and job-ready.',
    category: 'Cloud Computing',
    price: 4499,
    originalPrice: 8999,
    thumbnail: 'https://picsum.photos/800/450?random=4',
    rating: 4.6,
    reviewsCount: 320,
    level: 'Advanced',
    duration: '10 Weeks',
    lastUpdated: 'July 2024',
    instructor: {
      id: 'i4',
      name: 'David Kim',
      bio: 'AWS Community Hero and Cloud Architect.',
      avatarUrl: 'https://picsum.photos/100/100?random=13',
      rating: 4.7
    },
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    features: ['Exam Vouchers', 'Cloud Labs'],
    syllabus: [
        { title: 'AWS Core Services', duration: '4 Weeks', lessons: [{ title: 'EC2 & VPC', type: 'video'}] },
        { title: 'Serverless', duration: '2 Weeks', lessons: [{ title: 'Lambda & API Gateway', type: 'video'}] }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/krutanic', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    await Course.deleteMany({});
    console.log('Courses cleared');

    await Course.insertMany(MOCK_COURSES);
    console.log('Courses seeded');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();