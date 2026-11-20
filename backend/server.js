require('dotenv').config();
const http = require('http');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const { WebSocketServer, WebSocket } = require('ws');
const multer = require('multer');

const { Storage, UPLOADS_DIR } = require('./storage');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded media files statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Configure Multer storage for uploads
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, `${cleanBase}-${uniqueSuffix}${ext}`);
  }
});
const upload = multer({
  storage: storageConfig,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB max (images and videos)
});

// Create HTTP Server
const server = http.createServer(app);

// Initialize WebSocket Server
const wss = new WebSocketServer({ server });

function broadcast(type, payload = {}) {
  const data = JSON.stringify({
    type,
    payload,
    timestamp: new Date().toISOString()
  });

  let count = 0;
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
      count++;
    }
  });
  console.log(`[WebSocket] Broadcasted "${type}" to ${count} active client(s).`);
}

wss.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`[WebSocket] Client connected from ${ip}. Total clients: ${wss.clients.size}`);

  // Send welcome handshake with initial server timestamp
  ws.send(JSON.stringify({
    type: 'WS_CONNECTED',
    payload: {
      message: 'Connected to 4Walls Real-time Sync Server',
      clients: wss.clients.size,
      timestamp: new Date().toISOString()
    }
  }));

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message);
      if (parsed.type === 'PING') {
        ws.send(JSON.stringify({ type: 'PONG', timestamp: new Date().toISOString() }));
      }
    } catch (e) {
      // ignore non-json messages
    }
  });

  ws.on('close', () => {
    console.log(`[WebSocket] Client disconnected. Total clients: ${wss.clients.size}`);
  });

  ws.on('error', (err) => {
    console.error('[WebSocket Error]:', err.message);
  });
});

// JWT / Token Helper using native crypto
const JWT_SECRET = process.env.JWT_SECRET || '4walls_secure_admin_jwt_secret_token_2026';

function generateToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
  })).toString('base64url');
  
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');

  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, body, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');

  if (signature !== expectedSig) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch (e) {
    return null;
  }
}

// Authentication Middleware
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required. Missing token.' });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session. Please log in again.' });
  }

  req.admin = payload;
  next();
}

// Resend and Nodemailer Email Integration
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC ENDPOINTS
// ─────────────────────────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: '4Walls Full-Stack & Real-time WebSocket Server is Running',
    wsClients: wss.clients.size,
    emailDriver: resend ? 'Resend (HTTPS Port 443)' : 'Nodemailer (SMTP Port 465)'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    wsClients: wss.clients.size,
    emailDriver: resend ? 'Resend' : 'Nodemailer'
  });
});

// Properties Public API
app.get('/api/properties', (req, res) => {
  const data = Storage.getProperties();
  res.json({ success: true, data });
});

app.get('/api/properties/:building', (req, res) => {
  const data = Storage.getProperties();
  const bldg = decodeURIComponent(req.params.building);
  const items = data.properties[bldg] || [];
  res.json({ success: true, building: bldg, items });
});

// Interior Public API
app.get('/api/interior', (req, res) => {
  const data = Storage.getInterior();
  res.json({ success: true, data });
});

// Knowledge Centre Blogs Public API
app.get('/api/blogs', (req, res) => {
  const data = Storage.getBlogs();
  res.json({ success: true, data });
});

// Knowledge Centre Categories Public API
app.get('/api/categories', (req, res) => {
  const data = Storage.getCategories();
  res.json({ success: true, data });
});

app.get('/api/blogs/:id', (req, res) => {
  const data = Storage.getBlogs();
  const blog = data.find((b) => b.id === Number(req.params.id));
  if (!blog) {
    return res.status(404).json({ success: false, message: 'Blog not found' });
  }
  res.json({ success: true, data: blog });
});

// About Us & Leadership Public API
app.get('/api/about', (req, res) => {
  const data = Storage.getAbout();
  res.json({ success: true, data });
});

