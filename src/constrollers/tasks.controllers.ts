import { Router, Request, Response} from "express";
import { pool } from '../db.js';

export const getTasks = async(req: Request, res: Response) => {
    const { rows } = await pool.query('SELECT * FROM "Tareas"');
    return res.json(rows);
};

export const getTask = async (req: Request, res: Response) => {

};

export const createTask = async (req: Request, res: Response) => {

};

export const deleteTask = async (req: Request, res: Response) => {

};

export const updateTask = async (req: Request, res: Response) => {

};