"use client"

import { useState } from 'react';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useFlyerImages } from '../hooks/useFlyerImages';

interface Flyer {
  title: string;
  description: string;
}

interface FlyersSectionProps {
  flyers: Flyer[];
  productType: string;
}

export default function FlyersSection({ flyers, productType }: FlyersSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const flyersPerPage = 6;
  const { getFlyerImage, isLoading } = useFlyerImages(productType);
  
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
          {currentFlyers.map((flyer: Flyer, relativeIndex: number) => {
            const globalIndex = indexOfFirstFlyer + relativeIndex;
            const uploadedImage = getFlyerImage ? getFlyerImage(globalIndex) : null;
            
            return (
              <div 
                key={globalIndex} 
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                {/* Image container */}
                <div className="w-full h-48 mb-4 rounded overflow-hidden relative">
                  {uploadedImage ? (
                    <Image
                      src={uploadedImage}
                      alt={flyer.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: `hsl(${globalIndex * 30}, 50%, 80%)` }}
                    >
                      {isLoading && (
                        <div className="text-white/70 text-sm">Loading...</div>
                      )}
                    </div>
                  )}
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
                    onClick={() => {
                      if (uploadedImage) {
                        // Create a temporary link to download the image
                        const link = document.createElement('a');
                        link.href = uploadedImage;
                        link.download = `${flyer.title}.jpg`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }
                    }}
                  >
                    <Download size={16} /> Download
                  </button>
                </div>
              </div>
            );
          })}
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