// Consultation / Lead Intake
app.post('/api/consultation', async (req, res) => {
  const { name, email, phone, interest, message } = req.body;
  const receiverEmail = process.env.RECEIVER_EMAIL || 'sales@4walls.co.in';

  // Save to database
  const savedLead = Storage.saveLead({ name, email, phone, interest, message });

  // Broadcast new lead event over WebSocket to Admin Dashboard
  broadcast('NEW_LEAD', savedLead);

  const emailText = `
New Consultation Lead Received from 4Walls Website:
---------------------------------------------------
Name: ${name || 'N/A'}
Email: ${email || 'N/A'}
Phone: ${phone || 'N/A'}
Interest: ${interest || 'General Inquiry'}

Message:
${message || 'N/A'}

Timestamp: ${new Date().toLocaleString()}
Lead ID: ${savedLead.id}
  `;

  try {
    const result = await sendEmail({
      to: receiverEmail,
      replyTo: email,
      subject: `New Lead: ${name || 'Client'} (${interest || 'Inquiry'})`,
      text: emailText
    });

    res.status(200).json({
      success: true,
      message: 'Consultation request received successfully.',
      leadId: savedLead.id,
      emailResult: result
    });
  } catch (error) {
    console.error('Server Consultation Error:', error);
    // Even if email fails, lead is saved in db
    res.status(200).json({
      success: true,
      message: 'Lead recorded successfully (email notification queued).',
      leadId: savedLead.id
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN AUTHENTICATION
// ─────────────────────────────────────────────────────────────────────────────

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  const configuredEmail = (process.env.ADMIN_EMAIL || 'info@4walls.co.in').trim().toLowerCase();
  const configuredPassword = process.env.ADMIN_PASSWORD || '4walls';

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
  }

  if (email.trim().toLowerCase() !== configuredEmail || password !== configuredPassword) {
    return res.status(401).json({ success: false, message: 'Invalid Admin credentials. Check your email and password.' });
  }

  const token = generateToken({ email: configuredEmail, role: 'admin' });
  res.json({
    success: true,
    message: 'Admin login successful.',
    token,
    user: {
      email: configuredEmail,
      role: 'admin'
    }
  });
});

app.get('/api/admin/verify', requireAdminAuth, (req, res) => {
  res.json({ success: true, user: req.admin });
});

app.get('/api/admin/stats', requireAdminAuth, (req, res) => {
  const propData = Storage.getProperties();
  let totalUnits = 0;
  Object.values(propData.properties || {}).forEach((arr) => {
    totalUnits += (arr || []).length;
  });

  const interiorItems = Storage.getInterior();
  const blogs = Storage.getBlogs();
  const leads = Storage.getLeads();

  res.json({
    success: true,
    stats: {
      buildingsCount: (propData.buildings || []).length,
      propertiesCount: totalUnits,
      interiorCount: interiorItems.length,
      blogsCount: blogs.length,
      leadsCount: leads.length,
      wsConnectedClients: wss.clients.size,
      serverUptime: Math.floor(process.uptime())
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// FILE UPLOAD (Images & Videos)
// ─────────────────────────────────────────────────────────────────────────────

app.post('/api/upload', requireAdminAuth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  const relativeUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: relativeUrl,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size
  });
});

// Multiple file upload
app.post('/api/upload-multiple', requireAdminAuth, upload.array('files', 15), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'No files uploaded.' });
  }

  const uploaded = req.files.map((file) => ({
    url: `/uploads/${file.filename}`,
    filename: file.filename,
    size: file.size
  }));

  res.json({
    success: true,
    files: uploaded
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN PROPERTIES CRUD
// ─────────────────────────────────────────────────────────────────────────────

// Add New Building
app.post('/api/admin/buildings', requireAdminAuth, (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: 'Building name is required.' });
  }

  const buildingName = name.trim();
  const data = Storage.getProperties();
  if (data.buildings.includes(buildingName)) {
    return res.status(400).json({ success: false, message: 'Building already exists.' });
  }

  data.buildings.push(buildingName);
  data.properties[buildingName] = data.properties[buildingName] || [];
  Storage.saveProperties(data);

  broadcast('PROPERTIES_UPDATED', data);

  res.json({ success: true, message: `Building "${buildingName}" added.`, data });
});

// Delete Building
app.delete('/api/admin/buildings/:building', requireAdminAuth, (req, res) => {
  const buildingName = decodeURIComponent(req.params.building);
  const data = Storage.getProperties();

  data.buildings = data.buildings.filter((b) => b !== buildingName);
  delete data.properties[buildingName];
  Storage.saveProperties(data);

  broadcast('PROPERTIES_UPDATED', data);

  res.json({ success: true, message: `Building "${buildingName}" deleted.`, data });
});

// Add New Property Unit
app.post('/api/admin/properties', requireAdminAuth, (req, res) => {
  const {
    building,
    name,
    folder,
    size,
    workstation,
    cabin,
    conferenceRoom,
    reception,
    pantry,
    carParking,
    rent,
    images
  } = req.body;

  if (!building || !name) {
    return res.status(400).json({ success: false, message: 'Building and property name are required.' });
  }

  const data = Storage.getProperties();
  if (!data.properties[building]) {
    data.properties[building] = [];
    if (!data.buildings.includes(building)) {
      data.buildings.push(building);
    }
  }

  const newProperty = {
    id: Date.now(),
    name: name || 'Office Space',
    folder: folder || '',
    size: size || '1000 sq.ft',
    workstation: Number(workstation) || 0,
    cabin: Number(cabin) || 0,
    conferenceRoom: conferenceRoom !== undefined ? conferenceRoom : 1,
    reception: reception || 'Yes',
    pantry: pantry || 'Yes',
    carParking: Number(carParking) || 1,
    rent: rent || 'On Request',
    images: Array.isArray(images) && images.length ? images : ['1.jpg']
  };

  data.properties[building].push(newProperty);
  Storage.saveProperties(data);

  broadcast('PROPERTIES_UPDATED', data);

  res.json({ success: true, message: 'Property added successfully.', property: newProperty, data });
});

// Update Property Unit
app.put('/api/admin/properties/:building/:id', requireAdminAuth, (req, res) => {
  const building = decodeURIComponent(req.params.building);
  const id = Number(req.params.id);
  const data = Storage.getProperties();

  if (!data.properties[building]) {
    return res.status(404).json({ success: false, message: 'Building not found.' });
  }

  const index = data.properties[building].findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Property not found.' });
  }

  data.properties[building][index] = {
    ...data.properties[building][index],
    ...req.body,
    id // keep id constant
  };

  Storage.saveProperties(data);
  broadcast('PROPERTIES_UPDATED', data);

  res.json({ success: true, message: 'Property updated successfully.', property: data.properties[building][index], data });
});

