"use client"

import { useState } from 'react';
import { Heart, Download, ChevronLeft, ChevronRight } from 'lucide-react';

import Footer from '../components/footer';
import QuoteForm from '../components/QuoteForm';

const product = {
  name: 'ACA MARKETPLACE PLANS',
  icon: <Heart size={48} className="text-blue-600" />,
  description: 'Comprehensive health coverage through the Affordable Care Act marketplace.',
  flyers: [
    { title: 'ACA Enrollment Guide', description: 'Step-by-step instructions for marketplace enrollment' },
    { title: 'Subsidy Qualification', description: 'Find out if you qualify for financial assistance' },
    { title: 'Plan Comparison Chart', description: 'Compare different ACA plan tiers' },
    { title: 'Essential Health Benefits', description: 'What all marketplace plans must cover' },
    { title: 'Special Enrollment Periods', description: 'How to enroll outside open enrollment' },
    { title: 'Premium Tax Credits', description: 'Understanding how tax credits reduce your premiums' },
    { title: 'Cost-Sharing Reductions', description: 'How to lower your out-of-pocket costs' },
    { title: 'Metal Tier Explanations', description: 'Understanding Bronze, Silver, Gold, and Platinum plans' },
    { title: 'Network Provider Directory', description: 'Finding in-network doctors and facilities' },
    { title: 'Preventive Services List', description: 'Services covered at no cost to you' },
    { title: 'Prescription Formulary', description: 'Covered medications and pricing tiers' },
    { title: 'Family Coverage Options', description: 'Plans that work for your entire family' },
    { title: 'Young Adult Coverage', description: 'Options for those under 30' },
    { title: 'Catastrophic Plan Details', description: 'High-deductible, low-premium options' },
    { title: 'Income Verification Guide', description: 'Documents needed to verify your income' },
    { title: 'Plan Renewal Information', description: 'What happens when your plan year ends' },
    { title: 'Coverage Appeals Process', description: 'What to do if coverage is denied' },
    { title: 'Healthcare Rights', description: 'Your protections under the ACA' },
    { title: 'Marketplace vs. Employer Coverage', description: 'Comparing your options' },
    { title: 'Changing Plans Mid-Year', description: 'When and how you can switch plans' },
    { title: 'COBRA vs. Marketplace', description: 'Options after losing employer coverage' },
    { title: 'Self-Employed Coverage Guide', description: 'Options for freelancers and business owners' },
    { title: 'Immigration Status and Eligibility', description: 'Who qualifies for marketplace coverage' },
    { title: 'Tax Penalty Information', description: 'Understanding tax implications' },
    { title: 'Out-of-Pocket Maximum Guide', description: 'The most youll pay in a plan year' },
    { title: 'Wellness Program Benefits', description: 'Extra perks included with your plan' },
    { title: 'Telehealth Services', description: 'Virtual care options with your coverage' },
    { title: 'State-Specific Programs', description: 'Additional options in your state' },
    { title: 'Family Glitch Fix', description: 'New rules for family eligibility' },
    { title: 'Marketplace Mobile App Guide', description: 'Managing your coverage on your phone' }
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