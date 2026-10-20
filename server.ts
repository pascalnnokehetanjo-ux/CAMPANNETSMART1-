import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));

  const PORT = process.env.PORT || 3000;

  // Gemini API OCR / Marks extraction endpoint
  app.post('/api/ocr-marksheet', async (req, res) => {
    try {
      const { imageBase64, mimeType } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Return simulated mock extracted data if API key is not configured
        return res.json({
          success: true,
          mock: true,
          message: 'Using offline mock OCR extraction (API key not configured).',
          data: {
            className: 'Class 6 / CM2 Bilingual',
            term: 'Term 1',
            month: 'October',
            students: [
              { name: 'Amina Bello', id: 'CAMP-2026-001', scores: { '1A': { oral: 8, written: 14, practical: 4, attitude: 4 }, '1B': { oral: 7, written: 13, practical: 3, attitude: 4 }, '1C': { oral: 9, written: 15, practical: 4, attitude: 5 }, '2A': { oral: 8, written: 16, practical: 4, attitude: 4 }, '2B': { oral: 7, written: 12, practical: 4, attitude: 3 }, '3A': { oral: 8, written: 14, practical: 4, attitude: 4 }, '3B': { oral: 9, written: 15, practical: 4, attitude: 4 }, '4A': { oral: 8, written: 13, practical: 4, attitude: 4 }, '4B': { oral: 7, written: 14, practical: 3, attitude: 4 }, '5': { oral: 9, written: 17, practical: 4, attitude: 5 }, '6A1': { oral: 9, written: 16, practical: 5, attitude: 5 }, '6A2': { oral: 0, written: 0, practical: 0, attitude: 0 }, '6B': { oral: 8, written: 15, practical: 4, attitude: 4 } } },
              { name: 'Jean-Pierre Kamga', id: 'CAMP-2026-002', scores: { '1A': { oral: 7, written: 12, practical: 3, attitude: 3 }, '1B': { oral: 9, written: 16, practical: 4, attitude: 5 }, '1C': { oral: 8, written: 13, practical: 3, attitude: 4 }, '2A': { oral: 9, written: 17, practical: 4, attitude: 5 }, '2B': { oral: 8, written: 14, practical: 4, attitude: 4 }, '3A': { oral: 7, written: 12, practical: 3, attitude: 3 }, '3B': { oral: 8, written: 13, practical: 3, attitude: 4 }, '4A': { oral: 9, written: 15, practical: 4, attitude: 4 }, '4B': { oral: 8, written: 14, practical: 4, attitude: 4 }, '5': { oral: 8, written: 15, practical: 4, attitude: 4 }, '6A1': { oral: 8, written: 15, practical: 4, attitude: 4 }, '6A2': { oral: 0, written: 0, practical: 0, attitude: 0 }, '6B': { oral: 9, written: 16, practical: 4, attitude: 5 } } },
              { name: 'Fatimatou Garba', id: 'CAMP-2026-003', scores: { '1A': { oral: 9, written: 18, practical: 5, attitude: 5 }, '1B': { oral: 8, written: 15, practical: 4, attitude: 4 }, '1C': { oral: 10, written: 18, practical: 5, attitude: 5 }, '2A': { oral: 10, written: 19, practical: 5, attitude: 5 }, '2B': { oral: 9, written: 17, practical: 5, attitude: 5 }, '3A': { oral: 9, written: 16, practical: 4, attitude: 5 }, '3B': { oral: 9, written: 17, practical: 5, attitude: 5 }, '4A': { oral: 9, written: 16, practical: 4, attitude: 4 }, '4B': { oral: 9, written: 17, practical: 5, attitude: 5 }, '5': { oral: 10, written: 19, practical: 5, attitude: 5 }, '6A1': { oral: 10, written: 18, practical: 5, attitude: 5 }, '6A2': { oral: 0, written: 0, practical: 0, attitude: 0 }, '6B': { oral: 10, written: 19, practical: 5, attitude: 5 } } }
            ]
          }
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType || 'image/jpeg'
            }
          },
          {
            text: `You are an expert OCR and data extraction assistant for CAMPANNETSMART1, specialized in the 2018 Cameroon official Competence-Based Curriculum marksheets.
Analyze this marksheet image and extract students, their IDs, and scores for the following subjects/sub-subjects based on the 6 competencies:
- 1A: Communicate in English (oral, written, practical, attitude)
- 1B: Communicate in French (oral, written, practical, attitude)
- 1C: Communicate in one National language (oral, written, practical, attitude)
- 2A: Use Basic notions in Mathematics (oral, written, practical, attitude)
- 2B: Use Basic notions in Science and Technology (oral, written, practical, attitude)
- 3A: Practice Social Values (oral, written, practical, attitude)
- 3B: Practice Citizenship Values (oral, written, practical, attitude)
- 4A: Vocational Studies (oral, written, practical, attitude)
- 4B: Entrepreneurship (oral, written, practical, attitude)
- 5: ICT (oral, written, practical, attitude)
- 6A1: Physical and Sports (non-challenged) (oral, written, practical, attitude)
- 6A2: Physical and Sports (challenged)
- 6B: Artistic activities (oral, written, practical, attitude)

Return ONLY valid JSON matching this structure:
{
  "className": "string",
  "term": "string",
  "month": "string",
  "students": [
    {
      "name": "string",
      "id": "string",
      "scores": {
        "1A": { "oral": number, "written": number, "practical": number, "attitude": number },
        ...
      }
    }
  ]
}`
          }
        ]
      });

      let textResult = response.text || '';
      // Clean markdown code blocks if present
      textResult = textResult.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(textResult);

      return res.json({ success: true, mock: false, data: parsedData });
    } catch (error: any) {
      console.error('OCR Extraction error:', error);
      return res.status(500).json({ success: false, error: error.message || 'Failed to process marksheet image.' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`CAMPANNETSMART1 server running on http://0.0.0.0:${PORT}`);
  });
}

createServer();
