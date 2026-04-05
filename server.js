const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

app.use(express.json());

// Basic request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${req.ip}`);
  next();
});

app.use(express.static(path.join(__dirname)));

// Global error handlers
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, '[]', 'utf8');
}

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
  }

  const sanitized = {
    name: String(name).trim(),
    email: String(email).trim(),
    subject: String(subject || '').trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString()
  };

  try {
    ensureDataFile();
    const existing = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8') || '[]');
    existing.push(sanitized);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existing, null, 2), 'utf8');
    console.log('New message saved:', sanitized);
    return res.json({ success: true, message: 'Message received. Thank you!' });
  } catch (err) {
    console.error('Failed to save message:', err);
    return res.status(500).json({ success: false, message: 'Failed to save message.' });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server failed to start:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Make sure no other process is using this port.`);
  }
});