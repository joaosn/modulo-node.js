import dotenv from 'dotenv';
dotenv.config();

let db = {
   db:       process.env.PG_DB as string,
   user:     process.env.PG_USER as string,
   password: process.env.PG_PASSWD as string,
   port:     +(process.env.PG_PORT as string)
}

if(process.env.NODE_ENV == 'test') {
    db.db       = process.env.QA_DB as string;
    db.user     = process.env.QA_USER as string;
    db.password = process.env.QA_PASSWD as string;
    db.port     = +(process.env.QA_PORT as string);
}

export default db;