// js/apiService.js

// Import configurations or define them here if they are shared
const API_GENERATE = "/api/generate";
const API_IMAGE = "/api/image";

// Helper function to compress images
export async function compressImage(base64Str, maxWidth = 400, quality = 0.7) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => resolve(base64Str); 
        img.src = base64Str;
    });
}

// Function to call the Gemini API
export async function callGemini(userInput, systemPrompt) {
    const res = await fetch(API_GENERATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: userInput }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: "application/json" }
        })
    });
    
    if (!res.ok) {
         // Try to parse the error response
        let errorMessage = "Unknown API Error";
        try {
            const errorData = await res.json();
            errorMessage = errorData.error?.message || JSON.stringify(errorData);
        } catch (e) {
             errorMessage = `HTTP Error ${res.status}: ${res.statusText}`;
        }
        throw new Error(`Gemini API Error: ${errorMessage}`);
    }

    const data = await res.json();
    
    // Safety check to ensure the structure exists before trying to parse it
    if (!data || !data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
         throw new Error("Invalid response format from Gemini API");
    }

    return JSON.parse(data.candidates[0].content.parts[0].text);
}

// Function to generate and project a visual
export async function projectVisual(prompt, stratum, addLogCallback) {
    const loader = document.getElementById('visual-loading');
    const buffer = document.getElementById('visual-buffer');
    const img = document.getElementById('visual-image');
    
    if(!loader || !buffer || !img) {
        console.error("Visual elements not found in the DOM.");
        return;
    }

    buffer.style.display = 'block';
    loader.classList.remove('hidden');
    img.style.display = 'none';

    const styledPrompt = `Lofi glitch terminal art: ${prompt}, ${stratum} stratum aesthetic`;

    try {
        const res = await fetch(API_IMAGE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ instances: [{ prompt: styledPrompt }] })
        });
        
        if (!res.ok) {
            throw new Error(`Image API returned status ${res.status}`);
        }

        const data = await res.json();
        if (data.predictions && data.predictions[0]) {
            img.src = `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
            img.style.display = 'block';
            if (addLogCallback) addLogCallback("VISUAL BUFFER PULSED.", "var(--term-amber)");
        } else {
             throw new Error("No image data returned from API.");
        }
    } catch (e) { 
        console.error("Image Projection Error:", e);
        if (addLogCallback) addLogCallback("VISUAL BUFFER ERROR", "var(--term-red)"); 
    }
    finally { 
        loader.classList.add('hidden'); 
    }
}
