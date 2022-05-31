const Pool = require('pg').Pool
import dotenv from 'dotenv';

dotenv.config();

export const pg = new Pool({
    'user':process.env.PG_USER as string,
    'host':process.env.PG_HOST as string,
    'database':process.env.PG_DATABASE as string,
    'password':process.env.PG_PASSWD as string,
    'port':parseInt(process.env.PG_PORT as string) 
});