// js/apiService.js

const API_GENERATE = "/api/generate";
const API_IMAGE = "/api/image";

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
    return JSON.parse(data.candidates[0].content.parts[0].text);
}

// Generates the image or loads the pinned URL
export async function projectVisual(prompt, stratum, addLogCallback, pinnedViewUrl = null) {
    const loader = document.getElementById('visual-loading');
    const buffer = document.getElementById('visual-buffer');
    const img = document.getElementById('visual-image');
    
    if(!loader || !buffer || !img) return null;

    buffer.style.display = 'block';
    loader.classList.remove('hidden');
    img.style.display = 'none';

    // If an Architect has pinned a view for this room, skip AI entirely!
    if (pinnedViewUrl) {
        img.src = pinnedViewUrl;
        img.style.display = 'block';
        loader.classList.add('hidden');
        if (addLogCallback) addLogCallback(`[SYSTEM]: Retrieving Architect-pinned memory for this sector...`, "var(--term-green)");
        return null; 
    }

    const styledPrompt = `Lofi glitch terminal art: ${prompt}. ${stratum} stratum aesthetic`;

    try {
        const res = await fetch(API_IMAGE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ instances: [{ prompt: styledPrompt }] })
        });
        
        if (!res.ok) throw new Error(`Image API returned status ${res.status}`);

        const data = await res.json();
        if (data.predictions && data.predictions[0]) {
            const b64 = data.predictions[0].bytesBase64Encoded;
            img.src = `data:image/png;base64,${b64}`;
            img.style.display = 'block';
            if (addLogCallback) addLogCallback(`VISUAL BUFFER PULSED.`, "var(--term-amber)");
            return b64; 
        }
    } catch (e) { 
        console.error("Image Projection Error:", e);
        if (addLogCallback) addLogCallback("VISUAL BUFFER ERROR", "var(--term-red)"); 
    }
    finally { 
        loader.classList.add('hidden'); 
    }
    return null;
}

export async function generatePortrait(prompt, stratum) {
    const combinedPrompt = `Highly detailed character portrait, ${stratum} aesthetic, Magic the Gathering card art style: ${prompt}`;
    try {
        const res = await fetch(API_IMAGE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ instances: [{ prompt: combinedPrompt }] })
        });
        
        if (!res.ok) throw new Error(`Image API returned status ${res.status}`);

        const data = await res.json();
        if (data.predictions && data.predictions[0]) {
            return data.predictions[0].bytesBase64Encoded;
        }
    } catch (e) { 
        console.error("Portrait Generation Error:", e);
    }
    return null;
}

// STRIPE - FIREBASE INTEGRATION FOR ARCHITECT MODE ACTIVATION
// --- TERRA AGNOSTUM - STRIPE + FIREBASE MONETIZATION LOGIC ---

// 1. We require Firebase Auth to access the UID.
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

// --- THE VITAL CONFIGURATION ---
// PASTE THE REAL, LIVE STRIPE BUY LINK YOU JUST FOUND.
// It MUST look like https://buy.stripe.com/Sk_live... 
// NOT buy.stripe.com/test_... !
const LIVE_STRIPE_PAYMENT_LINK = "https://buy.stripe.com/Sk_live_PASTE_THE_KEY_YOU_FOUND"; 

// --- The Listener: The moment the user logs in, we rewrite the world ---
onAuthStateChanged(auth, (user) => {
  
  // Find the HTML link we created in Step 1.
  const becomeArchitectLink = document.getElementById("become-architect-link");
  const hudStatus = document.getElementById("hud-status");

  if (user) {
    // A. User is signed in. Grab their UNIQUE Firebase UID.
    const firebaseUid = user.uid;
    console.log(`[HUD] Authorized User Detected. UID: ${firebaseUid}`);

    // B. The Magic: Construct the personalized Payment URL.
    // We add 'client_reference_id' as a query parameter.
    // This is what Stripe sends back to our Vercel function to automate activation.
    const personalizedPaymentUrl = `${LIVE_STRIPE_PAYMENT_LINK}?client_reference_id=${firebaseUid}`;

    // C. The Payoff: Update and show the "[ BECOME_ARCHITECT ]" link.
    becomeArchitectLink.setAttribute("href", personalizedPaymentUrl); // Set the URL
    becomeArchitectLink.textContent = "[ BECOME_ARCHITECT ]"; // Set text (if it was different)
    becomeArchitectLink.style.display = "inline"; // Show the button!
    
    // Update the status console.
    hudStatus.textContent = `// USER://_VOID/${firebaseUid.substring(0,6)} // AUTHENTICATED //`;

  } else {
    // User is signed out. (The [ BECOME_ARCHITECT ] link stays hidden).
    // The HUD should probably just show 'AUTHENTICATION_REQUIRED'.
    becomeArchitectLink.style.display = "none";
    hudStatus.textContent = "// UNKNOWN_ENTITY // LOGIN_REQUIRED //";
  }
});