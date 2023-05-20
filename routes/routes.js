import { Router } from "express";
import { metodos } from "../controller/login.js";

const router = Router()

router.post('/login', metodos.getUsers)


export default router