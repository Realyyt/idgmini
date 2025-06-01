"use client"

import { useState } from 'react';
import { Heart, Download, ChevronLeft, ChevronRight } from 'lucide-react';

import Footer from '../components/footer';
import QuoteForm from '../components/QuoteForm';

const product = {
  name: 'MEDICARE SUPPLEMENT INSURANCE',
  icon: <Heart size={48} className="text-blue-600" />,
  description: 'Helps cover costs that Original Medicare doesn\'t cover, such as copayments, coinsurance, and deductibles.',
  flyers: [
    { title: 'Medigap Plan Comparison', description: 'Compare different Medicare Supplement plans (A through N)' },
    { title: 'Enrollment Guide', description: 'When and how to enroll in Medicare Supplement insurance' },
    { title: 'Cost Comparison Tool', description: 'Compare premiums and out-of-pocket costs across plans' },
    { title: 'Coverage Details by Plan', description: 'What each Medigap plan covers' },
    { title: 'Guaranteed Issue Rights', description: 'When you can enroll without medical underwriting' },
    { title: 'Open Enrollment Guide', description: 'Your 6-month Medigap open enrollment period' },
    { title: 'Plan F and C Eligibility', description: 'Who can still enroll in these plans' },
    { title: 'High-Deductible Plan F', description: 'Details about this cost-saving option' },
    { title: 'Travel Coverage', description: 'How Medigap covers you while traveling' },
    { title: 'Prescription Drug Coverage', description: 'Understanding Part D with Medigap' },
    { title: 'Switching Plans Guide', description: 'How to change your Medigap plan' },
    { title: 'State-Specific Rules', description: 'Special rules in your state' },
    { title: 'Cost-Saving Tips', description: 'Ways to reduce your Medigap premiums' },
    { title: 'Preventive Care Coverage', description: 'What preventive services are covered' },
    { title: 'Foreign Travel Emergency', description: 'Coverage while traveling abroad' },
    { title: 'Plan Selection Guide', description: 'How to choose the right plan for you' },
    { title: 'Premium Payment Options', description: 'Different ways to pay your premiums' },
    { title: 'Claims Process', description: 'How to file and track claims' },
    { title: 'Provider Network Guide', description: 'Using any doctor who accepts Medicare' },
    { title: 'Renewal Information', description: 'What to expect when renewing your policy' },
    { title: 'Disability Coverage', description: 'Options for those under 65' },
    { title: 'Family Coverage Options', description: 'Coverage for spouses and dependents' },
    { title: 'Medicare Advantage vs. Medigap', description: 'Comparing your coverage options' },
    { title: 'Long-Term Care Options', description: 'Additional coverage for long-term care' },
    { title: 'Dental and Vision Coverage', description: 'Supplemental coverage options' },
    { title: 'Hearing Aid Coverage', description: 'Options for hearing aid benefits' },
    { title: 'Wellness Benefits', description: 'Additional health and wellness programs' },
    { title: 'Telehealth Services', description: 'Virtual care coverage details' },
    { title: 'Emergency Coverage', description: 'What\'s covered in emergencies' },
    { title: 'Customer Service Guide', description: 'How to get help with your coverage' }
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