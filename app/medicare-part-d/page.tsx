"use client"

import { useState } from 'react';
import { Pill, Download, ChevronLeft, ChevronRight } from 'lucide-react';

import Footer from '../components/footer';
import QuoteForm from '../components/QuoteForm';

const product = {
  name: 'MEDICARE PART D',
  icon: <Pill size={48} className="text-blue-600" />,
  description: 'Prescription drug coverage that helps pay for both brand-name and generic prescription drugs.',
  flyers: [
    { title: 'Plan Comparison Guide', description: 'Compare different Part D plans and their formularies' },
    { title: 'Enrollment Guide', description: 'When and how to enroll in Medicare Part D' },
    { title: 'Cost Comparison Tool', description: 'Compare premiums, deductibles, and copayments' },
    { title: 'Formulary Guide', description: 'Understanding covered medications and tiers' },
    { title: 'Pharmacy Network Guide', description: 'Finding in-network pharmacies' },
    { title: 'Coverage Gap Guide', description: 'Understanding the donut hole and coverage phases' },
    { title: 'Extra Help Program', description: 'Financial assistance for prescription drug costs' },
    { title: 'Mail Order Options', description: '90-day supply and home delivery services' },
    { title: 'Switching Plans Guide', description: 'How to change your Part D plan' },
    { title: 'Annual Enrollment Period', description: 'When you can change your coverage' },
    { title: 'Cost-Saving Tips', description: 'Ways to reduce your prescription drug costs' },
    { title: 'Generic Drug Guide', description: 'Understanding generic alternatives' },
    { title: 'Prior Authorization Guide', description: 'When you need approval for certain drugs' },
    { title: 'Step Therapy Guide', description: 'Understanding medication step requirements' },
    { title: 'Quantity Limits Guide', description: 'Understanding prescription quantity restrictions' },
    { title: 'Premium Payment Options', description: 'Different ways to pay your premiums' },
    { title: 'Claims Process', description: 'How to file and track prescription claims' },
    { title: 'Renewal Information', description: 'What to expect when renewing your policy' },
    { title: 'Disability Coverage', description: 'Options for those under 65' },
    { title: 'Family Coverage Options', description: 'Coverage for spouses and dependents' },
    { title: 'Part D vs. Advantage', description: 'Comparing your prescription coverage options' },
    { title: 'Long-Term Medication Guide', description: 'Coverage for chronic conditions' },
    { title: 'Specialty Drug Coverage', description: 'Coverage for high-cost medications' },
    { title: 'Vaccine Coverage', description: 'Coverage for preventive vaccines' },
    { title: 'Diabetes Supplies', description: 'Coverage for diabetes testing supplies' },
    { title: 'Medication Therapy Management', description: 'Free medication review services' },
    { title: 'Travel Coverage', description: 'Getting prescriptions while traveling' },
    { title: 'Emergency Coverage', description: 'Getting prescriptions in emergencies' },
    { title: 'Appeal Process', description: 'How to appeal coverage decisions' },
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