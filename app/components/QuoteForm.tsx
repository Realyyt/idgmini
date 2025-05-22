"use client"

import { useState } from 'react';
import { submitQuoteForm } from '../actions/quote-form';
import { Loader2 } from 'lucide-react';

interface QuoteFormProps {
  insuranceType: string;
}

export default function QuoteForm({ insuranceType }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    insuranceType: insuranceType
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formResponse, setFormResponse] = useState<{ success?: boolean; message?: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormResponse(null);
    setFieldErrors({});

    try {
      const response = await submitQuoteForm(formData);

      if (response.success) {
        setFormResponse({ success: true, message: response.message });
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          insuranceType: insuranceType
        });
      } else if (response.fieldErrors) {
        setFieldErrors(response.fieldErrors);
      } else {
        setFormResponse({ success: false, message: response.message });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormResponse({ success: false, message: 'An unexpected error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-md">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Get a Quote</h2>
      {formResponse?.success ? (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 md:p-6 rounded">
          <h3 className="text-lg md:text-xl font-bold mb-2">Thank You!</h3>
          <p className="text-sm md:text-base">{formResponse.message}</p>
          <button className="mt-4 text-teal-600 hover:underline text-sm md:text-base" onClick={() => setFormResponse(null)}>
            Request another quote
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {formResponse?.success === false && formResponse.message && (
            <div className="mb-4 md:mb-6 bg-red-50 border border-red-200 text-red-800 p-3 md:p-4 rounded text-sm md:text-base">
              {formResponse.message}
            </div>
          )}

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${fieldErrors.fullName ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {fieldErrors.fullName && <p className="text-red-500 text-xs mt-1">{fieldErrors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${fieldErrors.phoneNumber ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {fieldErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{fieldErrors.phoneNumber}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${fieldErrors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
          </div>

          <div>
            <label htmlFor="insuranceType" className="block text-sm font-medium text-gray-700 mb-1">
              Type of Insurance
            </label>
            <select
              id="insuranceType"
              name="insuranceType"
              required
              value={formData.insuranceType}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${fieldErrors.insuranceType ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Select Insurance Type</option>
              <option value="Accident Insurance">Accident Insurance</option>
              <option value="ACA Marketplace Plans">ACA Marketplace Plans</option>
              <option value="Critical Illness Insurance">Critical Illness Insurance</option>
              <option value="Dental & Vision">Dental & Vision</option>
              <option value="Group Health Plans">Group Health Plans</option>
              <option value="Individual & Family Health Plans">Individual & Family Health Plans</option>
              <option value="Short-Term Medical Plans">Short-Term Medical Plans</option>
              <option value="Supplemental Health Plans">Supplemental Health Plans</option>
              <option value="Medicare Supplement">Medicare Supplement</option>
              <option value="Medicare Advantage">Medicare Advantage</option>
              <option value="Term Life Insurance">Term Life Insurance</option>
              <option value="Whole Life Insurance">Whole Life Insurance</option>
              <option value="Universal Life Insurance">Universal Life Insurance</option>
              <option value="Final Expense Insurance">Final Expense Insurance</option>
              <option value="Group Life Insurance">Group Life Insurance</option>
            </select>
            {fieldErrors.insuranceType && <p className="text-red-500 text-xs mt-1">{fieldErrors.insuranceType}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Submitting...
              </>
            ) : (
              "Submit Quote Request"
            )}
          </button>
        </form>
      )}
    </div>
  );
} 