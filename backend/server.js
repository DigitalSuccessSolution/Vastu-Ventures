import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";

const startServer = async () => {
  // Connect to Database
  await connectDB();

  // Start Express Server
  const server = app.listen(env.PORT, () => {
    console.log(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.error(`❌ Unhandled Rejection: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
};

startServer();
