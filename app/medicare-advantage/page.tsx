"use client"

import { useState } from 'react';
import { Activity, Download, ChevronLeft, ChevronRight } from 'lucide-react';

import Footer from '../components/footer';
import QuoteForm from '../components/QuoteForm';

const product = {
  name: 'MEDICARE ADVANTAGE',
  icon: <Activity size={48} className="text-blue-600" />,
  description: 'All-in-one alternative to Original Medicare that often includes prescription drug coverage, dental, vision, and wellness programs.',
  flyers: [
    { title: 'Medicare Advantage Basics', description: 'Understanding Part C Medicare plans' },
    { title: 'Plan Comparison Guide', description: 'Comparing different Medicare Advantage options' },
    { title: 'Network Providers', description: 'Finding doctors and hospitals in your plan' },
    { title: 'Prescription Coverage', description: 'Drug coverage included in most plans' },
    { title: 'Extra Benefits', description: 'Dental, vision, hearing, and wellness benefits' },
    { title: 'Cost Structure', description: 'Understanding premiums, deductibles, and copays' },
    { title: 'Enrollment Periods', description: 'When you can enroll or change plans' },
    { title: 'Special Needs Plans', description: 'Plans for chronic conditions and dual-eligible' },
    { title: 'Star Ratings', description: 'How Medicare rates plan quality and performance' },
    { title: 'Prior Authorization', description: 'When you need approval for services' },
    { title: 'Appeals Process', description: 'How to appeal coverage decisions' },
    { title: 'Travel Coverage', description: 'Coverage when traveling outside your area' },
    { title: 'Emergency Care', description: 'Emergency and urgent care coverage' },
    { title: 'Preventive Services', description: 'Free preventive care and screenings' },
    { title: 'Specialist Referrals', description: 'When you need referrals to see specialists' },
    { title: 'Pharmacy Networks', description: 'Understanding preferred pharmacy networks' },
    { title: 'Transportation Benefits', description: 'Rides to medical appointments' },
    { title: 'Fitness Programs', description: 'Gym memberships and wellness programs' },
    { title: 'Telehealth Services', description: 'Virtual doctor visits and remote care' },
    { title: 'Chronic Care Management', description: 'Special programs for ongoing conditions' },
    { title: 'Mental Health Coverage', description: 'Behavioral health and counseling services' },
    { title: 'Home Health Services', description: 'In-home care and medical equipment' },
    { title: 'Skilled Nursing', description: 'Coverage for nursing facility care' },
    { title: 'Rehabilitation Services', description: 'Physical, occupational, and speech therapy' },
    { title: 'Durable Medical Equipment', description: 'Coverage for medical devices and supplies' },
    { title: 'Plan Changes', description: 'How to switch Medicare Advantage plans' },
    { title: 'Dual Eligibility', description: 'Coordinating with Medicaid benefits' },
    { title: 'Income-Based Assistance', description: 'Extra help for low-income beneficiaries' },
    { title: 'Plan Termination', description: 'What happens if your plan is discontinued' },
    { title: 'Customer Service', description: 'Getting help with your Medicare Advantage plan' }
  ]
};

function FlyersSection({ flyers }: { flyers: { title: string, description: string }[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const flyersPerPage = 6;
  
  // Calculate total pages
  const totalPages = Math.ceil(flyers.length / flyersPerPage);
  
  // Get current flyers
  const indexOfLastFlyer = currentPage * flyersPerPage;
  const indexOfFirstFlyer = indexOfLastFlyer - flyersPerPage;
  const currentFlyers = flyers.slice(indexOfFirstFlyer, indexOfLastFlyer);
  
  // Page navigation
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Product Flyers & Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentFlyers.map((flyer: { title: string, description: string }, index: number) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* Plain colored background */}
              <div 
                className="w-full h-48 mb-4 rounded flex items-center justify-center"
                style={{ backgroundColor: `hsl(${index * 30}, 50%, 80%)` }} // Generates different colors
              >
                
              </div>
              
              <h3 className="text-lg font-semibold text-blue-800 mb-2">{flyer.title}</h3>
              <p className="text-gray-600 mb-4">{flyer.description}</p>
              
              <div className="flex justify-between items-center">
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  View Details
                </a>
                <button 
                  className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  <Download size={16} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-2 rounded ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              <ChevronLeft size={18} /> Previous
            </button>
            
            <div className="text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-2 rounded ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProductDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            {product.icon}
            <h1 className="text-4xl font-bold">{product.name}</h1>
          </div>
          <p className="text-xl max-w-3xl">{product.description}</p>
        </div>
      </section>

      {/* Flyers Section */}
      <FlyersSection flyers={product.flyers} />

      {/* Quote Form */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
              Get a Quote 
            </h2>
            <QuoteForm insuranceType={product.name} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 