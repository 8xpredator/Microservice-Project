import express from "express";
import pool from "../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyToken from "../../middleware/verifyToken.js";
const router = express.Router();
let gid;
let lid;
router.get("/users", async(req, res) => {
    try {
        const users = await pool.query("SELECT *FROM table_login order by id");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/users", verifyToken, async(req, res) => {
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
router.post("/getdata", verifyToken, async(req, res) => {
    try {


        const users = await pool.query("SELECT  name,username,type,status FROM table_login where id=$1", [req.body.id]);
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/editusers", verifyToken, async(req, res) => {
    try {

        const newUser = await pool.query(
            "update table_login set name=$1,username=$2,type=$3,status=$4 where id=$5", [req.body.Name, req.body.username, req.body.Type, req.body.status, req.body.id]
        );
        res.json(newUser.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/addgroup", verifyToken, async(req, res) => {
    try {
        const { Parenthead, Grouphead, pid, HeadName, GheadDesc, Type, Section } =
        req.body;
        const Users = await pool.query(
            "SELECT * FROM table_grouphead WHERE g_id=$1", [Grouphead]
        );
        if (Users.rows.length === 0) {
            const newUser = await pool.query(
                "INSERT INTO table_grouphead(g_id,p_id,g_name,g_desc,type,section)VALUES($1,$2,$3,$4,$5,$6) RETURNING *", [
                    req.body.Grouphead,
                    pid,
                    req.body.HeadName,
                    req.body.GheadDesc,
                    req.body.Type,
                    req.body.Section,
                ]
            );
            // const s = parseInt(req.body.Grouphead);
            var one = String(req.body.Grouphead).charAt(10);
            var one1 = String(req.body.Grouphead).charAt(6);
            if (one === "1" || one1 === "1") {
                gid = 3;
                lid = 3;
            } else {
                gid = 1;
                lid = 0;
            }
            const nUser = await pool.query(
                "INSERT INTO table_tree(id,name,pid,gid,lid)VALUES($1,$2,$3,$4,$5) RETURNING *", [req.body.Grouphead, req.body.HeadName, pid, gid, lid]
            );
            let payload = { subject: newUser.id };
            res.status(200).json(payload);
        } else {
            return res.status(401).json({ error: "Group Head Already present" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/getgrouphead", async(req, res) => {
    try {
        const users = await pool.query(
            "select concat(c.id,'-',c.name) as name,id,lid,gid from table_tree c where pid=1 order By c.id "
        );
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/getgrouphead1", async(req, res) => {
    try {
        const users = await pool.query(
            "select concat(c.id,'-',c.name) as name,id,lid,gid from table_tree c where pid=2 order By c.id "
        );
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/getgrouphead2", async(req, res) => {
    try {
        const users = await pool.query(
            "select concat(c.id,'-',c.name) as name,id,lid,gid from table_tree c where pid=3 order By c.id "
        );
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/getgrouphead3", async(req, res) => {
    try {
        const users = await pool.query(
            "select concat(c.id,'-',c.name) as name,id,lid,gid from table_tree c where pid=4 order By c.id "
        );
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/addledger", verifyToken, async(req, res) => {
    try {
        const {
            Parenthead,
            ledgerid,
            Ledgerhead,
            HeadName,
            LheadDesc,
            Type,
            Section,
        } = req.body;
        const Users = await pool.query(
            "SELECT * FROM table_ledgerhead WHERE l_id=$1", [req.body.ledgerhead]
        );
        if (Users.rows.length === 0) {
            const newUser = await pool.query(
                "INSERT INTO table_ledgerhead(l_id,p_id,g_id,l_name,l_desc,type,section)VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *", [
                    req.body.ledgerhead,
                    req.body.pid,
                    req.body.z,
                    req.body.HeadName,
                    req.body.LheadDesc,
                    req.body.Type,
                    req.body.Section,
                ]
            );
            const gid = 0;
            const lid = 1;
            const nUser = await pool.query(
                "INSERT INTO table_tree(id,name,pid,gid,lid)VALUES($1,$2,$3,$4,$5) RETURNING *", [req.body.ledgerhead, req.body.HeadName, req.body.pid, gid, lid]
            );

            let payload = { subject: nUser.id };
            res.status(200).json(payload);
        } else {
            return res.status(401).json({ error: "Ledger Head Already present" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/getselect", async(req, res) => {
    try {
        const users = await pool.query(
            "select concat(c.id,'-',c.name) as name from table_tree c  order By c.id"
        );
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/getselect1", verifyToken, async(req, res) => {
    const { pid1 } = req.body;
    try {
        const users = await pool.query(
            "select concat(c.id,'-',c.name) as name from table_tree c where id=$1", [pid1]
        );
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/getval", verifyToken, async(req, res) => {
    let pid1 = 0;
    const { pid } = req.body;
    try {
        if (pid == 1) {
            pid1 = 100000000000000;
        } else if (pid == 2) {
            pid1 = 200000000000000;
        } else if (pid == 3) {
            pid1 = 300000000000000;
        } else {
            pid1 = 400000000000000;
        }
        const last = parseInt(pid1) + 99999999999999;
        const users = await pool.query(
            "SELECT MAX(g_id) as id FROM table_grouphead where g_id between $1 and $2", [pid1, last]
        );
        if (users.rows[0].id === null) {
            const s = parseInt(pid1);
            const max = s + 1000000000000;
            const z = JSON.stringify(max);
            res.json(z);
        } else {
            const s = parseInt(users.rows[0].id);
            var one = String(users.rows[0].id).charAt(10);
            var one1 = String(users.rows[0].id).charAt(6);
            if (one === "1" || one1 === "1") {
                const max = s + (1000000000000 - 100100010000);
                const z = JSON.stringify(max);
                res.json(z);
            } else {
                const max = s + 1000000000000;
                const z = JSON.stringify(max);
                res.json(z);
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/ge1", verifyToken, async(req, res) => {
    //console.log(req.body);
    try {
        const last = parseInt(req.body.pid) + 999999999999;
        const users = await pool.query(
            "select max(l_id) from table_ledgerhead where l_id between $1 and $2", [req.body.pid, last]
        );
        //console.log(users)
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
router.post("/ge", verifyToken, async(req, res) => {
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
export default router;