import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import pool from "./db.js";
import verifyToken from "./middleware/verifyToken.js"
const { json } = express;
dotenv.config();
const __dirname = dirname(fileURLToPath(
    import.meta.url));
const app = express();
const PORT = process.env.PORT || 5008;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
app.post("/updatestatus", verifyToken, async(req, res) => {
    try {

        const Users = await pool.query(
            "update table_receipt set status=$1 where receiptno=$2", [req.body.val, req.body.receiptno]);

        res.status(200).json({ Sucess: "Successfully submited" });
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});