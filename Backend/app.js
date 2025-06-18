const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://rajsin2002:Rajan2002@cluster0.jysvyk3.mongodb.net/')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// Gemini AI setup
const genAI = new GoogleGenerativeAI("AIzaSyBQbNNJaxhTkF8O66rd9IiBQtQuiuqWsqs");

// Auth Routes
app.use('/auth', authRoutes);

// AI Chat Route
app.post('/getResponse', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Missing question' });

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(question);
    const text = await result.response.text();
    res.status(200).json({ response: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

module.exports = app;
