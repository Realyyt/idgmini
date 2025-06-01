"use client"

import { useState } from 'react';
import { Shield, Download, ChevronLeft, ChevronRight } from 'lucide-react';

import Footer from '../components/footer';
import QuoteForm from '../components/QuoteForm';

const product = {
  name: 'ACCIDENT INSURANCE',
  icon: <Shield size={48} className="text-blue-600" />,
  description: 'Provides cash benefits for injuries or illnesses.',
  flyers: [
    { title: 'Accident Coverage Overview', description: 'A comprehensive guide to our accident insurance plans' },
    { title: 'Family Protection Plan', description: 'How accident insurance protects your entire family' },
    { title: 'Claim Process Guide', description: 'Step-by-step guide to filing an accident claim' },
    { title: 'Sports Injury Coverage', description: 'Special coverage details for sports-related injuries' },
    { title: 'Workplace Accident Protection', description: 'Coverage for accidents that happen at work' },
    { title: 'Travel Protection', description: 'Accident coverage while traveling domestically and internationally' },
    { title: 'Recovery Benefits', description: 'Financial support during your recovery period' },
    { title: 'Hospital Stay Coverage', description: 'Benefits for hospital stays due to accidents' },
    { title: '24/7 Coverage Explained', description: 'How our policy protects you around the clock' },
    { title: 'Emergency Transport Benefits', description: 'Coverage for ambulance and emergency transportation' },
    { title: 'Physical Therapy Benefits', description: 'Support for rehabilitation after an accident' },
    { title: 'Coverage Levels Comparison', description: 'Different tiers of accident insurance compared' },
    { title: 'Kid-Friendly Coverage', description: 'Special protections for children' },
    { title: 'Senior Accident Protection', description: 'Tailored coverage for seniors' },
    { title: 'Accident Prevention Tips', description: 'How to reduce your risk of common accidents' },
    { title: 'Premium Payment Options', description: 'Flexible ways to pay for your coverage' },
    { title: 'Common Exclusions', description: 'Understanding what isn\'t covered' },
    { title: 'Supplemental Coverage Guide', description: 'How accident insurance works with your primary health plan' },
    { title: 'Benefit Usage Examples', description: 'Real scenarios showing how benefits are paid' },
    { title: 'Coverage Upgrade Options', description: 'Ways to enhance your basic coverage' },
    { title: 'Quick Start Guide', description: 'Getting started with your new policy' },
    { title: 'Digital Claim Filing', description: 'Using our app to file and track claims' },
    { title: 'Policy Renewal Information', description: 'What to expect when renewing your coverage' },
    { title: 'Coverage Calculator', description: 'Determine how much coverage you need' },
    { title: 'Accident Statistics', description: 'Why accident insurance matters' },
    { title: 'Direct Deposit Setup', description: 'Get your benefits faster with direct deposit' },
    { title: 'Coverage During Pregnancy', description: 'Special considerations for expectant mothers' },
    { title: 'Sports League Discounts', description: 'Special rates for organized sports participants' },
    { title: 'Educational Materials', description: 'Resources to understand your coverage better' },
    { title: 'Customer Testimonials', description: 'Stories from policyholders who benefited from coverage' }
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