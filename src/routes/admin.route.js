import {Router} from 'express'
import { loginAdmin, createDoctor } from '../controller/admin.controller.js';
const router = Router();

//ruta para conectarse el administrador primero tiene que ver si existe alguien cargado como administrador sino lo crea automaticamente
router.post('/login', loginAdmin);
router.post('/create', createDoctor)


export default router;
