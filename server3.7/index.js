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
const PORT = process.env.PORT || 5012;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));

app.get("/getreceiptno1", async(req, res) => {

    try {
        const users = await pool.query("select receiptno from table_receipt where flag!='1' order by receiptno");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/getcount1", async(req, res) => {

    try {
        const users = await pool.query("select count(*) from table_receipt where status='1'");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/getcount2", async(req, res) => {

    try {
        const users = await pool.query("select count(*) from table_receipt where status='3'");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/getcount3", async(req, res) => {

    try {
        const users = await pool.query("select count(*) from table_receipt where status='2'");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/getcount4", async(req, res) => {

    try {
        const users = await pool.query("select count(*) from table_receipt where flag='1'");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});