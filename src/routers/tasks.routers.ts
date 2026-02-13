import { Router} from "express";
import { getTasks, getTask, createTask, deleteTask, updateTask } from '../constrollers/tasks.controllers.js';
import { z } from "zod";

const router = Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);
router.post('/tasks', createTask);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/:id', updateTask);

export default router;