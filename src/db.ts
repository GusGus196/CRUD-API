import { Pool } from 'pg';
import { db_user, db_host, db_password, db_database, db_port } from './config.js';
import dotenv from 'dotenv';

dotenv.config();


export const pool = new Pool({
    user: db_user,
    host: db_host,
    password: String(db_password),
    database: db_database,
    port: Number(db_port)
});