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
const PORT = process.env.PORT || 5028;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
app.post("/ge", verifyToken, async(req, res) => {
    const result = req.body.pid;
    const last = parseInt(result) + 999999999999;
    try {
        const users = await pool.query(
            "select max(l_id) from table_ledgerhead where l_id between $1 and $2", [req.body.pid, last]
        );
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

app.post("/addtype", verifyToken, async(req, res) => {
    console.log(req.body);
    try {
        const newUser = await pool.query(
            "INSERT INTO table_type(type_remittance)VALUES($1)", [req.body.Name]
        );
        let payload = { subject: newUser.id };
        res.status(200).json(payload);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/showtype", async(req, res) => {
    try {
        const users = await pool.query("SELECT *FROM table_type order by id");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/showtype", async(req, res) => {
    try {
        const users = await pool.query("SELECT *FROM table_type where id=$1", [req.body.id]);
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/edittype", verifyToken, async(req, res) => {
    try {

        const newUser = await pool.query(
            "update table_type set type_remittance=$1 where id=$2", [req.body.Name, req.body.id]
        );
        res.json(newUser.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post("/addparty", verifyToken, async(req, res) => {
    console.log(req.body);
    try {
        const newUser = await pool.query(
            "INSERT INTO table_party(party_category)VALUES($1)", [req.body.Name]
        );
        let payload = { subject: newUser.id };
        res.status(200).json(payload);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/showparty", async(req, res) => {
    try {
        const users = await pool.query("SELECT *FROM table_party order by id");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/showparty", async(req, res) => {
    try {
        const users = await pool.query("SELECT *FROM table_party where id=$1", [req.body.id]);
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/editparty", verifyToken, async(req, res) => {
    try {

        const newUser = await pool.query(
            "update table_party set party_category=$1 where id=$2", [req.body.Name, req.body.id]
        );
        res.json(newUser.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/checklid", verifyToken, async(req, res) => {
    console.log(req.body)
    try {
        const users = await pool.query(
            "select g_id from table_grouphead where g_id=$1 union select l_id from table_ledgerhead where l_id=$2", [req.body.lid, req.body.lid]
        );
        if (users.rows.length == 0) {
            const max = parseInt(req.body.lid);
            const s = JSON.stringify(max);
            res.json(s);
        } else {
            const max = parseInt(req.body.lid) + 10000;
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