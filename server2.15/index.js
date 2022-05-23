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
const PORT = process.env.PORT || 5027;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
app.post("/ge1", verifyToken, async(req, res) => {
    //console.log(req.body);
    try {
        const last = parseInt(req.body.pid) + 999999999999;
        const users = await pool.query(
            "select max(l_id) from table_ledgerhead where l_id between $1 and $2", [req.body.pid, last]
        );
        //console.log(users)
        if (users.rows[0].max === null) {
            const max = parseInt(req.body.pid) + 100010000;
            const s = JSON.stringify(max);
            res.json(s);
        } else {
            const max = parseInt(users.rows[0].max) + 10000;
            const s = JSON.stringify(max);
            res.json(s);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});