import React, { useState } from 'react';
import { PLACEMENT_DATA } from '../data/placements';
import { SectionHeader } from '../components/UI';
import { MapPin, Building2, Star, TrendingUp, Users, Award, Briefcase, Search } from 'lucide-react';

export const PlacementPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = PLACEMENT_DATA.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Statistics
    const totalAlumni = PLACEMENT_DATA.length;
    const averagePackage = "9.1 LPA";
    const highestPackage = "12 LPA";
    const hiringPartners = ["TCS", "ValTech", "Accenture", "Capgemini", "Cognizant"];

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                        Our <span className="text-blue-600">Success Stories</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                        Join thousands of graduates who have transformed their careers with Krutanic.
                        From top MNCs to exciting startups, our alumni are making their mark globally.
                    </p>

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <Users className="mx-auto text-blue-600 mb-3" size={32} />
                            <div className="text-3xl font-bold text-gray-900">{totalAlumni}+</div>
                            <div className="text-sm text-gray-600 font-medium">Alumni Placed</div>
                        </div>
                        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                            <TrendingUp className="mx-auto text-green-600 mb-3" size={32} />
                            <div className="text-3xl font-bold text-gray-900">{averagePackage}</div>
                            <div className="text-sm text-gray-600 font-medium">Average Package</div>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                            <Award className="mx-auto text-purple-600 mb-3" size={32} />
                            <div className="text-3xl font-bold text-gray-900">{highestPackage}</div>
                            <div className="text-sm text-gray-600 font-medium">Highest Package</div>
                        </div>
                        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                            <Building2 className="mx-auto text-orange-600 mb-3" size={32} />
                            <div className="text-3xl font-bold text-gray-900">500+</div>
                            <div className="text-sm text-gray-600 font-medium">Hiring Partners</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-12 relative">
                    <input
                        type="text"
                        placeholder="Search by name, company, or city..."
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredData.map((student) => (
                        <div
                            key={student.id}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
                        >
                            {/* Card Header with Soft Gradient */}
                            <div className={`h-24 bg-gradient-to-r ${getGradient(student.id)} p-4 flex items-start justify-between`}>
                                <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                                    <Building2 size={20} className="text-gray-700" />
                                </div>
                                <div className="flex items-center bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                                    <Star size={14} className="text-yellow-500 fill-current mr-1" />
                                    <span className="text-xs font-bold text-gray-800">{student.rating}</span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 relative">
                                {/* Avatar Placeholder */}
                                <div className="absolute -top-10 left-5">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=fff&color=333&size=128`}
                                        alt={student.name}
                                        className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                                    />
                                </div>

                                <div className="mt-10">
                                    <h3 className="font-bold text-lg text-gray-900 mb-1">{student.name}</h3>
                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <MapPin size={14} className="mr-1" />
                                        {student.location}
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <Briefcase size={16} className="mr-2 text-blue-500" />
                                                Company
                                            </div>
                                            <span className="font-semibold text-gray-900 text-sm">{student.company}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <Award size={16} className="mr-2 text-green-600" />
                                                Package
                                            </div>
                                            <span className="font-bold text-green-700">{student.package}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredData.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No results found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper to generate soft gradients based on ID
function getGradient(id: number): string {
    const gradients = [
        'from-blue-100 to-cyan-100',
        'from-purple-100 to-pink-100',
        'from-green-100 to-emerald-100',
        'from-orange-100 to-amber-100',
        'from-indigo-100 to-violet-100',
        'from-rose-100 to-red-100',
    ];
    return gradients[id % gradients.length];
}
