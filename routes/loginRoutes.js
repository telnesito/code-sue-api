import { Router } from "express";
import { metodosAuth } from "../controller/auth.js";

const loginRoutes = Router()

loginRoutes.post('/login', metodosAuth.iniciarSesion)
loginRoutes.post('/create-account', metodosAuth.crearCuenta)



export default loginRoutes