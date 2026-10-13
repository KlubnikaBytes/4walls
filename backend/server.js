require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Resend if RESEND_API_KEY is set (recommended for Render Free tier over HTTPS Port 443)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Initialize Nodemailer as fallback (for local development or paid cloud instances)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Unified email dispatch function
async function sendEmail({ to, replyTo, subject, text }) {
  if (resend) {
    console.log('Sending email via Resend API (HTTPS)...');
    const { data, error } = await resend.emails.send({
      from: '4Walls <onboarding@resend.dev>',
      to: [to],
      reply_to: replyTo,
      subject: subject,
      text: text
    });
    if (error) {
      throw new Error(`Resend Error: ${error.message}`);
    }
    return { provider: 'resend', id: data?.id };
  } else {
    console.log('Sending email via Nodemailer SMTP...');
    const info = await transporter.sendMail({
      from: `"4Walls Inquiries" <${process.env.EMAIL_USER}>`,
      to: to,
      replyTo: replyTo,
      subject: subject,
      text: text
    });
    return { provider: 'nodemailer', id: info.messageId };
  }
}

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: '4Walls backend is running',
    emailDriver: resend ? 'Resend (HTTPS Port 443)' : 'Nodemailer (SMTP Port 465)'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    emailDriver: resend ? 'Resend' : 'Nodemailer'
  });
});

app.post('/api/consultation', async (req, res) => {
  const { name, email, phone, interest, message } = req.body;
  const receiverEmail = process.env.RECEIVER_EMAIL || 'agnik.m03@gmail.com';

  const emailText = `
New Consultation Lead Received from 4Walls Website:
---------------------------------------------------
Name: ${name || 'N/A'}
Email: ${email || 'N/A'}
Phone: ${phone || 'N/A'}
Interest: ${interest || 'General Inquiry'}

Message:
${message || 'N/A'}
  `;

  try {
    const result = await sendEmail({
      to: receiverEmail,
      replyTo: email,
      subject: `New Consultation Request: ${interest || 'General Inquiry'}`,
      text: emailText
    });

    console.log('Consultation email sent successfully:', result);
    res.status(200).json({
      success: true,
      message: 'Consultation request received successfully.',
      result
    });
  } catch (error) {
    console.error('Server Consultation Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send email.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
  console.log(`Email driver: ${resend ? 'Resend (HTTPS Port 443)' : 'Nodemailer (SMTP Port 465)'}`);
});
