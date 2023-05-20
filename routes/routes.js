import { Router } from "express";
import { metodos } from "../controller/login.js";

const router = Router()

router.post('/login', metodos.getUsers)
router.post('/create-account', metodos.setUsers)



export default router