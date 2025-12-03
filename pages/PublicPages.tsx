import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { CourseCard, SectionHeader, Button } from '../components/UI';
import { CheckCircle, Award, Clock, Users, Sparkles, Star, FileText } from 'lucide-react';
import { useCart } from '../context';
import { generateCourseInsights } from '../services/geminiService';
import { courseAPI } from '../services/api';
import { Course } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);

  useEffect(() => {
    const loadCourses = async () => {
      const data = await courseAPI.getAll();
      setFeaturedCourses(data.slice(0, 4));
    };
    loadCourses();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50 -skew-y-3 origin-top-left transform translate-y-20 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="flex-1 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Empowering your career with <span className="text-blue-600">Real-World Skills</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0">
              Join Krutanic today. Industry-level training, practical projects, and guaranteed placement support to get you hired.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Button size="lg" onClick={() => navigate('/courses')}>Browse All Courses</Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/placements')}>View Placement Report</Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center relative">
             <div className="relative w-full max-w-md">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Students learning" className="rounded-2xl shadow-2xl z-10 relative" />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg flex items-center space-x-3 z-20">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">5,000+ Hired</p>
                    <p className="text-xs text-gray-500">In top tech companies</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Top Categories" subtitle="Explore diverse topics tailored for your career growth" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {CATEGORIES.slice(0, 6).map((cat, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-xl text-center hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer border border-transparent hover:border-blue-100" onClick={() => navigate(`/courses?category=${cat}`)}>
                <h3 className="font-medium">{cat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <SectionHeader title="Featured Courses" subtitle="Hand-picked courses with internship support" />
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {featuredCourses.length > 0 ? (
               featuredCourses.map(course => (
                 <CourseCard key={course.id} course={course} onClick={() => navigate(`/courses/${course.id}`)} />
               ))
             ) : (
                <div className="col-span-4 text-center text-gray-500">Loading courses...</div>
             )}
           </div>
           <div className="mt-12 text-center">
             <Button variant="outline" size="lg" onClick={() => navigate('/courses')}>View All Courses</Button>
           </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
           <div className="p-4">
              <Award className="mx-auto mb-4 text-blue-400" size={40} />
              <h3 className="text-xl font-bold mb-2">Recognized Certificates</h3>
              <p className="text-gray-400">Valued by top employers worldwide.</p>
           </div>
           <div className="p-4">
              <Users className="mx-auto mb-4 text-blue-400" size={40} />
              <h3 className="text-xl font-bold mb-2">Internship Support</h3>
              <p className="text-gray-400">Real-world experience guaranteed.</p>
           </div>
           <div className="p-4">
              <Clock className="mx-auto mb-4 text-blue-400" size={40} />
              <h3 className="text-xl font-bold mb-2">Lifetime Access</h3>
              <p className="text-gray-400">Learn at your own pace, forever.</p>
           </div>
        </div>
      </section>
    </div>
  );
};

export const AllCourses: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      const data = await courseAPI.getAll();
      setCourses(data);
      setIsLoading(false);
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">All Courses</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
           {/* Sidebar Filters */}
           <div className="w-full lg:w-64 flex-shrink-0">
             <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
               <h3 className="font-bold mb-4">Filters</h3>
               
               <div className="mb-6">
                 <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                 <input 
                    type="text" 
                    placeholder="Python, React..." 
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>

               <div>
                 <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                 <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
                   <label className="flex items-center">
                     <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === 'All'}
                        onChange={() => setSelectedCategory('All')}
                        className="text-blue-600 focus:ring-blue-500"
                     />
                     <span className="ml-2 text-sm text-gray-600">All Categories</span>
                   </label>
                   {CATEGORIES.map(cat => (
                     <label key={cat} className="flex items-center">
                        <input 
                          type="radio" 
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{cat}</span>
                     </label>
                   ))}
                 </div>
               </div>
             </div>
           </div>

           {/* Course Grid */}
           <div className="flex-1">
             {isLoading ? (
               <div className="text-center py-20">Loading courses...</div>
             ) : (
               <>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
                      <CourseCard key={course.id} course={course} onClick={() => navigate(`/courses/${course.id}`)} />
                    ))}
                 </div>
                 {filteredCourses.length === 0 && (
                   <div className="text-center py-20 bg-white rounded-lg">
                     <p className="text-gray-500">No courses found matching your criteria.</p>
                     <Button variant="outline" className="mt-4" onClick={() => {setSearchTerm(''); setSelectedCategory('All')}}>Clear Filters</Button>
                   </div>
                 )}
               </>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // AI Assistant State
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        setIsLoading(true);
        const data = await courseAPI.getById(id);
        if (data) setCourse(data);
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleAskAI = async () => {
    if(!aiQuery.trim() || !course) return;
    setIsAiThinking(true);
    const answer = await generateCourseInsights(course, aiQuery);
    setAiResponse(answer);
    setIsAiThinking(false);
  };

  if (isLoading) return <div className="text-center py-20">Loading course details...</div>;
  if (!course) return <div className="text-center py-20">Course not found</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* Top Banner */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
          <div className="md:w-2/3 pr-8">
            <div className="flex items-center space-x-2 text-blue-400 text-sm font-semibold mb-4 uppercase">
              <span>{course.category}</span>
              <span>•</span>
              <span>{course.level}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-gray-300 mb-6">{course.shortDescription}</p>
            <div className="flex items-center space-x-4 text-sm">
               <div className="flex items-center text-yellow-400">
                 <span className="font-bold mr-1">{course.rating}</span>
                 <div className="flex"><Star size={16} fill="currentColor" /></div>
                 <span className="ml-1 text-gray-400">({course.reviewsCount} reviews)</span>
               </div>
               <div className="flex items-center">
                 <Users size={16} className="mr-1" />
                 <span>1,200 students</span>
               </div>
               <div className="flex items-center">
                 <span className="text-gray-400">Last updated {course.lastUpdated}</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content (Left) */}
          <div className="lg:w-2/3">
             {/* Learning Outcomes */}
             <div className="border border-gray-200 rounded-lg p-6 mb-8">
               <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {course.skills.map((skill, idx) => (
                   <div key={idx} className="flex items-start">
                     <CheckCircle size={20} className="text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                     <span className="text-gray-700">Master {skill} with practical examples</span>
                   </div>
                 ))}
               </div>
             </div>

             {/* Course Content */}
             <div className="mb-8">
               <h2 className="text-2xl font-bold mb-4">Course Content</h2>
               <p className="text-sm text-gray-500 mb-4">{course.syllabus.length} Modules • {course.duration} Total Length</p>
               <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                 {course.syllabus.map((module, idx) => (
                   <div key={idx} className="p-4 hover:bg-gray-50 transition">
                     <div className="flex justify-between items-center cursor-pointer">
                        <div className="flex items-center">
                          <span className="text-gray-400 mr-4">Module {idx + 1}</span>
                          <span className="font-medium text-gray-900">{module.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">{module.duration}</span>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             {/* Instructor */}
             <div className="mb-8">
               <h2 className="text-2xl font-bold mb-4">Instructor</h2>
               <div className="flex items-start">
                 <img src={course.instructor.avatarUrl} alt={course.instructor.name} className="w-16 h-16 rounded-full mr-4" />
                 <div>
                   <h3 className="font-bold text-lg text-blue-600 underline">{course.instructor.name}</h3>
                   <p className="text-gray-500 text-sm mb-2">{course.instructor.bio}</p>
                   <div className="flex items-center text-sm">
                     <Star size={14} className="text-yellow-500 fill-current mr-1" />
                     <span>{course.instructor.rating} Instructor Rating</span>
                   </div>
                 </div>
               </div>
             </div>
          </div>

          {/* Sticky Buy Box (Right) */}
          <div className="lg:w-1/3 relative">
             <div className="sticky top-24">
                <div className="bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden">
                   <img src={course.thumbnail} alt="preview" className="w-full h-48 object-cover" />
                   <div className="p-6">
                      <div className="flex items-end mb-4">
                        <span className="text-3xl font-bold text-gray-900 mr-2">₹{course.price.toLocaleString()}</span>
                        <span className="text-lg text-gray-500 line-through mb-1">₹{course.originalPrice.toLocaleString()}</span>
                        <span className="ml-auto text-green-600 font-bold text-sm">
                          {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                         <Button className="w-full text-lg" size="lg" onClick={() => { addToCart(course); navigate('/cart'); }}>Buy Now</Button>
                         <Button variant="outline" className="w-full" onClick={() => addToCart(course)}>Add to Cart</Button>
                      </div>

                      <div className="mt-6 space-y-3 text-sm text-gray-600">
                        <div className="flex items-center"><FileText size={16} className="mr-2" /> <span>Full lifetime access</span></div>
                        <div className="flex items-center"><Award size={16} className="mr-2" /> <span>Certificate of completion</span></div>
                        <div className="flex items-center"><Users size={16} className="mr-2" /> <span>Internship Support</span></div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-100">
                         <Button variant="secondary" size="sm" className="w-full flex items-center justify-center gap-2 bg-purple-100 text-purple-700 hover:bg-purple-200" onClick={() => setShowAiModal(true)}>
                           <Sparkles size={16} /> Ask AI Assistant
                         </Button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-purple-600 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold flex items-center gap-2"><Sparkles size={18}/> Course AI Assistant</h3>
              <button onClick={() => setShowAiModal(false)}><span className="text-2xl">&times;</span></button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">Ask anything about <strong>{course.title}</strong> to see if it's the right fit for your career.</p>
              
              <div className="h-48 overflow-y-auto bg-gray-50 rounded p-3 mb-4 text-sm border border-gray-100">
                {aiResponse ? (
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
                ) : (
                  <p className="text-gray-400 italic text-center mt-10">AI response will appear here...</p>
                )}
              </div>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="e.g., Does this cover Redux?"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                />
                <Button onClick={handleAskAI} disabled={isAiThinking} className="bg-purple-600 hover:bg-purple-700">
                  {isAiThinking ? 'Thinking...' : 'Ask'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};