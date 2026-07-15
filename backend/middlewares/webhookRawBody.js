/**
 * Middleware: Capture raw body for Razorpay webhook signature verification.
 * Must be applied BEFORE express.json() on the webhook route.
 */
const webhookRawBody = (req, res, buf) => {
  if (req.originalUrl === "/api/v1/payments/webhook") {
    req.rawBody = buf.toString();
  }
};

export default webhookRawBody;
