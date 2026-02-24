/**
 * Vercel Serverless Function
 * Path: /api/generate.js
 * Purpose: The AI Game Master (Tandy) brain, augmented with the Akashic Record (RAG) 
 * and the Core Bible (Anchor), specifically built for Gemini 1.5 Flash.
 */
import fs from 'fs';
import path from 'path';

// --- THE ANCHOR ENGINE (ALWAYS INCLUDED) ---
// This reads the central 'core_bible.md' for unbreakable universe rules.
function fetchAnchorLore() {
    try {
        const anchorPath = path.join(process.cwd(), 'lore/vault/lore/core_bible.md');
        if (fs.existsSync(anchorPath)) {
            const anchorText = fs.readFileSync(anchorPath, 'utf8');
            return `\n\n[CORE UNIVERSE BIBLE - ALWAYS ADHERE TO THESE RULES]:\n"${anchorText}"\n`;
        }
    } catch (e) {
        console.error("Anchor Fetch Error:", e);
    }
    return "";
}

// --- THE ZERO-DB RAG ENGINE (DYNAMICALLY INCLUDED) ---
// Chunks the vault and finds relevant lore based on user input.
function fetchRelevantLore(userCommand) {
    if (!userCommand) return "";
    try {
        const paths = [
            path.join(process.cwd(), 'lore/vault/lore/Psychotasy_I.md'),
            path.join(process.cwd(), 'lore/vault/lore/Interregnum.md'),
            path.join(process.cwd(), 'lore/vault/lore/The_Coast.md')
        ];

        let combinedText = "";
        paths.forEach(p => {
            if (fs.existsSync(p)) combinedText += fs.readFileSync(p, 'utf8') + "\n\n";
        });

        if (!combinedText) return "";

        const chunks = combinedText.split('\n\n').filter(chunk => chunk.length > 50);
        const searchTerms = userCommand.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3);
        
        if (searchTerms.length === 0) return "";

        let bestChunks = [];
        for (const chunk of chunks) {
            let score = 0;
            const chunkLower = chunk.toLowerCase();
            for (const term of searchTerms) {
                if (chunkLower.includes(term)) score++;
            }
            // Logic weighting for core concepts
            if (chunkLower.includes('technate') && userCommand.toLowerCase().includes('technate')) score += 3;
            if (chunkLower.includes('faen') && userCommand.toLowerCase().includes('faen')) score += 3;
            
            if (score > 0) bestChunks.push({ score, text: chunk });
        }

        bestChunks.sort((a, b) => b.score - a.score);
        const topLore = bestChunks.slice(0, 2).map(c => c.text).join('\n\n');

        return topLore ? `\n\n[SITUATIONAL CANON CONTEXT]:\n"${topLore}"\n(Incorporate these facts naturally.)` : "";
    } catch (e) {
        console.error("RAG Error:", e);
        return "";
    }
}

// --- MAIN HANDLER ---
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const body = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
        }

        // 1. EXTRACT DATA FROM THE CLIENT'S GEMINI PAYLOAD
        let systemPrompt = body.systemInstruction?.parts?.[0]?.text || "";
        let userMessage = body.contents?.[body.contents.length - 1]?.parts?.[0]?.text || "";

        // 2. AUGMENT WITH LORE
        const anchorLore = fetchAnchorLore();
        const dynamicLore = fetchRelevantLore(userMessage);
        const finalSystemPrompt = systemPrompt + anchorLore + dynamicLore;

        // 3. REBUILD PAYLOAD FOR GOOGLE
        const geminiPayload = {
            contents: body.contents,
            systemInstruction: {
                parts: [{ text: finalSystemPrompt }]
            },
            generationConfig: body.generationConfig || {
                temperature: 0.7,
                maxOutputTokens: 800
            }
        };

        // 4. FORWARD TO GOOGLE
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(geminiPayload)
        });

        const data = await response.json();

        // 5. RETURN RAW GEMINI FORMAT (Crucial for client-side parsing)
        return res.status(response.status).json(data);

    } catch (error) {
        console.error("Generate API Error:", error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