// Delete Property Unit
app.delete('/api/admin/properties/:building/:id', requireAdminAuth, (req, res) => {
  const building = decodeURIComponent(req.params.building);
  const id = Number(req.params.id);
  const data = Storage.getProperties();

  if (!data.properties[building]) {
    return res.status(404).json({ success: false, message: 'Building not found.' });
  }

  data.properties[building] = data.properties[building].filter((p) => p.id !== id);
  Storage.saveProperties(data);

  broadcast('PROPERTIES_UPDATED', data);

  res.json({ success: true, message: 'Property deleted successfully.', data });
});

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN INTERIOR DESIGN CRUD
// ─────────────────────────────────────────────────────────────────────────────

app.post('/api/admin/interior', requireAdminAuth, (req, res) => {
  const { path: assetPath, type, title } = req.body;
  if (!assetPath) {
    return res.status(400).json({ success: false, message: 'Asset path or URL is required.' });
  }

  const data = Storage.getInterior();
  const newItem = {
    id: Date.now(),
    path: assetPath,
    type: type || (assetPath.endsWith('.mp4') ? 'video' : 'image'),
    title: title || 'Modern Commercial Office Space'
  };

  data.unshift(newItem);
  Storage.saveInterior(data);

  broadcast('INTERIOR_UPDATED', data);

  res.json({ success: true, message: 'Interior item added successfully.', item: newItem, data });
});

app.put('/api/admin/interior/:id', requireAdminAuth, (req, res) => {
  const id = Number(req.params.id);
  const data = Storage.getInterior();

  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Interior item not found.' });
  }

  data[index] = {
    ...data[index],
    ...req.body,
    id
  };

  Storage.saveInterior(data);
  broadcast('INTERIOR_UPDATED', data);

  res.json({ success: true, message: 'Interior item updated successfully.', item: data[index], data });
});

app.delete('/api/admin/interior/:id', requireAdminAuth, (req, res) => {
  const id = Number(req.params.id);
  let data = Storage.getInterior();

  data = data.filter((item) => item.id !== id);
  Storage.saveInterior(data);

  broadcast('INTERIOR_UPDATED', data);

  res.json({ success: true, message: 'Interior item removed.', data });
});

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN BLOGS / KNOWLEDGE CENTRE CRUD
// ─────────────────────────────────────────────────────────────────────────────

