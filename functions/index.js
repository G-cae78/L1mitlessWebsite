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
// const stripe = new Stripe(process.env.SECRET, {
//   apiVersion: '2024-04-10',
// });

// const stripeWebhookSecret = new Stripe(process.env.WHSECRET, {
//   apiVersion: '2024-04-10',
// });

import { defineSecret } from "firebase-functions/params";

// Securely fetch Stripe secrets
const stripeSecret = defineSecret("STRIPE_SECRET");
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");

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

export const getPlanForSession = onRequest({ secrets: [stripeSecret], 
  cors: {
    origin: ["http://localhost:8080", "https://becomel1mitless.com"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  },
 }, async (req, res) => {
  try {
    const { sessionId } = req.query;
    if (!sessionId) return res.status(400).send("Missing sessionId");
    //console.log("Session ID:", sessionId);

    const stripe = new Stripe(stripeSecret.value(), {
      apiVersion: "2024-04-10",
    });

    const session = await stripe.checkout.sessions.retrieve(String(sessionId));
    //console.log("Session full data:", session);

    const planId = session.metadata?.product;
    console.log("Plan ID from session:", planId);
    if (!planId || planId === 'unknown') {
      return res.status(404).json({ message: "Not a plan or product ID missing" });
    }

    const doc = await db.collection("trainingPlans").doc(planId).get();
    if (!doc.exists) return res.status(404).json({ message: "Plan not found" });

    const planData = doc.data();
    return res.status(200).json({ planUrl: planData?.fileUrl });
  } catch (error) {
    logger.error("Error fetching plan from session:", error);
    res.status(500).send("Failed to retrieve plan");
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

export const stripeWebhook = onRequest({secrets: [stripeSecret, stripeWebhookSecret] },
  async (req, res) => {
    const stripe = new Stripe(stripeSecret.value(), {
      apiVersion: "2024-04-10",
    });
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
        //logger.log("💰 Payment succeeded:", event.data.object.id);
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
  { secrets: [stripeSecret] },
  async (req, res) => {
    try {
      const allowedOrigins = ["http://localhost:8080","https://becomel1mitless.com"];
      // ✅ Handle CORS
      const origin = req.get("origin");
      if (origin && allowedOrigins.includes(origin)) {
        res.set("Access-Control-Allow-Origin", origin);
        res.set("Access-Control-Allow-Credentials", "true");
      }

      res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

      // ✅ Preflight
      if (req.method === "OPTIONS") return res.status(204).send();

      // ✅ Only allow POST
      if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

      // ✅ Parse JSON body safely
      let body = req.body;
      if (typeof body === "string") body = JSON.parse(body);

      const { product, productId, isMerchandise } = body || {};

      if (!product || !product.name || !product.price || !productId) {
        return res.status(400).json({ error: "Missing product details" });
      }

      const stripe = new Stripe(stripeSecret.value(), { apiVersion: "2024-04-10" });

      const shippingSettings = isMerchandise
        ? {
            shipping_address_collection: {
              allowed_countries: ["US", "IE", "GB", "CA", "AU", "NZ", "DE", "FR"],
            },
            shipping_options: [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: { amount: 499, currency: "eur" },
                  display_name: "Standard Shipping",
                  delivery_estimate: {
                    minimum: { unit: "business_day", value: 3 },
                    maximum: { unit: "business_day", value: 7 },
                  },
                },
              },
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: { amount: 899, currency: "eur" },
                  display_name: "Express Shipping",
                  delivery_estimate: {
                    minimum: { unit: "business_day", value: 1 },
                    maximum: { unit: "business_day", value: 3 },
                  },
                },
              },
            ],
          }
        : {};

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: { name: product.name, description: product.description },
              unit_amount: Math.round(product.price * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `https://becomel1mitless.com/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: "https://becomel1mitless.com/cancel",
        metadata: { product: productId },
        allow_promotion_codes: true,
        ...shippingSettings,
      });

      return res.status(200).json({ checkoutUrl: session.url });
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      return res.status(500).json({ error: error.message });
    }
  }
);
