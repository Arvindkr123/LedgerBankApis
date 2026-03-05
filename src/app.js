import express from 'express';
import authRoutes from './routes/auth.routes.js';
import accountRoutes from './routes/accounts.routes.js';
import transcationsRoutes from './routes/transcations.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 *  Routes
 ***/

app.get("/", (req, res) => {
    res.send("Ledger Service up and running")
})

app.use("/api/auth", authRoutes)
app.use("/api/accounts", accountRoutes)
app.use("/api/transcations", transcationsRoutes)

export default app;