app.post('/api/admin/blogs', requireAdminAuth, (req, res) => {
  const { title, cat, img, excerpt, content, readTime, author } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: 'Blog title is required.' });
  }

  const data = Storage.getBlogs();
  const newBlog = {
    id: Date.now(),
    title,
    cat: cat || 'Leasing',
    img: img || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: excerpt || title,
    content: content || excerpt || '',
    date: new Date().toISOString().split('T')[0],
    readTime: readTime || '5 min read',
    author: author || '4Walls Team'
  };

  data.unshift(newBlog);
  Storage.saveBlogs(data);

  if (newBlog.cat) {
    Storage.addCategory(newBlog.cat);
    broadcast('CATEGORIES_UPDATED', Storage.getCategories());
  }

  broadcast('BLOGS_UPDATED', data);

  res.json({ success: true, message: 'Blog post published.', blog: newBlog, data });
});

app.put('/api/admin/blogs/:id', requireAdminAuth, (req, res) => {
  const id = Number(req.params.id);
  const data = Storage.getBlogs();

  const index = data.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Blog post not found.' });
  }

  data[index] = {
    ...data[index],
    ...req.body,
    id
  };

  Storage.saveBlogs(data);

  if (data[index].cat) {
    Storage.addCategory(data[index].cat);
    broadcast('CATEGORIES_UPDATED', Storage.getCategories());
  }

  broadcast('BLOGS_UPDATED', data);

  res.json({ success: true, message: 'Blog post updated.', blog: data[index], data });
});

app.delete('/api/admin/blogs/:id', requireAdminAuth, (req, res) => {
  const id = Number(req.params.id);
  let data = Storage.getBlogs();

  data = data.filter((b) => b.id !== id);
  Storage.saveBlogs(data);

  broadcast('BLOGS_UPDATED', data);

  res.json({ success: true, message: 'Blog post deleted.', data });
});

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN KNOWLEDGE CENTRE CATEGORIES CRUD
// ─────────────────────────────────────────────────────────────────────────────

app.get('/api/admin/categories', requireAdminAuth, (req, res) => {
  const data = Storage.getCategories();
  res.json({ success: true, data });
});

app.post('/api/admin/categories', requireAdminAuth, (req, res) => {
  const { name } = req.body;
  const clean = String(name || '').trim();
  if (!clean) {
    return res.status(400).json({ success: false, message: 'Category name is required.' });
  }

  const updatedCats = Storage.addCategory(clean);
  broadcast('CATEGORIES_UPDATED', updatedCats);

  res.json({ success: true, message: `Category "${clean}" added successfully.`, data: updatedCats });
});

app.delete('/api/admin/categories/:name', requireAdminAuth, (req, res) => {
  const name = decodeURIComponent(req.params.name).trim();
  const updatedCats = Storage.deleteCategory(name);
  broadcast('CATEGORIES_UPDATED', updatedCats);

  res.json({ success: true, message: `Category "${name}" removed.`, data: updatedCats });
});

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN ABOUT US & LEADERSHIP CRUD
// ─────────────────────────────────────────────────────────────────────────────

app.get('/api/admin/about', requireAdminAuth, (req, res) => {
  const data = Storage.getAbout();
  res.json({ success: true, data });
});

app.put('/api/admin/about', requireAdminAuth, (req, res) => {
  const currentData = Storage.getAbout();
  const updatedData = {
    ...currentData,
    ...req.body
  };

  Storage.saveAbout(updatedData);
  broadcast('ABOUT_UPDATED', updatedData);

  res.json({ success: true, message: 'About section updated successfully.', data: updatedData });
});

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN LEADS & INQUIRIES
// ─────────────────────────────────────────────────────────────────────────────

app.get('/api/admin/leads', requireAdminAuth, (req, res) => {
  const leads = Storage.getLeads();
  res.json({ success: true, data: leads });
});

app.put('/api/admin/leads/:id/status', requireAdminAuth, (req, res) => {
  const { status } = req.body;
  const updated = Storage.updateLeadStatus(req.params.id, status || 'Contacted');
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Lead not found.' });
  }
  broadcast('LEAD_STATUS_CHANGED', updated);
  res.json({ success: true, lead: updated });
});

app.delete('/api/admin/leads/:id', requireAdminAuth, (req, res) => {
  Storage.deleteLead(req.params.id);
  res.json({ success: true, message: 'Lead removed.' });
});

// Start Server
server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`4Walls Backend & WebSocket Server active on Port ${PORT}`);
  console.log(`WebSocket Server listening on ws://localhost:${PORT}`);
  console.log(`Email driver: ${resend ? 'Resend (HTTPS Port 443)' : 'Nodemailer (SMTP Port 465)'}`);
  console.log(`Admin ID: ${process.env.ADMIN_EMAIL || 'info@4walls.co.in'}`);
  console.log(`====================================================`);
});
