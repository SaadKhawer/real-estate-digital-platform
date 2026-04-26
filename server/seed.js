import { initDb } from './database.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  try {
    const db = await initDb();
    
    // Check if properties already exist
    const count = await db.get('SELECT COUNT(*) as count FROM properties');
    if (count.count > 0) {
      console.log('Database already seeded with properties.');
      return;
    }

    // Read mockData.js as a string and extract the array
    const mockDataPath = path.join(__dirname, '../src/data/mockData.js');
    let mockDataContent = await fs.readFile(mockDataPath, 'utf8');
    
    // Very simple extraction: remove "export const properties = " and trailing ";"
    mockDataContent = mockDataContent.replace('export const properties = ', '').trim();
    if (mockDataContent.endsWith(';')) {
      mockDataContent = mockDataContent.slice(0, -1);
    }
    
    // We need to parse JS object, not strict JSON. Let's use eval safely or new Function
    // Since it's our own local file, new Function is fine.
    const properties = new Function(`return ${mockDataContent}`)();

    console.log(`Seeding ${properties.length} properties...`);

    const stmt = await db.prepare(`
      INSERT INTO properties (
        title, location, price, period, bedrooms, bathrooms, area, type, propertyType, image, description, isVerified
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of properties) {
      await stmt.run(
        p.title,
        p.location,
        p.price,
        p.period || null,
        p.bedrooms,
        p.bathrooms,
        p.area,
        p.type,
        p.propertyType,
        p.image,
        p.description,
        p.isVerified ? 1 : 0
      );
    }
    await stmt.finalize();

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();
