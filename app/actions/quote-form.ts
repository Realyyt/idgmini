'use server';

import { SibApiV3Sdk } from '@sendinblue/client';

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  insuranceType: string;
}

interface FormResponse {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
}

export async function submitQuoteForm(formData: FormData): Promise<FormResponse> {
  try {
    // Validate form data
    const fieldErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      fieldErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      fieldErrors.phoneNumber = 'Phone number is required';
    }
    
    if (!formData.email.trim()) {
      fieldErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      fieldErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.insuranceType) {
      fieldErrors.insuranceType = 'Please select an insurance type';
    }

    if (Object.keys(fieldErrors).length > 0) {
      return {
        success: false,
        message: 'Please correct the errors in the form',
        fieldErrors
      };
    }

    // Initialize Brevo API client
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

    // Create email content
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: process.env.ADMIN_EMAIL! }];
    sendSmtpEmail.subject = `New Quote Request - ${formData.insuranceType}`;
    sendSmtpEmail.htmlContent = `
      <h2>New Quote Request</h2>
      <p><strong>Full Name:</strong> ${formData.fullName}</p>
      <p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Insurance Type:</strong> ${formData.insuranceType}</p>
    `;

    // Send email
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return {
      success: true,
      message: 'Thank you for your quote request! We will contact you shortly.'
    };
  } catch (error) {
    console.error('Error submitting quote form:', error);
    return {
      success: false,
      message: 'An error occurred while submitting your request. Please try again later.'
    };
  }
} 