import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import { initDb } from './database.js';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = process.env.PORT || 5006;

app.use(cors());
app.use(express.json());

let db;
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

// Initialize db and start server
async function startServer() {
  db = await initDb();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Authentication Routes
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const existingUser = await db.get('SELECT id FROM users WHERE email = ?', email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const result = await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
    res.status(201).json({ success: true, user: { id: result.lastID, name, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await db.get('SELECT id, name, email FROM users WHERE email = ? AND password = ?', [email, password]);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Properties Routes
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await db.all('SELECT * FROM properties');
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await db.get('SELECT * FROM properties WHERE id = ?', req.params.id);
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Favorites Routes
app.get('/api/user/:userId/favorites', async (req, res) => {
  try {
    const favorites = await db.all('SELECT propertyId FROM favorites WHERE userId = ?', req.params.userId);
    res.json(favorites.map(f => f.propertyId));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/user/:userId/favorites', async (req, res) => {
  const { propertyId } = req.body;
  try {
    await db.run('INSERT OR IGNORE INTO favorites (userId, propertyId) VALUES (?, ?)', [req.params.userId, propertyId]);
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/user/:userId/favorites/:propertyId', async (req, res) => {
  try {
    await db.run('DELETE FROM favorites WHERE userId = ? AND propertyId = ?', [req.params.userId, req.params.propertyId]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Comparisons Routes
app.get('/api/user/:userId/compare', async (req, res) => {
  try {
    const comparisons = await db.all('SELECT propertyId FROM comparisons WHERE userId = ?', req.params.userId);
    res.json(comparisons.map(c => c.propertyId));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/user/:userId/compare', async (req, res) => {
  const { propertyId } = req.body;
  try {
    await db.run('INSERT OR IGNORE INTO comparisons (userId, propertyId) VALUES (?, ?)', [req.params.userId, propertyId]);
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/user/:userId/compare/:propertyId', async (req, res) => {
  try {
    await db.run('DELETE FROM comparisons WHERE userId = ? AND propertyId = ?', [req.params.userId, req.params.propertyId]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reviews Routes
app.get('/api/properties/:id/reviews', async (req, res) => {
  try {
    const reviews = await db.all(`
      SELECT reviews.*, users.name as userName 
      FROM reviews 
      JOIN users ON reviews.userId = users.id 
      WHERE propertyId = ?
      ORDER BY createdAt DESC
    `, parseInt(req.params.id, 10));
    res.json(reviews);
  } catch (err) {
    console.error("GET Reviews Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/properties/:id/reviews', async (req, res) => {
  const { userId, rating, comment } = req.body;
  try {
    await db.run(
      'INSERT INTO reviews (propertyId, userId, rating, comment) VALUES (?, ?, ?, ?)',
      [parseInt(req.params.id, 10), parseInt(userId, 10), parseInt(rating, 10), comment]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("POST Review Error:", err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Contact / Inquiry Route
app.post('/api/contact', async (req, res) => {
  const { propertyId, userId, name, email, message } = req.body;
  try {
    await db.run(
      'INSERT INTO inquiries (propertyId, userId, name, email, message) VALUES (?, ?, ?, ?, ?)',
      [parseInt(propertyId, 10), userId ? parseInt(userId, 10) : null, name, email, message]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("POST Contact Error:", err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Chatbot Route
app.post('/api/chat', async (req, res) => {
  if (!ai) {
    return res.status(500).json({ message: "Gemini API key is missing. Please add it to server/.env" });
  }

  const { history } = req.body; // Array of { role: 'user' | 'model', content: '...' }

  try {
    // 1. Fetch properties for RAG Context
    const properties = await db.all('SELECT * FROM properties');
    const propertyContext = properties.map(p => 
      `- ${p.title} (${p.type}) in ${p.location} for $${p.price}. Beds: ${p.bedrooms}, Baths: ${p.bathrooms}.`
    ).join('\n');

    // 2. Format history for Google Gen AI SDK
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'bot' || msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // 3. System Instruction
    const systemInstruction = `You are Aura, an elite AI real estate assistant.
You help users find their dream homes. Be concise, friendly, and highly professional.
Here is the live database of properties we currently have available:
${propertyContext}

Only recommend properties from this list. If the user asks for something we don't have, politely inform them and suggest the closest alternative. Always quote the actual prices and details from the list.`;

    // 4. Generate Content
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedHistory,
      config: {
        systemInstruction,
        temperature: 0.5
      }
    });

    res.json({ text: response.text });
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ message: 'Error generating AI response.' });
  }
});

startServer();
