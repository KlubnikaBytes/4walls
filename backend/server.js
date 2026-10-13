require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify SMTP connection on startup so Render logs show exact status
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter verification failed:', error.message);
  } else {
    console.log('Email transporter is ready and authenticated successfully');
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: '4Walls backend is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.get('/api/test-email', async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: 'Diagnostic Test from 4Walls Backend',
      text: `Diagnostic test sent at ${new Date().toISOString()}.\nFrom: ${process.env.EMAIL_USER}\nTo: ${process.env.RECEIVER_EMAIL}`
    });
    res.json({ success: true, messageId: info.messageId, response: info.response, to: process.env.RECEIVER_EMAIL });
  } catch (error) {
    console.error('Diagnostic Email Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/consultation', async (req, res) => {
  const { name, email, phone, interest, message } = req.body;
  
  try {
    const info = await transporter.sendMail({
      from: `"4Walls Inquiries" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Consultation Request: ${interest || 'General Inquiry'}`,
      text: `
New Lead Received from 4Walls Website:
----------------------------------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Interest: ${interest}

Message:
${message}
      `,
    });

    console.log('Consultation email sent successfully:', info.messageId);
    res.status(200).json({ success: true, message: 'Consultation request received successfully.', messageId: info.messageId });
  } catch (error) {
    console.error('Server Consultation Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to send.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
