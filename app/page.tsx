"use client"

import { useState, ReactElement } from 'react';
import { ChevronRight, Phone, Calendar, HelpCircle, Shield, Heart, Briefcase, Users } from 'lucide-react';
import Footer from './components/footer';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState('health');

  // Product display name mapping
  const productDisplayNames: { [key: string]: string } = {
    // Health Insurance Products
    'accident-insurance': 'Accident Insurance',
    'aca-marketplace': 'ACA Marketplace Plans',
    'critical-illness': 'Critical Illness Insurance',
    'dental-vision': 'Dental & Vision',
    'group-health': 'Group Health Plans',
    'individual-family': 'Individual & Family Health Plans',
    'short-term-medical': 'Short-Term Medical Plans',
    'supplemental-health': 'Supplemental Health Plans',
    'medicare-supplement': 'Medicare Supplement/Medigap Plan',
    'medicare-advantage': 'Medicare Advantage Plan – MA Plan',
    'medicare-advantage-pdp': 'Medicare Advantage Prescription Drug Plan – MA-PDP',
    'prescription-drug-plan': 'Prescription Drug Plan – PDP',
    // Life Insurance Products
    'term-life': 'Term Life Insurance',
    'whole-life': 'Whole Life Insurance',
    'universal-life': 'Universal Life Insurance',
    'indexed-universal-life': 'Indexed Universal Life Insurance',
    'final-expense': 'Final Expense Insurance',
    'group-life': 'Group Life Insurance',
    'survivorship-life': 'Survivorship Life Insurance',
    'accidental-death': 'Accidental Death and Dismemberment (AD&D) Insurance'
  };

  // Product icon mapping
  const productIcons: { [key: string]: ReactElement } = {
    'Accident Insurance': <Shield size={48} className="text-blue-600" />,
    'ACA Marketplace Plans': <Heart size={48} className="text-blue-600" />,
    'Critical Illness Insurance': <Shield size={48} className="text-red-600" />,
    'Dental & Vision': <Shield size={48} className="text-cyan-600" />,
    'Group Health Plans': <Users size={48} className="text-blue-600" />,
    'Individual & Family Health Plans': <Users size={48} className="text-green-600" />,
    'Short-Term Medical Plans': <Calendar size={48} className="text-blue-600" />,
    'Supplemental Health Plans': <Shield size={48} className="text-purple-600" />,
    'Medicare Supplement/Medigap Plan': <Shield size={48} className="text-yellow-600" />,
    'Medicare Advantage Plan – MA Plan': <Shield size={48} className="text-red-600" />,
    'Medicare Advantage Prescription Drug Plan – MA-PDP': <Shield size={48} className="text-orange-600" />,
    'Prescription Drug Plan – PDP': <Shield size={48} className="text-green-600" />,
    'Term Life Insurance': <Calendar size={48} className="text-blue-600" />,
    'Whole Life Insurance': <Shield size={48} className="text-green-600" />,
    'Universal Life Insurance': <Shield size={48} className="text-purple-600" />,
    'Indexed Universal Life Insurance': <Briefcase size={48} className="text-blue-600" />,
    'Final Expense Insurance': <Shield size={48} className="text-gray-600" />,
    'Group Life Insurance': <Users size={48} className="text-blue-600" />,
    'Survivorship Life Insurance': <Users size={48} className="text-green-600" />,
    'Accidental Death and Dismemberment (AD&D) Insurance': <Shield size={48} className="text-red-600" />
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">PROPER PROTECTION: Our Insurance Products</h1>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Securing Policies, Protecting Clients: We provide dedicated support to ensure the successful 
            completion of insurance applications and the issuance of policies. Protect your future today—choose 
            personalized health and life insurance plans designed to secure what matters most to you and your loved ones.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${activeTab === 'health' ? 'bg-white text-blue-800' : 'bg-blue-700 hover:bg-blue-600'}`}
              onClick={() => setActiveTab('health')}
            >
              Health Insurance
            </button>
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${activeTab === 'life' ? 'bg-white text-blue-800' : 'bg-blue-700 hover:bg-blue-600'}`}
              onClick={() => setActiveTab('life')}
            >
              Life Insurance
            </button>
          </div>
          <a href="/contact" className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center">
            <Phone size={20} className="mr-2" />
            Get Help from a Licensed Insurance Provider
          </a>
        </div>
      </section>

      {/* Product Category Visual Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-900">
            {activeTab === 'health' ? 'Health Insurance Solutions' : 'Life Insurance Solutions'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {activeTab === 'health' ? (
              <>
                <div className="bg-blue-50 p-6 rounded-xl text-center">
                  <div className="mx-auto w-32 h-32 flex items-center justify-center bg-blue-500 rounded-full shadow-md mb-4">
                  </div>
                  <h3 className="text-xl font-bold text-blue-800">Individual Coverage</h3>
                  <p className="text-gray-600 mt-2">Tailored plans for personal health needs</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <div className="mx-auto w-32 h-32 flex items-center justify-center bg-green-500 rounded-full shadow-md mb-4">
                  </div>
                  <h3 className="text-xl font-bold text-green-800">Family Plans</h3>
                  <p className="text-gray-600 mt-2">Comprehensive coverage for your entire family</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl text-center">
                  <div className="mx-auto w-32 h-32 flex items-center justify-center bg-yellow-500 rounded-full shadow-md mb-4">
                  </div>
                  <h3 className="text-xl font-bold text-yellow-800">Medicare Options</h3>
                  <p className="text-gray-600 mt-2">Specialized plans for seniors</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl text-center">
                  <div className="mx-auto w-32 h-32 flex items-center justify-center bg-red-500 rounded-full shadow-md mb-4">
                  </div>
                  <h3 className="text-xl font-bold text-red-800">Business Solutions</h3>
                  <p className="text-gray-600 mt-2">Group plans for employers and employees</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-purple-50 p-6 rounded-xl text-center">
                  <div className="mx-auto w-32 h-32 flex items-center justify-center bg-purple-500 rounded-full shadow-md mb-4">
                  </div>
                  <h3 className="text-xl font-bold text-purple-800">Term Coverage</h3>
                  <p className="text-gray-600 mt-2">Affordable protection for a specific period</p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-xl text-center">
                  <div className="mx-auto w-32 h-32 flex items-center justify-center bg-indigo-500 rounded-full shadow-md mb-4">
                  </div>
                  <h3 className="text-xl font-bold text-indigo-800">Permanent Protection</h3>
                  <p className="text-gray-600 mt-2">Lifelong coverage with cash value benefits</p>
                </div>
                <div className="bg-pink-50 p-6 rounded-xl text-center">
                  <div className="mx-auto w-32 h-32 flex items-center justify-center bg-pink-500 rounded-full shadow-md mb-4">
                  </div>
                  <h3 className="text-xl font-bold text-pink-800">Final Expense</h3>
                  <p className="text-gray-600 mt-2">Coverage for end-of-life costs</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl text-center">
                  <div className="mx-auto w-32 h-32 flex items-center justify-center bg-blue-500 rounded-full shadow-md mb-4">
                  </div>
                  <h3 className="text-xl font-bold text-blue-800">Special Coverage</h3>
                  <p className="text-gray-600 mt-2">Survivorship and accidental benefits</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Product Listings */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {activeTab === 'health' ? (
            <>
              <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">HEALTH INSURANCE PRODUCTS</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {name: 'accident-insurance', desc: 'Provides cash benefits for injuries or illnesses.'},
                  {name: 'aca-marketplace', desc: 'Essential health benefits, including preventive care, prescription drugs, mental health services, and maternity care.'},
                  {name: 'critical-illness', desc: 'Offers financial relief for covered critical illnesses.'},
                  {name: 'dental-vision', desc: 'Covers routine and comprehensive dental care.'},
                  {name: 'group-health', desc: 'Includes self-funded and fully insured plans for businesses.'},
                  {name: 'individual-family', desc: 'Comprehensive Health Insurance.'},
                  {name: 'short-term-medical', desc: 'Temporary coverage for gaps in comprehensive insurance.'},
                  {name: 'supplemental-health', desc: 'Options like cancer, disability, hospital indemnity, and vision coverage.'},
                  {name: 'medicare-supplement', desc: 'Cover gaps in Original Medicare, such as copayments, deductibles, and coinsurance.'},
                  {name: 'medicare-advantage', desc: 'An alternative to Original Medicare, often include additional benefits like vision, dental, and prescription drug coverage.'},
                  {name: 'medicare-advantage-pdp', desc: 'An alternative to Original Medicare, often include additional benefits like vision, dental, and prescription drug coverage.'},
                  {name: 'prescription-drug-plan', desc: 'Prescription drug plans to help cover the cost of medications.'}
                ].map((product: { name: string; desc: string }, index) => (
                  <div key={index} className="border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow bg-white">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        {productIcons[productDisplayNames[product.name]]}
                      </div>
                      <h3 className="text-xl font-bold text-blue-800">{productDisplayNames[product.name]}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{product.desc}</p>
                    <div className="flex gap-3 mt-4">
                      <Link
                        href={`/products/${product.name}`}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                      >
                        <ChevronRight size={16} className="mr-1" />
                        Learn More
                      </Link>
                      <Link
                        href={`/products/${product.name}#quote`}
                        className="text-green-600 hover:text-green-800 font-medium flex items-center"
                      >
                        <Calendar size={16} className="mr-1" />
                        Get a Quote
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4 text-center text-blue-900">LIFE INSURANCE PRODUCTS</h2>
              <p className="text-center text-gray-600 max-w-4xl mx-auto mb-10">
                Life insurance products come in various forms to meet different needs. Each product serves a unique purpose, 
                so choosing the right one depends on individual goals and circumstances. Take the first step in securing your 
                future—choose between term or permanent life insurance, tailored to meet your unique needs and priorities. Your protection starts with the right choice!
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {name: 'term-life', desc: 'Provides coverage for a specific period, such as 10, 20, or 30 years, with a death benefit paid if the insured passes away during the term.'},
                  {name: 'whole-life', desc: 'A type of permanent life insurance offering lifelong coverage, a guaranteed death benefit, and a cash value component that grows over time.'},
                  {name: 'universal-life', desc: 'Another form of permanent insurance with flexible premiums and death benefits, along with a cash value that earns interest.'},
                  {name: 'indexed-universal-life', desc: 'Links the cash value growth to a stock market index, offering potential for higher returns while maintaining a death benefit.'},
                  {name: 'final-expense', desc: 'Designed to cover end-of-life costs, such as funeral expenses and medical bills.'},
                  {name: 'group-life', desc: 'Often provided by employers, offering basic coverage for employees at a lower cost.'},
                  {name: 'survivorship-life', desc: 'Covers two individuals, typically spouses, and pays out after the second person passes away.'},
                  {name: 'accidental-death', desc: 'Provides benefits in case of death or injury due to an accident.'}
                ].map((product, index) => (
                  <div key={index} className="border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow bg-white">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        {productIcons[productDisplayNames[product.name]]}
                      </div>
                      <h3 className="text-xl font-bold text-blue-800">{productDisplayNames[product.name]}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{product.desc}</p>
                    <div className="flex gap-3 mt-4">
                      <Link
                        href={`/products/${product.name}`}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                      >
                        <ChevronRight size={16} className="mr-1" />
                        Learn More
                      </Link>
                      <Link
                        href={`/products/${product.name}#quote`}
                        className="text-green-600 hover:text-green-800 font-medium flex items-center"
                      >
                        <Calendar size={16} className="mr-1" />
                        Get a Quote
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Featured Products with Images */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-900">Featured Products</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
              <div className="relative w-full h-48">
          <Image
                  src="/placeholder.svg"
                  alt="Individual Plan"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  {activeTab === 'health' ? 'ACA Marketplace Plans' : 'Term Life Insurance'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {activeTab === 'health' 
                    ? 'Comprehensive coverage with essential health benefits and financial assistance options.'
                    : 'Affordable coverage for a specific term length with fixed premiums and death benefits.'}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
              <div className="relative w-full h-48">
          <Image
                  src="/placeholder.svg"
                  alt="Family Plan"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  {activeTab === 'health' ? 'Family Health Plans' : 'Whole Life Insurance'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {activeTab === 'health' 
                    ? 'Protect your entire family with comprehensive coverage options designed for multi-person households.'
                    : 'Permanent protection with guaranteed death benefits and cash value accumulation over time.'}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
              <div className="relative w-full h-48">
          <Image
                  src="/placeholder.svg"
                  alt="Specialized Plan"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  {activeTab === 'health' ? 'Medicare Advantage Plans' : 'Universal Life Insurance'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {activeTab === 'health' 
                    ? 'All-in-one Medicare coverage with additional benefits like vision, dental, and prescription drugs.'
                    : 'Flexible premium payments and adjustable death benefits with cash value growth potential.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section id="help" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">Need Help Choosing?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Our insurance providers are ready to help you find the right coverage for your needs.
            Get personalized advice and quotes today.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center"
            >
              <Phone size={20} className="mr-2" />
              <a href='impactdeliverygroup.com/contact'>Schedule a Call</a>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
