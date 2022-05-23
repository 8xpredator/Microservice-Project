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
const PORT = process.env.PORT || 5030;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));

app.get("/selecttype", async(req, res) => {

    try {
        const users = await pool.query("select party_category from table_party order by id");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/selectparty", async(req, res) => {

    try {
        const users = await pool.query("select type_remittance from table_type  order by id");
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