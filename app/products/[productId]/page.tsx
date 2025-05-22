"use client"

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Shield, Heart, Briefcase, Users, Calendar, Download, ChevronLeft, ChevronRight, Pill } from 'lucide-react';

import Footer from '../../components/footer';
import QuoteForm from '../../components/QuoteForm';

// Product data mapping with flyers added
const productDetails = {
  'accident-insurance': {
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
  },
  'aca-marketplace': {
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
  },
  'critical-illness': {
    name: 'CRITICAL ILLNESS INSURANCE',
    icon: <Heart size={48} className="text-blue-600" />,
    description: 'Provides financial protection against major illnesses.',
    flyers: [
      { title: 'Critical Illness Overview', description: 'Understanding critical illness insurance' },
      { title: 'Covered Conditions List', description: 'Illnesses covered by your policy' },
      { title: 'Benefit Distribution Guide', description: 'How and when benefits are paid' },
      { title: 'Cancer Coverage Details', description: 'Specific benefits for cancer diagnosis' },
      { title: 'Heart Attack & Stroke Benefits', description: 'Coverage for cardiovascular events' },
      { title: 'Organ Failure Protection', description: 'Benefits for major organ issues' },
      { title: 'Claim Filing Process', description: 'Steps to file a critical illness claim' },
      { title: 'Family Coverage Options', description: 'Protecting your loved ones' },
      { title: 'Benefit Usage Ideas', description: 'How to utilize your lump-sum payment' },
      { title: 'Recovery Support Services', description: 'Additional resources for recovery' },
      { title: 'Coverage Amounts Guide', description: 'Selecting the right benefit amount' },
      { title: 'Critical Illness Statistics', description: 'Understanding your risk factors' },
      { title: 'Premium Calculation', description: 'How your rate is determined' },
      { title: 'Pre-Existing Conditions', description: 'What to know about coverage limitations' },
      { title: 'Wellness Benefit Rider', description: 'Additional preventive care benefits' },
      { title: 'Recurrence Benefits', description: 'Coverage for multiple diagnoses' },
      { title: 'Critical Illness vs. Disability', description: 'Understanding different coverages' },
      { title: 'Tax Implications Guide', description: 'How benefits affect your taxes' },
      { title: 'Employer vs. Individual Policies', description: 'Comparing coverage options' },
      { title: 'Early Detection Benefits', description: 'Coverage for early-stage diagnoses' },
      { title: 'Children\'s Critical Illness', description: 'Coverage options for minors' },
      { title: 'Senior Protection Plans', description: 'Options for those over 65' },
      { title: 'Policy Portability', description: 'Taking coverage with you when changing jobs' },
      { title: 'Guaranteed Renewability', description: 'Understanding your long-term coverage' },
      { title: 'International Coverage', description: 'Protection while traveling abroad' },
      { title: 'Complementary Coverage Guide', description: 'Pairing with other insurance types' },
      { title: 'Specialist Network Access', description: 'Finding top medical care' },
      { title: 'Hereditary Condition Coverage', description: 'Protection for genetic predispositions' },
      { title: 'Recovery Timeline Resources', description: 'What to expect after diagnosis' },
      { title: 'Caregiver Support', description: 'Resources for family caregivers' }
    ]
  },
  'dental-vision': {
    name: 'DENTAL & VISION',
    icon: <Users size={48} className="text-blue-600" />,
    description: 'Comprehensive dental and vision coverage for individuals and families.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Dental & Vision Flyer ${i+1}`,
      description: `Information about dental and vision coverage, benefit ${i+1}`
    }))
  },
  'group-health': {
    name: 'GROUP HEALTH PLANS',
    icon: <Briefcase size={48} className="text-blue-600" />,
    description: 'Comprehensive health coverage for businesses and organizations.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Group Health Flyer ${i+1}`,
      description: `Information about group health plans, benefit ${i+1}`
    }))
  },
  'individual-family': {
    name: 'INDIVIDUAL & FAMILY HEALTH PLANS',
    icon: <Users size={48} className="text-blue-600" />,
    description: 'Personalized health coverage for individuals and families.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Individual & Family Flyer ${i+1}`,
      description: `Information about individual and family plans, benefit ${i+1}`
    }))
  },
  'short-term-medical': {
    name: 'SHORT-TERM MEDICAL PLANS',
    icon: <Calendar size={48} className="text-blue-600" />,
    description: 'Temporary health coverage for specific time periods.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Short-Term Medical Flyer ${i+1}`,
      description: `Information about short-term medical plans, benefit ${i+1}`
    }))
  },
  'supplemental-health': {
    name: 'SUPPLEMENTAL HEALTH PLANS',
    icon: <Users size={48} className="text-blue-600" />,
    description: 'Additional coverage for specific health needs.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Supplemental Health Flyer ${i+1}`,
      description: `Information about supplemental health plans, benefit ${i+1}`
    }))
  },
  'medicare-advantage-pdp': {
    name: 'MEDICARE ADVANTAGE PDP',
    icon: <Heart size={48} className="text-blue-600" />,
    description: 'All-in-one alternative to Original Medicare.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Medicare Advantage Flyer ${i+1}`,
      description: `Information about Medicare Advantage plans, benefit ${i+1}`
    }))
  },
  'prescription-drug-plan': {
    name: 'PRESCRIPTION DRUG PLAN',
    icon: <Pill size={48} className="text-blue-600" />,
    description: 'Coverage for prescription medications.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Prescription Drug Plan Flyer ${i+1}`,
      description: `Information about Prescription Drug Plans, benefit ${i+1}`
    }))
  },
  'medicare-supplement': {
    name: 'MEDICARE SUPPLEMENT/MEDIGAP PLAN',
    icon: <Shield size={48} className="text-yellow-600" />,
    description: 'Cover gaps in Original Medicare, such as copayments, deductibles, and coinsurance.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Medicare Supplement Flyer ${i+1}`,
      description: `Information about Medicare Supplement plans, benefit ${i+1}`
    }))
  },
  'medicare-advantage': {
    name: 'MEDICARE ADVANTAGE PLAN – MA PLAN',
    icon: <Shield size={48} className="text-red-600" />,
    description: 'An alternative to Original Medicare, often include additional benefits like vision, dental, and prescription drug coverage.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Medicare Advantage Flyer ${i+1}`,
      description: `Information about Medicare Advantage plans, benefit ${i+1}`
    }))
  },
  'term-life': {
    name: 'TERM LIFE INSURANCE',
    icon: <Calendar size={48} className="text-blue-600" />,
    description: 'Provides coverage for a specific period, such as 10, 20, or 30 years, with a death benefit paid if the insured passes away during the term.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Term Life Insurance Flyer ${i+1}`,
      description: `Information about Term Life Insurance, benefit ${i+1}`
    }))
  },
  'whole-life': {
    name: 'WHOLE LIFE INSURANCE',
    icon: <Shield size={48} className="text-green-600" />,
    description: 'A type of permanent life insurance offering lifelong coverage, a guaranteed death benefit, and a cash value component that grows over time.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Whole Life Insurance Flyer ${i+1}`,
      description: `Information about Whole Life Insurance, benefit ${i+1}`
    }))
  },
  'universal-life': {
    name: 'UNIVERSAL LIFE INSURANCE',
    icon: <Shield size={48} className="text-purple-600" />,
    description: 'Another form of permanent insurance with flexible premiums and death benefits, along with a cash value that earns interest.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Universal Life Insurance Flyer ${i+1}`,
      description: `Information about Universal Life Insurance, benefit ${i+1}`
    }))
  },
  'indexed-universal-life': {
    name: 'INDEXED UNIVERSAL LIFE INSURANCE',
    icon: <Briefcase size={48} className="text-blue-600" />,
    description: 'Links the cash value growth to a stock market index, offering potential for higher returns while maintaining a death benefit.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Indexed Universal Life Insurance Flyer ${i+1}`,
      description: `Information about Indexed Universal Life Insurance, benefit ${i+1}`
    }))
  },
  'final-expense': {
    name: 'FINAL EXPENSE INSURANCE',
    icon: <Shield size={48} className="text-gray-600" />,
    description: 'Designed to cover end-of-life costs, such as funeral expenses and medical bills.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Final Expense Insurance Flyer ${i+1}`,
      description: `Information about Final Expense Insurance, benefit ${i+1}`
    }))
  },
  'group-life': {
    name: 'GROUP LIFE INSURANCE',
    icon: <Users size={48} className="text-blue-600" />,
    description: 'Often provided by employers, offering basic coverage for employees at a lower cost.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Group Life Insurance Flyer ${i+1}`,
      description: `Information about Group Life Insurance, benefit ${i+1}`
    }))
  },
  'survivorship-life': {
    name: 'SURVIVORSHIP LIFE INSURANCE',
    icon: <Users size={48} className="text-green-600" />,
    description: 'Covers two individuals, typically spouses, and pays out after the second person passes away.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `Survivorship Life Insurance Flyer ${i+1}`,
      description: `Information about Survivorship Life Insurance, benefit ${i+1}`
    }))
  },
  'accidental-death': {
    name: 'ACCIDENTAL DEATH AND DISMEMBERMENT (AD&D) INSURANCE',
    icon: <Shield size={48} className="text-red-600" />,
    description: 'Provides benefits in case of death or injury due to an accident.',
    flyers: Array(30).fill(null).map((_, i) => ({
      title: `AD&D Insurance Flyer ${i+1}`,
      description: `Information about Accidental Death and Dismemberment Insurance, benefit ${i+1}`
    }))
  }
};

// Component for Flyers Grid with Pagination
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
  const params = useParams();
  const productId = params.productId as string;
  const product = productDetails[productId as keyof typeof productDetails];

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

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