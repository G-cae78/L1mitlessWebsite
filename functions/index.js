import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import { logger } from "firebase-functions/v2";
import admin from "firebase-admin";
import Stripe from "stripe";

// Initialize Firebase
admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

// Initialize Stripe using Firebase config
const stripe = new Stripe("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", {
  apiVersion: "2024-04-10",
  //stripeAccount: 'acct_xxx',
  //apiMode: 'live'
});

const stripeWebhookSecret = new Stripe("whsec_KCvvD0Rm6qx5Gniu4EA0U8X6rtA51rho", {
  apiVersion: "2024-04-10",
  //stripeAccount: 'acct_xxx',
  //apiMode: 'live'
});


// Global configuration
setGlobalOptions({
  region: "europe-west1",
  maxInstances: 3,
  memory: "256MiB",
  timeoutSeconds: 800,
});

// Health check endpoint
export const health = onRequest((req, res) => {
  logger.info("Health check called");
  res.status(200).send("OK");
});

// Get all training plans
export const getPlans = onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection("trainingPlans").get();
    const plans = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(plans);
  } catch (error) {
    logger.error("Error fetching plans:", error);
    res.status(500).send("Failed to fetch plans");
  }
});

// Upload training plan
export const uploadPlan = onRequest(
  { timeoutSeconds: 540 },
  async (req, res) => {
    try {
      const { name, description, price, file } = req.body;
      
      const bucket = storage.bucket();
      const fileRef = bucket.file(`training-plans/${Date.now()}_${file.name}`);
      
      await fileRef.save(Buffer.from(file.data), {
        metadata: { contentType: file.mimetype },
      });
      
      const [url] = await fileRef.getSignedUrl({
        action: "read",
        expires: "03-01-2030",
      });

      await db.collection("trainingPlans").add({
        name,
        description,
        price,
        fileUrl: url,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(200).send("Plan uploaded successfully");
    } catch (error) {
      logger.error("Upload error:", error);
      res.status(500).send("Upload failed");
    }
  }
);

export const stripeWebhook = onRequest(async (req, res) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(204).send("");
    return;
  }

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  logger.log("Received webhook call");
  const sig = req.headers["stripe-signature"];
  
  if (!sig) {
    logger.error("⚠️ No Stripe-Signature header found");
    return res.status(400).send("No signature header");
  }

  try {
    const event = stripe.webhooks.constructEvent(
      req.rawBody, // Raw body required for Stripe
      sig,
      stripeWebhookSecret
    );

    logger.log("✅ Valid event:", event.type);

    switch (event.type) {
      case "checkout.session.completed":
        logger.log("💰 Payment succeeded:", event.data.object.id);
        break;
      default:
        logger.log(`🤷 Unhandled event: ${event.type}`);
    }

    res.json({ received: true });

  } catch (err) {
    logger.error("❌ Webhook verification failed:", err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

export const createCheckoutSession = onRequest(
  {cors: [
    {
      origin: ['http://localhost:8080', 'https://becomel1mitless.com'],
      methods: ['GET', 'POST', 'OPTIONS'],
      //allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true  // This enables credentials
    }
  ] 
}, 
  async (req, res) => {
    try {
      if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
      }

      const { deliveryDetails, product, productId } = req.body;
      if (!deliveryDetails?.email) {
        return res.status(400).json({ error: "Missing email" });
      }
      if (!product || !product.name || !product.price) {
        return res.status(400).json({ error: "Missing product details" });
      }
      
    logger.log("Creating checkout in mode:", stripe._api.mode);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
                description: product.description,
              },
              unit_amount: Math.round(product.price * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer_email: deliveryDetails.email,
        success_url: "https://becomel1mitless.com/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://becomel1mitless.com/cancel",
        metadata: {
          product: productId, // or productId
        },
      });

      res.json({ sessionId: session.id });
    } catch (error) {
      logger.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  }
);