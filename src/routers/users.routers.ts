import { Router} from "express";
import { getUsers, getUser, register, deleteUser, updateUser } from '../constrollers/users.controllers.js';


const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', register);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

export default router;