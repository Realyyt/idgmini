'use server';

import * as SibApiV3Sdk from '@sendinblue/client';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  coverageAmount: string;
  additionalInfo: string;
  insuranceType: string;
}

export async function POST(request: Request) {
  try {
    const formData: FormData = await request.json();
    
    // Initialize Sendinblue API client
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.SENDINBLUE_API_KEY || '');

    // Create email content
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: process.env.ADMIN_EMAIL || '' }];
    sendSmtpEmail.subject = `New Insurance Quote Request - ${formData.insuranceType}`;
    sendSmtpEmail.htmlContent = `
      <h2>New Insurance Quote Request</h2>
      <p><strong>Insurance Type:</strong> ${formData.insuranceType}</p>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>ZIP Code:</strong> ${formData.zipCode}</p>
      <p><strong>Desired Coverage Amount:</strong> $${formData.coverageAmount}</p>
      <p><strong>Additional Information:</strong></p>
      <p>${formData.additionalInfo}</p>
    `;

    // Send email
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 