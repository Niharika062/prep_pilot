import express from "express";
import cors from "cors";
import sessionRouter from "./routes/session.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://prep-pilot-2kxj.vercel.app"]
}));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/session", sessionRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(400).json({
        success: false,
        message: err.message || "Something went wrong"
    });
});

export default app;