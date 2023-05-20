import { Router } from "express";
import { metodosAuth } from "../controller/auth.js";

const loginRoutes = Router()

loginRoutes.post('/login', metodosAuth.iniciarSesion)
loginRoutes.post('/create-account', metodosAuth.crearCuenta)
loginRoutes.post('/update-password', metodosAuth.actualizarClave)



export default loginRoutes