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
const PORT = process.env.PORT || 5026;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
app.post("/getval", verifyToken, async(req, res) => {
    let pid1 = 0;
    const { pid } = req.body;
    try {
        if (pid == 1) {
            pid1 = 100000000000000;
        } else if (pid == 2) {
            pid1 = 200000000000000;
        } else if (pid == 3) {
            pid1 = 300000000000000;
        } else {
            pid1 = 400000000000000;
        }
        const last = parseInt(pid1) + 99999999999999;
        const users = await pool.query(
            "SELECT MAX(g_id) as id FROM table_grouphead where g_id between $1 and $2", [pid1, last]
        );
        if (users.rows[0].id === null) {
            const s = parseInt(pid1);
            const max = s + 1000000000000;
            const z = JSON.stringify(max);
            res.json(z);
        } else {
            const s = parseInt(users.rows[0].id);
            var one = String(users.rows[0].id).charAt(10);
            var one1 = String(users.rows[0].id).charAt(6);
            if (one === "1" || one1 === "1") {
                const max = s + (1000000000000 - 100100010000);
                const z = JSON.stringify(max);
                res.json(z);
            } else {
                const max = s + 1000000000000;
                const z = JSON.stringify(max);
                res.json(z);
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});