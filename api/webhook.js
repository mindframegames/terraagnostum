// --- api/webhook.js (Vercel Serverless Function) ---
import stripeLib from 'stripe';
import admin from 'firebase-admin';

// 1. Initialize Stripe
const stripe = stripeLib(process.env.STRIPE_SECRET_KEY_LIVE);

// 2. Initialize Firebase Admin (Only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Handle newline characters in Vercel env vars
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

// 3. The Function Handler
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // A. Verify Webhook Signature (Security Check)
  // Ensures this actually came from Stripe and hasn't been tampered with.
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // You'll get this secret from the Stripe Dashboard in the next phase.
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET_LIVE);
  } catch (err) {
    console.error(`[Webhook Error] Signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // B. Handle the Specific Event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // C. Extract the vital UID we passed from the frontend
    const firebaseUid = session.client_reference_id;

    if (firebaseUid) {
      console.log(`[Webhook Succeeded] Activating Architect Mode for UID: ${firebaseUid}`);

      // D. Update Firestore (The Automation)
      try {
        await db.collection('users').doc(firebaseUid).update({
          is_architect: true,
          architect_activated_at: admin.firestore.FieldValue.serverTimestamp(),
          stripe_customer_id: session.customer, // Good for future support
        });
        
        console.log(`[Firestore Updated] UID: ${firebaseUid} is now an ARCHITECT.`);
      } catch (dbErr) {
        console.error(`[Firestore Error] Failed to update UID ${firebaseUid}: ${dbErr.message}`);
        // Return 500 so Stripe retries the webhook later.
        return res.status(500).json({ error: 'Database update failed' });
      }
    } else {
      console.warn('[Webhook Warning] checkout.session.completed received, but no client_reference_id (UID) found.');
    }
  }

  // E. Return 200 to Stripe (Vital)
  // Tells Stripe you received the event and they can stop retrying.
  res.json({ received: true });
}

// Helper function to read the raw request body (needed for signature verification)
import { buffer } from 'micro';
export const config = {
  api: {
    bodyParser: false, // Disables Vercel's default parser so we get raw body.
  },
};