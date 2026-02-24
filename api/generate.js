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
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'Missing GEMINI_API_KEY environment variable.' });
        }

        const body = req.body;
        
        // 1. EXTRACT USER MESSAGE FOR RAG
        // Your index.html sends contents: [{ role: "user", parts: [{ text: userInput }] }]
        const userMessage = body.contents?.[body.contents.length - 1]?.parts?.[0]?.text || "";

        // 2. FETCH LORE
        const anchorLore = fetchAnchorLore();
        const dynamicLore = fetchRelevantLore(userMessage);

        // 3. AUGMENT SYSTEM INSTRUCTION
        // index.html sends systemInstruction: { parts: [{ text: systemPrompt }] }
        let originalSystemPrompt = body.systemInstruction?.parts?.[0]?.text || "";
        const finalSystemPrompt = originalSystemPrompt + anchorLore + dynamicLore;

        // 4. CONSTRUCT THE FORWARDED PAYLOAD
        // We must ensure the structure is exactly what Gemini v1beta expects.
        const geminiPayload = {
            contents: body.contents,
            systemInstruction: {
                parts: [{ text: finalSystemPrompt }]
            },
            generationConfig: body.generationConfig || {
                temperature: 0.7,
                maxOutputTokens: 1000,
                responseMimeType: "application/json"
            }
        };

        // 5. CALL THE SOURCE
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(geminiPayload)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error Response:", JSON.stringify(data, null, 2));
            // Return a mock success structure so index.html doesn't crash on candidates[0]
            return res.status(response.status).json({
                ...data,
                candidates: data.candidates || [{ content: { parts: [{ text: JSON.stringify({ speaker: "SYSTEM", narrative: "The Source is currently unstable. Try again.", color: "var(--term-red)" }) }] } }]
            });
        }

        // 6. RETURN DATA TO CLIENT
        return res.status(200).json(data);

    } catch (error) {
        console.error("Critical Generate API Error:", error);
        return res.status(500).json({ 
            error: 'Internal Server Error', 
            details: error.message,
            candidates: [{ content: { parts: [{ text: JSON.stringify({ speaker: "SYSTEM", narrative: "Critical link failure: " + error.message, color: "var(--term-red)" }) }] } }]
        });
    }
}
