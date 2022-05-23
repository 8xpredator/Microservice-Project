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
const PORT = process.env.PORT || 5009;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
app.get("/getreceipt1", async(req, res) => {

    try {
        const users = await pool.query("select * from table_receipt  where status='1' order by receiptno");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/getreceipt2", async(req, res) => {

    try {
        const users = await pool.query("select * from table_receipt  where status='2' order by receiptno");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/getcashreceipt", async(req, res) => {

    try {
        const users = await pool.query("select * from table_receipt  where nature='1'");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/getchequereceipt", async(req, res) => {

    try {
        const users = await pool.query("select * from table_receipt  where nature='2' ");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post("/displayreceipt", verifyToken, async(req, res) => {
    try {

        const users = await pool.query("select * from table_budget  where receiptno=$1", [req.body.val]);
        res.json(users.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});

app.post("/displayreceipt1", async(req, res) => {
    try {

        const users = await pool.query("select * from table_receipt  where receiptno=$1", [req.body.val]);
        res.json(users.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});
app.get("/getreceiptno", async(req, res) => {

    try {
        const users = await pool.query("select receiptno from table_receipt order by receiptno");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post("/displaytable", verifyToken, async(req, res) => {
    try {

        const users = await pool.query("select * from table_receipt  where entrydate  between $1 and $2", [req.body.val1, req.body.val2]);
        res.json(users.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});