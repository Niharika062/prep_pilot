import express from "express";
import cors from "cors";
import sessionRouter from "./routes/session.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/session", sessionRouter);

export default app;