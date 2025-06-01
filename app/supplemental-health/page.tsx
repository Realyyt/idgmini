"use client"

import { useState, useEffect } from 'react';
import { Shield, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

import Footer from '../components/footer';
import QuoteForm from '../components/QuoteForm';

interface FlyerMetadata {
  name: string;
  description: string;
  imageUrl: string;
}

const product = {
  name: 'SUPPLEMENTAL HEALTH',
  icon: <Shield size={48} className="text-blue-600" />,
  description: 'Additional coverage to complement your primary health insurance.',
  type: 'supplemental-health'
};

function FlyersSection({ productType }: { productType: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [flyers, setFlyers] = useState<FlyerMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const flyersPerPage = 6;
  
  useEffect(() => {
    const loadFlyers = async () => {
      try {
        const response = await fetch('/api/admin/flyers');
        const data = await response.json();
        if (data.success && data.flyers[productType]) {
          setFlyers(data.flyers[productType].filter((f: FlyerMetadata) => f.imageUrl));
        }
      } catch (error) {
        console.error('Error loading flyers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFlyers();
  }, [productType]);
  
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

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading flyers...</div>
        </div>
      </section>
    );
  }

  if (flyers.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">No flyers available yet.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Product Flyers & Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentFlyers.map((flyer, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
                <Image
                  src={flyer.imageUrl}
                  alt={flyer.name || `Flyer ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              
              <h3 className="text-lg font-semibold text-blue-800 mb-2">{flyer.name || `Flyer ${index + 1}`}</h3>
              <p className="text-gray-600 mb-4">{flyer.description || 'No description available'}</p>
              
              <div className="flex justify-between items-center">
                <a 
                  href={`/api/download?url=${encodeURIComponent(flyer.imageUrl)}`}
                  className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  <Download size={16} /> Download
                </a>
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
      <FlyersSection productType={product.type} />

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