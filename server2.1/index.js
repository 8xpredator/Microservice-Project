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
const PORT = process.env.PORT || 5013;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
app.get("/users", async(req, res) => {
    try {
        const users = await pool.query("SELECT *FROM table_login order by id");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/users", verifyToken, async(req, res) => {
    //const { username, Type, Name, status } = req.body;
    try {
        const hasedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await pool.query(
            "INSERT INTO table_login(username,password,type,name,status)VALUES($1,$2,$3,$4,$5) RETURNING *", [req.body.username, hasedPassword, req.body.Type, req.body.Name, req.body.status]
        );
        let payload = { subject: newUser.id };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});