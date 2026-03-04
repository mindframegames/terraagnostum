import dotenv from 'dotenv';
// Vercel local env workaround: Load .env.local only in development, and use the appropriate variable in production
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.local' });
}
// Now use a generic variable name that works in both places
const WEBHOOK_SECRET = process.env.NODE_ENV === 'production' 
  ? process.env.STRIPE_WEBHOOK_SECRET_LIVE 
  : process.env.STRIPE_WEBHOOK_SECRET_LOCAL;

import stripeLib from 'stripe';
import admin from 'firebase-admin';
import { buffer } from 'micro';

// Vercel needs this to stay as-is
export const config = {
  api: { bodyParser: false },
};

// Defensive Environment Loading (Trims quotes/spaces)
const getEnv = (key) => (process.env[key] || '').replace(/^["']|["']$/g, '').trim();

const STRIPE_SECRET = getEnv('STRIPE_SECRET_KEY_LIVE');
//const WEBHOOK_SECRET = getEnv('STRIPE_WEBHOOK_SECRET_LIVE');

console.log("[ENV DEBUG] Available Stripe Keys:", Object.keys(process.env).filter(k => k.includes('STRIPE')));

//console.log("=== THE MOTHERLOAD ENV DUMP ===");
//console.log(process.env);
//console.log("===============================");
//const WEBHOOK_SECRET = getEnv('STRIPE_WEBHOOK_SECRET_LOCAL'); // || getEnv('STRIPE_WEBHOOK_SECRET_LIVE'); 
//const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET_LOCAL;

console.log("[FORCE DEBUG] Secret loaded:", WEBHOOK_SECRET ? "YES" : "NO");

const stripe = stripeLib(STRIPE_SECRET);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: getEnv('FIREBASE_PROJECT_ID'),
      clientEmail: getEnv('FIREBASE_CLIENT_EMAIL'),
      privateKey: getEnv('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  // DEBUG LOGS (Check these in your Vercel terminal)
  console.log(`[Webhook] Body Received. Length: ${buf.length} bytes`);
  console.log(`[Webhook] Secret starts with: ${WEBHOOK_SECRET.substring(0, 10)}...`);

  let event;
  try {
    // We use the cleaned WEBHOOK_SECRET here
    event = stripe.webhooks.constructEvent(buf, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error(`[Webhook Error] Signature Failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const firebaseUid = session.client_reference_id;

    if (firebaseUid) {
      console.log(`[Webhook Succeeded] Activating Architect Mode for UID: ${firebaseUid}`);
      const appId = getEnv('VITE_APP_ID') || 'terra-agnostum-shared'; 
      const playerRef = db.doc(`artifacts/${appId}/users/${firebaseUid}/state/player`);
      
      await playerRef.set({
        isArchitect: true,
        architectActivatedAt: admin.firestore.FieldValue.serverTimestamp(),
        stripeCustomerId: session.customer,
      }, { merge: true });
      
      console.log(`[Firestore Updated] UID: ${firebaseUid} is now an ARCHITECT.`);
    }
  }

  res.json({ received: true });
}