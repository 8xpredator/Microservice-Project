import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Crypto from "crypto-random-string";
import { check, validationResult } from "express-validator";
import pool from "./db.js";
const router = express.Router();
let random;
const { json } = express;
dotenv.config();
const __dirname = dirname(fileURLToPath(
    import.meta.url));
const app = express();
const PORT = process.env.PORT || 5031;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
app.post("/login1", [check("username", "Invaild Email Format").isEmail().normalizeEmail()],
    async(req, res) => {
        const errors = validationResult(req);
        console.log(random)
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(401).json({
                errors: errors.array(),
            });
        } else {
            try {
                const { username, password } = req.body;
                if (req.body.captcha === random) {
                    const Users = await pool.query(
                        "SELECT * FROM table_login WHERE username=$1", [username]
                    );
                    if (Users.rows.length === 0)
                        return res
                            .status(404)
                            .json({ error: "Username is wrong try submitting again.!" });
                    const vaildPassword = await bcrypt.compare(
                        password,
                        Users.rows[0].password
                    );
                    if (!vaildPassword)
                        return res
                            .status(404)
                            .json({ error: "Password is wrong try submitting again..!" });
                    let payload = { subject: Users.id };
                    let token = jwt.sign(payload, "secretKey", {
                        expiresIn: "98h",
                    });
                    res.status(200).send({ Users, token });
                } else {
                    res
                        .status(404)
                        .json({ error: "Captche is wrong try submitting again..!" });
                }
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        }
    }
);
app.get("/getcaptcha", async(req, res) => {
    try {
        random = Crypto({ length: 6, type: "alphanumeric" });
        res.status(200).send({ random });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});