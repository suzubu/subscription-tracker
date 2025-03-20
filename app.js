import express from "express";

import { PORT } from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./databse/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

// built-in/suggested middleware
// handle json data sent in requrests/API calls
app.use(express.json());
// helps process the form data sent via  HTML forms in a simple format
app.use(express.urlencoded({ extended: false }));
// reads cookies from incoming request so app can store data.
app.use(cookieParser());

app.use(arcjetMiddleware);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

// custom middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API");
});

app.listen(PORT, async () => {
  console.log(`Subscription Tracker API running on http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;
