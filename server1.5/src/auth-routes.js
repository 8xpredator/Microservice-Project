import express from "express";
import pool from "../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Crypto from "crypto-random-string";
import nodemailer from "nodemailer";
import generator from "generate-password";
import verifyToken from "../../middleware/verifyToken.js";
import { check, validationResult } from 'express-validator';
const router = express.Router();
let random;
let username;
router.post("/login1", [
        check('username', 'Invaild Email Format')
        .isEmail().normalizeEmail(),
        // check('password', 'Password Format Error')
        // .isStrongPassword({
        //     minLength: 6,
        //     minLowercase: 1,
        //     minUppercase: 1,
        //     minNumbers: 1
        // })
    ],
    async(req, res) => {
        console.log(req.body)
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({
                errors: errors.array()
            });
        } else {
            try {
                const { username, password } = req.body;
                if (req.body.captcha === random) {
                    const Users = await pool.query(
                        "SELECT * FROM table_login WHERE username=$1", [username]
                    );
                    if (Users.rows.length === 0)
                        return res.status(404).json({ error: "Username is wrong try submitting again.!" });
                    const vaildPassword = await bcrypt.compare(
                        password,
                        Users.rows[0].password
                    );
                    if (!vaildPassword)
                        return res.status(404).json({ error: "Password is wrong try submitting again..!" });
                    let payload = { subject: Users.id };
                    let token = jwt.sign(payload, "secretKey", {
                        expiresIn: "98h",
                    });
                    res.status(200).send({ Users, token });
                } else {
                    res.status(404).json({ error: "Captche is wrong try submitting again..!" });
                }
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        }
    });
router.get("/getcaptcha", async(req, res) => {
    try {
        random = Crypto({ length: 6, type: "alphanumeric" });
        res.status(200).send({ random });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/forgotpassword", async(req, res) => {
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

router.post("/Usertype", async(req, res) => {
    try {
        const users = await pool.query(
            "select type from table_login  where id=$1", [req.body.val]
        );
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/check", verifyToken, async(req, res) => {
    try {
        const users = await pool.query(
            "select * from table_login  where username=$1", [req.body.a]
        );
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/changepassword", async(req, res) => {
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
export default router;