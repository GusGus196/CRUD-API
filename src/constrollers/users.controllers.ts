import { Request, Response } from "express";
import { pool } from '../db.js'; 
import bcrypt from 'bcrypt';
import z from "zod";

// * podria implementarse user.model

const registerSchema = z.object({ // * Se podria implementar en un ./schemas/register.schema.ts
    email: z.string().email(),
    first_name: z.string().min(2, "Name must be at least 2 characters long").max(100),

    last_name: z.string().min(2, "Last name must be at least 2 characters long").max(100),

    password_hashed: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),    
})

export const getUsers = async(req: Request, res: Response) => {
    const { rows } = await pool.query('SELECT * FROM "Usuarios"');
    return res.json(rows);
};

export const getUser = async (req: Request, res: Response) => {
    const { rows } = await pool.query('SELECT * FROM "Usuarios" where id = $1', [req.params.id]);
    return res.json(rows[0]);
};

export const register = async (req: Request, res: Response) => { 
    try{
        const parsed = registerSchema.safeParse(req.body); //  Validation

        if (!parsed.success) {
            return res.status(400).json({
            success: false,
            message: "Invalid input data",
            errors: parsed.error.format()
            });
        }

        const {email, first_name, last_name, password_hashed} = parsed.data;


        const existingUser = await pool.query('SELECT * FROM "Usuarios" Where email = $1', [email]); 
        if (existingUser.rows.length > 0){
            return res.status(400).json({ message: "User already exists"});
        }

        const passwordHash = await bcrypt.hash(password_hashed, 10); // Hashing the password

        const { rows } = await pool.query(`INSERT INTO "Usuarios" (email, first_name, last_name, password_hashed) VALUES ($1, $2, $3, $4) RETURNING *`, [email, first_name, last_name, passwordHash]);
        return res.status(201).json({
            success: true,
            message: "Registration successful. Please check your email to verify your account.",
            user_id: rows[0].id,
            email: rows[0].email,
            verification_sent: true,
        });
    } catch (error) {
        console.error(error);
    }
};

export const deleteUser = async (req: Request, res: Response) => { // ! Validar si el usuario que lo borra es el mismo que el que se quiere borrar y borrar sus tareas asociadas
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM "Usuarios" WHERE ID = $1 RETURNING', [id]);
    if (rowCount === 0){
        return res.sendStatus(400).json({ message: 'User not found'});
    }
    return res.sendStatus(204).json({message: 'User deleted'});
};

export const updateUser = async (req: Request, res: Response) => { // ! Falta implementar PUT o PUSH

};

export const userLogin = async (req: Request, res: Response) => { // ! Falta implementar login
    const { email, password } = req.body;
}