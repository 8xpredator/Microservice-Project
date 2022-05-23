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
const PORT = process.env.PORT || 5011;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
app.post("/displaytable1", verifyToken, async(req, res) => {
    try {

        const users = await pool.query("select * from table_receipt  where entrydate  between $1 and $2 and status='1'", [req.body.val1, req.body.val2]);
        res.json(users.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post("/Usertype", async(req, res) => {
    try {
        const users = await pool.query("select type from table_login  where id=$1", [req.body.val]);
        res.json(users.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});
app.post("/check", verifyToken, async(req, res) => {
    try {
        const users = await pool.query("select * from table_login  where username=$1", [req.body.a]);
        res.json(users.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});
app.get("/selectLedger", async(req, res) => {

    try {
        const users = await pool.query("select concat(c.l_id,'-',c.l_name) as name from table_ledgerhead c where c.p_id='3' order By c.l_id");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/getrecid", async(req, res) => {
    try {
        const users = await pool.query("select max(receiptno) from table_receipt");
        if (users.rows[0].max == null) {
            let receipid = 1000000000;
            res.json(receipid);
        } else {
            let receipid = parseInt(users.rows[0].max) + 1;
            res.json(receipid);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/getallreceipt", async(req, res) => {
    try {
        const users = await pool.query("select * from table_receipt");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post("/updatecancel", verifyToken, async(req, res) => {
    try {

        const Users = await pool.query(
            "update table_receipt set flag='1' where receiptno=$1", [req.body.receiptno]);

        res.status(200).json({ Sucess: "Successfully submited" });
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});