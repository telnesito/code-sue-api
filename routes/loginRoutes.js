import { Router } from "express";
import { metodos } from "../controller/login.js";

const loginRoutes = Router()

loginRoutes.post('/login', metodos.getUsers)
loginRoutes.post('/create-account', metodos.setUsers)



export default loginRoutes