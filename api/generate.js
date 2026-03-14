/**
 * Vercel Serverless Function
 * Path: /api/generate.js
 * Purpose: The AI Game Master (Tandy) brain. 
 * Optimized for gemini-2.5-flash-lite on v1beta.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY; 
  if (!apiKey) {
    return res.status(500).json({ error: 'Technate Secret Key (GEMINI_API_KEY) missing.' });
  }

  try {
    const body = req.body;

    // 1. EXTRACT DATA FOR LORE INJECTION
    let systemPrompt = body.systemInstruction?.parts?.[0]?.text || "";

    // 2. Intent Detection
    // Note: We used to inject CONDENSED_LORE here, but lore is now centralized 
    // in the client-side contextEngine.js and passed in via systemPrompt.
    let finalSystemPrompt = systemPrompt;

    // 4. REBUILD PAYLOAD
    const geminiPayload = {
        ...body,
        systemInstruction: {
            parts: [{ text: finalSystemPrompt }]
        }
    };

    // 5. CALL THE SOURCE
    const model = "gemini-3.1-flash-lite-preview";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    console.log("generate.js sending payload: ", JSON.stringify(geminiPayload, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload) 
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("LOG: Source API Error:", JSON.stringify(data, null, 2));
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("LOG: Proxy execution error:", error);
    return res.status(500).json({ 
        error: 'Failed to establish link with the Source.',
        candidates: [{ content: { parts: [{ text: "{\"speaker\":\"SYSTEM\",\"narrative\":\"Link Fragmented. Error: " + error.message + "\"}" }] } }]
    });
  }
}
