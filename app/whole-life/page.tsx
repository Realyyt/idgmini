"use client"

import { useState } from 'react';
import { Heart, Download, ChevronLeft, ChevronRight } from 'lucide-react';

import Footer from '../components/footer';
import QuoteForm from '../components/QuoteForm';

const product = {
  name: 'WHOLE LIFE INSURANCE',
  icon: <Heart size={48} className="text-blue-600" />,
  description: 'Permanent life insurance with guaranteed coverage, level premiums, and cash value accumulation.',
  flyers: [
    { title: 'Whole Life Basics', description: 'Understanding permanent life insurance fundamentals' },
    { title: 'Cash Value Growth', description: 'How your policy builds cash value over time' },
    { title: 'Premium Structure', description: 'Level premiums that never increase' },
    { title: 'Dividends Explained', description: 'Participating vs non-participating policies' },
    { title: 'Policy Loans', description: 'Borrowing against your cash value' },
    { title: 'Guaranteed Benefits', description: 'Death benefit and cash value guarantees' },
    { title: 'Tax Advantages', description: 'Tax-deferred growth and tax-free loans' },
    { title: 'Estate Planning', description: 'Using whole life in estate strategies' },
    { title: 'Business Applications', description: 'Key person and buy-sell agreements' },
    { title: 'Retirement Planning', description: 'Supplementing retirement income' },
    { title: 'Children\'s Policies', description: 'Starting whole life early for children' },
    { title: 'Policy Riders', description: 'Additional benefits and features' },
    { title: 'Underwriting Process', description: 'Medical exams and approval requirements' },
    { title: 'Premium Payment Options', description: 'Annual, semi-annual, quarterly payments' },
    { title: 'Cash Surrender', description: 'Accessing cash value through surrender' },
    { title: 'Investment Component', description: 'Conservative investment approach' },
    { title: 'Family Protection', description: 'Lifelong coverage for your loved ones' },
    { title: 'Policy Illustrations', description: 'Understanding projected values' },
    { title: 'Conversion from Term', description: 'Converting term life to whole life' },
    { title: 'Joint Life Policies', description: 'Coverage for married couples' },
    { title: 'Modified Whole Life', description: 'Lower initial premiums options' },
    { title: 'Single Premium', description: 'One-time payment whole life policies' },
    { title: 'Policy Management', description: 'Maintaining your whole life policy' },
    { title: 'Beneficiary Options', description: 'Flexible payout options for beneficiaries' },
    { title: 'Creditor Protection', description: 'Asset protection benefits' },
    { title: 'Charitable Giving', description: 'Using whole life for charitable purposes' },
    { title: 'Special Needs Planning', description: 'Coverage for disabled beneficiaries' },
    { title: 'Global Coverage', description: 'Worldwide protection benefits' },
    { title: 'Policy Performance', description: 'Monitoring your policy\'s progress' },
    { title: 'Legacy Planning', description: 'Creating a lasting financial legacy' }
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