const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Serve static site files from project root (index.html)
app.use(express.static(path.join(__dirname)));

// Basic rate limiting in-memory (small sites only)
const recent = new Map();
function rateLimit(ip){
  const now = Date.now();
  const last = recent.get(ip) || 0;
  if(now - last < 3000) return false; // 3s between submissions
  recent.set(ip, now);
  return true;
}

app.post('/contact', async (req, res) => {
  try {
    const ip = req.ip;
    if(!rateLimit(ip)) return res.status(429).json({ ok: false, error: 'Too many requests' });

    const { name, email, message } = req.body || {};
    if(!name || !email || !message) return res.status(400).json({ ok: false, error: 'Missing fields' });

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toAddress = process.env.TO_ADDRESS;

    if(!smtpHost || !smtpUser || !smtpPass || !toAddress){
      return res.status(500).json({ ok: false, error: 'Server not configured' });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: smtpUser, pass: smtpPass }
    });

    const mail = {
      from: `Website Contact <${smtpUser}>`,
      to: toAddress,
      subject: `New message from portfolio: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g,'<br>')}</p>`
    };

    await transporter.sendMail(mail);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Failed to send' });
  }
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));