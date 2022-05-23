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
const PORT = process.env.PORT || 5018;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
let gid;
let lid;
app.post("/addgroup", verifyToken, async(req, res) => {
    try {
        const { Parenthead, Grouphead, pid, HeadName, GheadDesc, Type, Section } =
        req.body;
        const Users = await pool.query(
            "SELECT * FROM table_grouphead WHERE g_id=$1", [Grouphead]
        );
        if (Users.rows.length === 0) {
            const newUser = await pool.query(
                "INSERT INTO table_grouphead(g_id,p_id,g_name,g_desc,type,section)VALUES($1,$2,$3,$4,$5,$6) RETURNING *", [
                    req.body.Grouphead,
                    pid,
                    req.body.HeadName,
                    req.body.GheadDesc,
                    req.body.Type,
                    req.body.Section,
                ]
            );
            // const s = parseInt(req.body.Grouphead);
            var one = String(req.body.Grouphead).charAt(10);
            var one1 = String(req.body.Grouphead).charAt(6);
            if (one === "1" || one1 === "1") {
                gid = 3;
                lid = 3;
            } else {
                gid = 1;
                lid = 0;
            }
            const nUser = await pool.query(
                "INSERT INTO table_tree(id,name,pid,gid,lid)VALUES($1,$2,$3,$4,$5) RETURNING *", [req.body.Grouphead, req.body.HeadName, pid, gid, lid]
            );
            let payload = { subject: newUser.id };
            res.status(200).json(payload);
        } else {
            return res.status(401).json({ error: "Group Head Already present" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});