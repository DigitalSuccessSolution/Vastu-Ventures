import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import env from "./config/env.js";
import { generalLimiter } from "./middlewares/rateLimiter.js";
import webhookRawBody from "./middlewares/webhookRawBody.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Capture raw body for webhook verification before JSON parsing
app.use(
  express.json({
    verify: webhookRawBody,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sanitize against NoSQL injection
app.use(mongoSanitize());

// Apply rate limiter to all API endpoints
app.use("/api", generalLimiter);

// API Version 1 routes
app.use("/api/v1", routes);

// Global Error Handler
app.use(errorHandler);

export default app;
