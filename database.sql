CREATE TABLE IF NOT EXISTS public.table_tree
 (
     id bigint NOT NULL,
     name character varying(255) COLLATE pg_catalog."default" NOT NULL,
     pid integer,
     gid integer,
     lid integer,
     CONSTRAINT table_tree_pkey PRIMARY KEY (id)
 );
 

CREATE TABLE IF NOT EXISTS public.table_receipt
 (
     receiptno bigint NOT NULL,
     entrydate date NOT NULL,
     nature integer NOT NULL,
     address text COLLATE pg_catalog."default" NOT NULL,
     type integer NOT NULL,
     total bigint NOT NULL,
     narration text COLLATE pg_catalog."default" NOT NULL,
     receivedamt bigint NOT NULL,
     balance bigint NOT NULL,
     name character varying COLLATE pg_catalog."default",
     party integer,
     status integer NOT NULL DEFAULT 3,
     remark text COLLATE pg_catalog."default",
     "time" integer,
     flag integer DEFAULT 0,
     CONSTRAINT table_receipt_pkey PRIMARY KEY (receiptno)
 );
CREATE TABLE IF NOT EXISTS public.table_login
     (
         id SERIAL NOT NULL,
         username character varying(50) COLLATE pg_catalog."default",
         password character varying(100) COLLATE pg_catalog."default",
         type integer,
         name character varying(255) COLLATE pg_catalog."default",
         status integer,
         flag integer DEFAULT 0,
         CONSTRAINT table_login_pkey PRIMARY KEY (id)
     );
CREATE TABLE IF NOT EXISTS public.table_ledgerhead
     (
         l_id bigint NOT NULL,
         p_id integer,
         g_id bigint,
         l_name character varying(70) COLLATE pg_catalog."default" NOT NULL,
         l_desc text COLLATE pg_catalog."default" NOT NULL,
         type character varying(100) COLLATE pg_catalog."default" NOT NULL,
         section integer NOT NULL,
         CONSTRAINT table_ledgerhead_pkey PRIMARY KEY (l_id)
     );
CREATE TABLE IF NOT EXISTS public.table_grouphead
     (
         g_id bigint NOT NULL,
         p_id integer,
         g_name character varying(70) COLLATE pg_catalog."default" NOT NULL,
         g_desc text COLLATE pg_catalog."default" NOT NULL,
         type character varying(70) COLLATE pg_catalog."default" NOT NULL,
         section integer NOT NULL,
         CONSTRAINT table_grouphead_pkey PRIMARY KEY (g_id)
     );

CREATE TABLE IF NOT EXISTS public.table_cheque
     (
         ddno bigint,
         dddate date,
         nameofbank character varying COLLATE pg_catalog."default",
         branch character varying COLLATE pg_catalog."default",
         branchcode character varying COLLATE pg_catalog."default",
         remainingdate integer,
         receiptno bigint
     );

CREATE TABLE IF NOT EXISTS public.table_budget
     (
         receiptno bigint NOT NULL,
         budget character varying COLLATE pg_catalog."default" NOT NULL,
         amount bigint NOT NULL
     );

CREATE TABLE IF NOT EXISTS public.table_party
(
    id SERIAL NOT NULL,
    party_category character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT table_party_pkey PRIMARY KEY (id)
);



CREATE TABLE IF NOT EXISTS public.table_type
(
    id SERIAL NOT NULL,
    type_remittance character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT table_type_pkey PRIMARY KEY (id)
);



INSERT INTO public.table_login(username, password, type, name, status)
 	VALUES ('ashik98joy@gmail.com','$2b$10$RiaFlvmsf7s2VvbYLRzL3Om0RYjHrv88g6HFNISd2f5567LXwKc8G',1,'Ashik joy',0),('ashik03joy@gmail.com','$2b$10$SHqhaJD/XQRpleAMxkXICON6tI0umR5PvuJf4ijKt6t2A0Hx1jNwC',2,'Ashik joy',0),('ashik11joy@gmail.com','$2b$10$kcv3nx.EUuxPXdrSSXR9Z.m6UEcjMyVb7v7FI4c5CbUjUrmHAz8SW',3,'Arun Arun',0);
 
INSERT INTO public.table_tree(id, name, pid, gid,lid )
 	VALUES (100000000000000,'LIABILITY',1,2,2),(200000000000000,'ASSETS',2,2,2),(300000000000000,'INCOME',3,2,2),(400000000000000,'EXPENDITURE',4,2,2);
