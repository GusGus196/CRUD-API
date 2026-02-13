import express from 'express';  
import { PORT } from "./config.js";
import tasksRouters from './routers/tasks.routers.js';
import usersRouters from './routers/users.routers.js';
// import morgan from 'morgan';
const app = express();

app.use(express.json());
// app.use(morgan('start'));
app.listen(PORT);
app.use(tasksRouters);
app.use(usersRouters);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

