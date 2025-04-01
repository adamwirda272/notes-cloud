import e from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import notesRoute from "./routes/notesRoute.js";

configDotenv();

const app = e();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(e.urlencoded({ extended: true }));
app.use(e.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(notesRoute);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});