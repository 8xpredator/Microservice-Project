import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
const router = express.Router();
import pool from "./db.js";
import nodemailer from "nodemailer";
import generator from "generate-password";
const { json } = express;
dotenv.config();
const __dirname = dirname(fileURLToPath(
    import.meta.url));
const app = express();
const PORT = process.env.PORT || 5002;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
app.post("/forgotpassword", async(req, res) => {
    try {
        const { username } = req.body;
        const Users = await pool.query(
            "SELECT * FROM table_login WHERE username=$1", [username]
        );
        if (Users.rows.length === null) {
            return res.status(500).json({ error: "Email is incorrect" });
        } else {
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "007xpredator@gmail.com",
                    pass: "Ashik001##",
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
            var password = generator.generate({
                length: 7,
                numbers: true,
            });
            password = password + "#";

            var mailOptions = {
                from: "007xpredator@gmail.com",
                to: username,
                subject: "Forgot password",
                text: "Your request for forgot password is received.Your password for login is " + password,
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent");
                }
            });
            //res.status(201).json({Sucess:"Email send sucessfully"});
            const hasedPassword = await bcrypt.hash(password, 10);
            const newUser = await pool.query(
                "UPDATE table_login SET password=$1,flag=1 WHERE username=$2", [hasedPassword, username]
            );
            res.status(201).json({ Sucess: "Password updated sucessfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});