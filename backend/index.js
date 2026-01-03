import express, { urlencoded } from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./db/db.js"
import userRoute from "./routes/user.route.js";
import expenseRoute from "./routes/expense.route.js";

dotenv.config({});

const app = express();
const PORT = 8000;

//middleware
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieparser());
const corseOptions = {
    origin: "http://localhost:5173",
    credentials:true
}

app.use(cors(corseOptions));

//apis
app.use("/api/v1/user",userRoute);
app.use("/api/v1/expense",expenseRoute);

app.listen(PORT, () => {
    connectdb();
    console.log(`Server running on port ${PORT}`);
});