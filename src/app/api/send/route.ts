import React from 'react';
import { NextRequest, NextResponse } from 'next/server';
import { EmailTemplate } from '@/components/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { to, subject, details, firstName } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'service@nolimitsmobiledetailing.com',
      to: [to],
      subject,
      react: React.createElement(EmailTemplate, { firstName, details }), // Ensure valid ReactNode
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
