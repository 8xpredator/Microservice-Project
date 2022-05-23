import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import pool from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyToken from "./middleware/verifyToken.js";
const { json } = express;
dotenv.config();
const __dirname = dirname(fileURLToPath(
    import.meta.url));
const app = express();
const PORT = process.env.PORT || 5025;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
app.post("/getselect1", verifyToken, async(req, res) => {
    const { pid1 } = req.body;
    try {
        const users = await pool.query(
            "select concat(c.id,'-',c.name) as name from table_tree c where id=$1", [pid1]
        );
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});