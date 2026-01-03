import express, { urlencoded } from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./db/db.js"
import userRoute from "./routes/user.route.js";
import expenseRoute from "./routes/expense.route.js";

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieparser());

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
].filter(Boolean);

const corseOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}

app.use(cors(corseOptions));

//apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/expense", expenseRoute);

app.listen(PORT, () => {
    connectdb();
    console.log(`Server running on port ${PORT}`);
});