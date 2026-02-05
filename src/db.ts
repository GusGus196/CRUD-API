import { Pool } from 'pg';

export const pool = new Pool({
    user: "kualilabs",
    host: "localhost",
    password: "123456",
    database: "course-db",
    port: 5432,
});