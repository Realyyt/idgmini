'use server';

import * as SibApiV3Sdk from '@sendinblue/client';

interface QuoteFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  insuranceType: string;
}

interface QuoteFormResponse {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
}

export async function submitQuoteForm(formData: QuoteFormData): Promise<QuoteFormResponse> {
  try {
    // Initialize Sendinblue API client
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

    // Create email content
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: 'admin@impactdeliverygroup.com' }];
    sendSmtpEmail.subject = `New Insurance Quote Request - ${formData.insuranceType}`;
    sendSmtpEmail.htmlContent = `
      <h2>New Insurance Quote Request</h2>
      <p><strong>Insurance Type:</strong> ${formData.insuranceType}</p>
      <p><strong>Name:</strong> ${formData.fullName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phoneNumber}</p>
    `;

    // Send email
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return {
      success: true,
      message: 'Thank you for your interest! We will contact you shortly to discuss your insurance needs.'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Sorry, there was an error submitting your request. Please try again or contact us directly.'
    };
  }
} 