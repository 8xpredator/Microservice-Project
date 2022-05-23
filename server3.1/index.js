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
const PORT = process.env.PORT || 5006;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
app.post("/receipt", verifyToken, async(req, res) => {
    console.log(req.body)
    try {

        const Users = await pool.query(
            "SELECT * FROM table_receipt WHERE receiptno=$1", [req.body.Receiptno]
        );

        if (Users.rows.length === 0) {

            const newUser = await pool.query(
                "INSERT INTO table_receipt(receiptno,entrydate,nature,address,type,total,narration,receivedamt,balance,name,party,time)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *", [req.body.Receiptno, req.body.Entrydate, req.body.Nature, req.body.Address, req.body.TypeR, req.body.Total, req.body.Narration, req.body.ReceivedAmt, req.body.Balance, req.body.nameRemitter, req.body.party, req.body.time1]
            );
            if (req.body.Nature == 2) {
                const newU = await pool.query(
                    "INSERT INTO table_cheque(ddno,dddate,nameofbank,branch,branchcode,remainingdate,receiptno)VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *", [req.body.DDno, req.body.DDdate, req.body.nameofbank, req.body.branch, req.body.branchcode, req.body.Remainingdate, req.body.Receiptno]
                );

            }
            const newUse = await pool.query(
                "INSERT INTO table_budget(receiptno,budget,amount)VALUES($1,$2,$3) RETURNING *", [req.body.Receiptno, req.body.Budget, req.body.Amount]
            );
            for (let i = 0; i < req.body.budgets.length; i++) {
                const newUs = await pool.query(
                    "INSERT INTO table_budget(receiptno,budget,amount)VALUES($1,$2,$3) RETURNING *", [req.body.Receiptno, req.body.budgets[i].Budget, req.body.budgets[i].Amount]
                );

            }

            res.status(200).json({ Sucess: "Successfully submited" });
        } else {
            return res.status(401).json({ error: "Receipt present" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});