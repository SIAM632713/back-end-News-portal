import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoute from "./src/route/auth.route.js";
import userRoute from "./src/route/user.route.js";
import reviewRoute from "./src/route/review.route.js";
import articleRoute from "./src/route/article.route.js";
import stateRoute from "./src/route/state.route.js";
import uploadImage from "./src/utilitis/uploadImage.js";

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            "http://localhost:5173",
            "https://news-portal-roan.vercel.app"
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET_KEY;

async function main() {
    await mongoose.connect(process.env.UB_URL);

    app.get('/', (req, res) => {
        res.send('Welcome to the Shopping App!');
    });

    // Route uses
    app.use("/api/auth", authRoute);
    app.use("/api/user", userRoute);
    app.use("/api/review", reviewRoute);
    app.use("/api/article", articleRoute);
    app.use("/api/state", stateRoute);

    app.post('/uploadImage', async (req, res) => {
        try {
            const url = await uploadImage(req.body.image);
            res.send(url);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}

main().then(() => console.log("MongoDB connected")).catch(err => console.log(err));
