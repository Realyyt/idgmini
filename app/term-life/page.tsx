"use client"

import { Shield } from 'lucide-react';
import Footer from '../components/footer';
import QuoteForm from '../components/QuoteForm';
import FlyersSection from '../components/FlyersSection';

const product = {
  name: 'TERM LIFE INSURANCE',
  icon: <Shield size={48} className="text-blue-600" />,
  description: 'Affordable life insurance coverage for a specific period, providing financial protection for your loved ones.',
  flyers: [
    { title: 'Term Life Basics', description: 'Understanding the fundamentals of term life insurance' },
    { title: 'Coverage Amount Guide', description: 'How much life insurance coverage do you need?' },
    { title: 'Term Length Options', description: 'Choosing between 10, 20, or 30-year terms' },
    { title: 'Premium Comparison', description: 'Comparing costs across different providers' },
    { title: 'Health Requirements', description: 'Medical exams and health questionnaires' },
    { title: 'Beneficiary Guide', description: 'Choosing and updating your beneficiaries' },
    { title: 'Conversion Options', description: 'Converting term to permanent life insurance' },
    { title: 'Application Process', description: 'Step-by-step guide to applying' },
    { title: 'Underwriting Guide', description: 'What to expect during the approval process' },
    { title: 'Age and Pricing', description: 'How age affects your premiums' },
    { title: 'Renewal Information', description: 'What happens when your term expires' },
    { title: 'Tax Benefits', description: 'Tax implications of life insurance proceeds' },
    { title: 'Family Protection', description: 'Ensuring your family\'s financial security' },
    { title: 'Mortgage Protection', description: 'Using term life to protect your home' },
    { title: 'Income Replacement', description: 'Calculating income replacement needs' },
    { title: 'Child Coverage', description: 'Term life insurance for children' },
    { title: 'Group vs Individual', description: 'Employer coverage vs personal policies' },
    { title: 'Lifestyle Factors', description: 'How smoking and health affect rates' },
    { title: 'Claim Process', description: 'How beneficiaries file claims' },
    { title: 'Policy Riders', description: 'Additional coverage options available' },
    { title: 'No-Exam Options', description: 'Simplified issue life insurance' },
    { title: 'Senior Coverage', description: 'Term life options for older adults' },
    { title: 'Business Protection', description: 'Using term life for business needs' },
    { title: 'Estate Planning', description: 'Term life in your estate plan' },
    { title: 'Debt Protection', description: 'Covering loans and credit card debt' },
    { title: 'Education Funding', description: 'Ensuring funds for children\'s education' },
    { title: 'Special Circumstances', description: 'Coverage for unique situations' },
    { title: 'Policy Maintenance', description: 'Keeping your policy in force' },
    { title: 'Comparison Shopping', description: 'How to compare different policies' },
    { title: 'Common Mistakes', description: 'Avoiding pitfalls when buying term life' }
  ]
};

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
      <FlyersSection flyers={product.flyers} productType="term-life" />

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