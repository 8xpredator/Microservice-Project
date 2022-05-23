import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import pool from "./db.js";
const router = express.Router();
let random;
const { json } = express;
dotenv.config();
const __dirname = dirname(fileURLToPath(
    import.meta.url));
const app = express();
const PORT = process.env.PORT || 5005;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
app.post("/changepassword", async(req, res) => {
    try {
        // console.log(req.body);
        const new1 = await pool.query(
            "select username from table_login where id=$1", [req.body.userid]
        );
        // console.log(new1);
        username = new1.rows[0].username;
        // console.log(username);
        const hasedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await pool.query(
            "UPDATE table_login SET password=$1 WHERE username=$2", [hasedPassword, username]
        );
        const newUs = await pool.query(
            "UPDATE table_login SET flag=0 WHERE username=$1", [username]
        );
        res.status(201).json({ Sucess: "Password updated sucessfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});