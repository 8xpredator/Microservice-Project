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
const PORT = process.env.PORT || 5023;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
app.post("/addledger", verifyToken, async(req, res) => {
    try {
        const {
            Parenthead,
            ledgerid,
            Ledgerhead,
            HeadName,
            LheadDesc,
            Type,
            Section,
        } = req.body;
        const Users = await pool.query(
            "SELECT * FROM table_ledgerhead WHERE l_id=$1", [req.body.ledgerhead]
        );
        if (Users.rows.length === 0) {
            const newUser = await pool.query(
                "INSERT INTO table_ledgerhead(l_id,p_id,g_id,l_name,l_desc,type,section)VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *", [
                    req.body.ledgerhead,
                    req.body.pid,
                    req.body.z,
                    req.body.HeadName,
                    req.body.LheadDesc,
                    req.body.Type,
                    req.body.Section,
                ]
            );
            const gid = 0;
            const lid = 1;
            const nUser = await pool.query(
                "INSERT INTO table_tree(id,name,pid,gid,lid)VALUES($1,$2,$3,$4,$5) RETURNING *", [req.body.ledgerhead, req.body.HeadName, req.body.pid, gid, lid]
            );

            let payload = { subject: nUser.id };
            res.status(200).json(payload);
        } else {
            return res.status(401).json({ error: "Ledger Head Already present" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});