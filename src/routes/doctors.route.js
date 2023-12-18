import { Router } from "express";
import { loginDoctor } from "../controller/doctors.controller.js";

const router = Router()


router.post('/login',loginDoctor);

export default router;