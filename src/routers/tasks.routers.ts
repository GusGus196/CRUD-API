import { Router, Request, Response} from "express";
import { pool } from '../db.js';


const router = Router();

router.get("/tasks", async (req: Request, res: Response) => { 
    const { rows } = await pool.query('SELECT * FROM "Tareas"');
    return res.json(rows);
});



export default router;