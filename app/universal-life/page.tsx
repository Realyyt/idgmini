"use client"

import { useState } from 'react';
import { Star, Download, ChevronLeft, ChevronRight } from 'lucide-react';

import Footer from '../components/footer';
import QuoteForm from '../components/QuoteForm';

const product = {
  name: 'UNIVERSAL LIFE INSURANCE',
  icon: <Star size={48} className="text-blue-600" />,
  description: 'Flexible permanent life insurance with adjustable premiums, death benefits, and investment options for cash value growth.',
  flyers: [
    { title: 'Universal Life Basics', description: 'Understanding flexible permanent life insurance' },
    { title: 'Premium Flexibility', description: 'Adjusting your premium payments over time' },
    { title: 'Death Benefit Options', description: 'Level vs increasing death benefit choices' },
    { title: 'Cash Value Investment', description: 'How your cash value grows with market performance' },
    { title: 'Interest Rate Options', description: 'Fixed vs variable interest crediting' },
    { title: 'Policy Loans', description: 'Borrowing against your cash value' },
    { title: 'Partial Withdrawals', description: 'Accessing cash value without policy loans' },
    { title: 'Cost of Insurance', description: 'Understanding monthly deductions and charges' },
    { title: 'Target Premiums', description: 'Recommended premium levels for policy performance' },
    { title: 'Minimum Premiums', description: 'Lowest payments to keep policy in force' },
    { title: 'Maximum Premiums', description: 'IRS limits on premium payments' },
    { title: 'Investment Accounts', description: 'Available investment options and allocation' },
    { title: 'Guaranteed Elements', description: 'Minimum interest rates and maximum charges' },
    { title: 'Policy Illustrations', description: 'Understanding projected performance scenarios' },
    { title: 'Tax Advantages', description: 'Tax-deferred growth and income tax benefits' },
    { title: 'Estate Planning Uses', description: 'Wealth transfer and estate liquidity strategies' },
    { title: 'Business Applications', description: 'Executive benefits and business protection' },
    { title: 'Retirement Planning', description: 'Using universal life for retirement income' },
    { title: 'Policy Monitoring', description: 'Regular reviews and performance tracking' },
    { title: 'Premium Solving', description: 'Calculating premiums for desired outcomes' },
    { title: 'Surrender Charges', description: 'Early withdrawal penalties and schedules' },
    { title: 'Policy Riders', description: 'Additional benefits and feature options' },
    { title: 'Underwriting Process', description: 'Medical exams and financial underwriting' },
    { title: 'Policy Management', description: 'Making changes and accessing information' },
    { title: 'Market Risk', description: 'Understanding investment risks and rewards' },
    { title: 'Creditor Protection', description: 'Asset protection benefits of life insurance' },
    { title: 'Generation Skipping', description: 'Strategies for multi-generational wealth transfer' },
    { title: 'Split Dollar Plans', description: 'Employer-employee cost sharing arrangements' },
    { title: 'Policy Exchanges', description: '1035 exchanges from other life insurance' },
    { title: 'Performance Reviews', description: 'Annual policy statements and analysis' }
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