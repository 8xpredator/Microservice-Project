import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    user: "postgres",
    password: "123",
    host: "postgres",
    port: "5432",
    database: "hoaccm"
});
pool.on('error', (err, client) => {
    console.error('Error:', err);
});


// const poolConfig = process.env.database_URL ? { connectionString: process.env.database_URL, SSL: { rejectUnauthorized: false } } : localPoolconfig;
// const pool = new Pool(poolConfig);
// const query = `
// CREATE TABLE IF NOT EXISTS public.table_tree
// (
//     id bigint NOT NULL,
//     name character varying(255) COLLATE pg_catalog."default" NOT NULL,
//     pid integer,
//     gid integer,
//     lid integer,
//     CONSTRAINT table_tree_pkey PRIMARY KEY (id)
// )`;
// pool.connect((err, client, done) => {
//     if (err) throw err;
//     client.query(query, (err, res) => {
//         done();
//         if (err) {
//             console.log(err.stack);
//         } else {
//             for (let row of res.rows) {
//                 console.log(row);
//             }
//         }
//     });
// });

// const query1 =
//     `CREATE TABLE IF NOT EXISTS public.table_receipt
// (
//     receiptno bigint NOT NULL,
//     entrydate date NOT NULL,
//     nature integer NOT NULL,
//     address text COLLATE pg_catalog."default" NOT NULL,
//     type integer NOT NULL,
//     total bigint NOT NULL,
//     narration text COLLATE pg_catalog."default" NOT NULL,
//     receivedamt bigint NOT NULL,
//     balance bigint NOT NULL,
//     name character varying COLLATE pg_catalog."default",
//     party integer,
//     status integer NOT NULL DEFAULT 3,
//     remark text COLLATE pg_catalog."default",
//     "time" integer,
//     flag integer DEFAULT 0,
//     CONSTRAINT table_receipt_pkey PRIMARY KEY (receiptno)
// )`;
// pool.connect((err, client, done) => {
//     if (err) throw err;
//     client.query(query1, (err, res) => {
//         done();
//         if (err) {
//             console.log(err.stack);
//         } else {
//             for (let row of res.rows) {
//                 console.log(row);
//             }
//         }
//     });
// });
// const query2 =
//     `
//     CREATE TABLE IF NOT EXISTS public.table_login
//     (
//         id SERIAL NOT NULL,
//         username character varying(50) COLLATE pg_catalog."default",
//         password character varying(100) COLLATE pg_catalog."default",
//         type integer,
//         name character varying(255) COLLATE pg_catalog."default",
//         status integer,
//         CONSTRAINT table_login_pkey PRIMARY KEY (id)
//     )`;
// pool.connect((err, client, done) => {
//     if (err) throw err;
//     client.query(query2, (err, res) => {
//         done();
//         if (err) {
//             console.log(err.stack);
//         } else {
//             for (let row of res.rows) {
//                 console.log(row);
//             }
//         }
//     });
// });
// const query3 =
//     `CREATE TABLE IF NOT EXISTS public.table_ledgerhead
//     (
//         l_id bigint NOT NULL,
//         p_id integer,
//         g_id bigint,
//         l_name character varying(70) COLLATE pg_catalog."default" NOT NULL,
//         l_desc text COLLATE pg_catalog."default" NOT NULL,
//         type character varying(100) COLLATE pg_catalog."default" NOT NULL,
//         section integer NOT NULL,
//         CONSTRAINT table_ledgerhead_pkey PRIMARY KEY (l_id)
//     )`;
// pool.connect((err, client, done) => {
//     if (err) throw err;
//     client.query(query3, (err, res) => {
//         done();
//         if (err) {
//             console.log(err.stack);
//         } else {
//             for (let row of res.rows) {
//                 console.log(row);
//             }
//         }
//     });
// });

// const query4 =
//     `CREATE TABLE IF NOT EXISTS public.table_grouphead
//     (
//         g_id bigint NOT NULL,
//         p_id integer,
//         g_name character varying(70) COLLATE pg_catalog."default" NOT NULL,
//         g_desc text COLLATE pg_catalog."default" NOT NULL,
//         type character varying(70) COLLATE pg_catalog."default" NOT NULL,
//         section integer NOT NULL,
//         CONSTRAINT table_grouphead_pkey PRIMARY KEY (g_id)
//     )`;
// pool.connect((err, client, done) => {
//     if (err) throw err;
//     client.query(query4, (err, res) => {
//         done();
//         if (err) {
//             console.log(err.stack);
//         } else {
//             for (let row of res.rows) {
//                 console.log(row);
//             }
//         }
//     });
// });
// const query5 =
//     `CREATE TABLE IF NOT EXISTS public.table_cheque
//     (
//         ddno bigint,
//         dddate date,
//         nameofbank character varying COLLATE pg_catalog."default",
//         branch character varying COLLATE pg_catalog."default",
//         branchcode character varying COLLATE pg_catalog."default",
//         remainingdate integer,
//         receiptno bigint
//     )`;
// pool.connect((err, client, done) => {
//     if (err) throw err;
//     client.query(query5, (err, res) => {
//         done();
//         if (err) {
//             console.log(err.stack);
//         } else {
//             for (let row of res.rows) {
//                 console.log(row);
//             }
//         }
//     });
// });
// const query6 =
//     `CREATE TABLE IF NOT EXISTS public.table_budget
//     (
//         receiptno bigint NOT NULL,
//         budget character varying COLLATE pg_catalog."default" NOT NULL,
//         amount bigint NOT NULL
//     )`;
// pool.connect((err, client, done) => {
//     if (err) throw err;
//     client.query(query6, (err, res) => {
//         done();
//         if (err) {
//             console.log(err.stack);
//         } else {
//             for (let row of res.rows) {
//                 console.log(row);
//             }
//         }
//     });
// });

// const query7 =
//     `INSERT INTO public.table_login(username, password, type, name, status)
// 	VALUES ('ashik98joy@gmail.com','$2b$10$ntgL9yqVI/Ne8waDb26i1e3mrE3HxUyGV3nRp1sZ98u7RK.dmFbLi',1,'Ashik joy',0),('ashik03joy@gmail.com','$2b$10$SHqhaJD/XQRpleAMxkXICON6tI0umR5PvuJf4ijKt6t2A0Hx1jNwC',2,'Ashik joy',0),('ashik11joy@gmail.com','$2b$10$kcv3nx.EUuxPXdrSSXR9Z.m6UEcjMyVb7v7FI4c5CbUjUrmHAz8SW',3,'Arun Arun',0)`;
// if (err) throw err;
// client.query(query7, (err, res) => {
//     done();
//     if (err) {
//         console.log(err.stack);
//     } else {
//         for (let row of res.rows) {
//             console.log(row);
//         }
//     }
// });


// const query8 =
//     `INSERT INTO public.table_tree(id, name, pid, gid,lid )
// 	VALUES (100000000000000,'LIABILITY',1,2,2),(200000000000000,'ASSETS',2,2,2),(300000000000000,'INCOME',3,2,2),(400000000000000,'EXPENDITURE',4,2,2)`;
// pool.connect((err, client, done) => {
//     if (err) throw err;
//     client.query(query8, (err, res) => {
//         done();
//         if (err) {
//             console.log(err.stack);
//         } else {
//             for (let row of res.rows) {
//                 console.log(row);
//             }
//         }
//     });
// });

export default pool;