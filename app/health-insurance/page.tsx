"use client"

import { Heart } from 'lucide-react';
import Footer from '../components/footer';
import QuoteForm from '../components/QuoteForm';
import FlyersSection from '../components/FlyersSection';

const product = {
  name: 'HEALTH INSURANCE',
  icon: <Heart size={48} className="text-blue-600" />,
  description: 'Comprehensive health coverage including medical, hospital, prescription drug, and preventive care benefits.',
  flyers: [
    { title: 'Health Insurance Basics', description: 'Understanding essential health benefits and coverage' },
    { title: 'Plan Types Explained', description: 'HMO, PPO, EPO, and POS plan differences' },
    { title: 'Network Providers', description: 'Finding in-network doctors and hospitals' },
    { title: 'Deductibles & Copays', description: 'Understanding your out-of-pocket costs' },
    { title: 'Prescription Coverage', description: 'How your plan covers medications' },
    { title: 'Preventive Care', description: 'Free screenings and wellness visits' },
    { title: 'Emergency Coverage', description: 'Emergency room and urgent care benefits' },
    { title: 'Specialist Care', description: 'Referrals and specialist visit coverage' },
    { title: 'Mental Health Benefits', description: 'Behavioral health and therapy coverage' },
    { title: 'Maternity Coverage', description: 'Pregnancy and newborn care benefits' },
    { title: 'Pediatric Services', description: 'Children\'s health and dental coverage' },
    { title: 'Chronic Disease Management', description: 'Coverage for ongoing health conditions' },
    { title: 'Rehabilitation Services', description: 'Physical and occupational therapy' },
    { title: 'Home Health Care', description: 'In-home medical services and equipment' },
    { title: 'Hospice Care', description: 'End-of-life care and support services' },
    { title: 'Vision Coverage', description: 'Eye exams and vision correction benefits' },
    { title: 'Dental Coverage', description: 'Oral health and dental care benefits' },
    { title: 'Alternative Medicine', description: 'Coverage for chiropractic and acupuncture' },
    { title: 'Telehealth Services', description: 'Virtual doctor visits and remote monitoring' },
    { title: 'Pharmacy Benefits', description: 'Mail-order and retail pharmacy options' },
    { title: 'Pre-existing Conditions', description: 'Coverage for existing health issues' },
    { title: 'Prior Authorization', description: 'When you need approval for treatments' },
    { title: 'Claims Process', description: 'How to file and track insurance claims' },
    { title: 'Appeals & Grievances', description: 'Disputing coverage decisions' },
    { title: 'Open Enrollment', description: 'When and how to enroll in coverage' },
    { title: 'Special Enrollment', description: 'Qualifying life events for enrollment' },
    { title: 'Premium Tax Credits', description: 'Financial assistance for plan premiums' },
    { title: 'Cost-Sharing Reductions', description: 'Help with deductibles and copays' },
    { title: 'COBRA Coverage', description: 'Continuing coverage after job loss' },
    { title: 'Short-Term Plans', description: 'Temporary health insurance options' }
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
      <FlyersSection flyers={product.flyers} productType="health-insurance" />

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