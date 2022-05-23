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
const PORT = process.env.PORT || 5010;
const corsOption = { Credential: true, orgin: process.env.url || "*" };
app.use(cors(corsOption));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", express.static(join(__dirname, "public")));
app.post("/updateremark", verifyToken, async(req, res) => {
    try {

        const users = await pool.query("update table_receipt set remark=$1 where receiptno=$2", [req.body.remark, req.body.val]);
        res.json(users.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});
app.post("/updatereceipt", verifyToken, async(req, res) => {
    try {

        const users = await pool.query("update table_receipt set entrydate='01-01-2000',nature=0,address=0,type=0,total=0,narration=0,receivedamt=0,balance=0,name=0,party=0,status=0,remark=0 where receiptno=$1", [req.body.val]);
        const use = await pool.query("delete from table_budget where receiptno=$1", [req.body.val]);
        const use1 = await pool.query("delete from table_cheque where receiptno=$1", [req.body.val]);

        res.json(users.rows);


    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});
app.get("/getrec", async(req, res) => {

    try {
        const users = await pool.query("select * from table_receipt  where status='3' or status='0' order by receiptno");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post("/upreceipt", verifyToken, async(req, res) => {
    try {

        const users = await pool.query("update table_receipt set entrydate=$1,nature=$2,address=$3,type=$4,total=$5,narration=$6,receivedamt=$7,balance=$8,name=$9,party=$10,status='3',time=$11 where receiptno=$12", [req.body.Entrydate, req.body.Nature, req.body.Address, req.body.TypeR, req.body.Total, req.body.Narration, req.body.ReceivedAmt, req.body.Balance, req.body.nameRemitter, req.body.party, req.body.time1, req.body.Receiptno]);
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
        //  res.json(users.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});