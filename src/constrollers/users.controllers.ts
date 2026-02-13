import { Request, Response } from "express";
import { pool } from '../db.js';

export const getUsers = async(req: Request, res: Response) => {
    const { rows } = await pool.query('SELECT * FROM "Usuarios"');
    return res.json(rows);
};

export const getUser = async (req: Request, res: Response) => {
    const { rows } = await pool.query('SELECT * FROM "Usuarios" where id = $1', [req.params.id]);
    return res.json(rows[0]);
};

export const createUser = async (req: Request, res: Response) => { // ! FALTA PASSWORD.HASHED  bcrypt
    const data = req.body;
    const { rows } = await pool.query(`INSERT INTO "Usuarios" (email, first_name, last_name, password_hashed) VALUES ($1, $2, $3, $4) RETURNING *`, [data.email, data.first_name, data.last_name, data.password_hashed]);
    return res.status(201).json(rows[0]);
};

export const deleteUser = async (req: Request, res: Response) => {

};

export const updateUser = async (req: Request, res: Response) => {

};