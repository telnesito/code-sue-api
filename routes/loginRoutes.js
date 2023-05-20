import { Router } from "express";
import { metodosAuth } from "../controller/auth.js";

const loginRoutes = Router()

loginRoutes.post('/login', metodosAuth.iniciarSesion)
loginRoutes.post('/create-account', metodosAuth.crearCuenta)
loginRoutes.post('/update-password', metodosAuth.actualizarClave)
loginRoutes.get('/get-profile', metodosAuth.cargarPerfil)
loginRoutes.delete('/delete-user', metodosAuth.borrarUsusario)
loginRoutes.get('/logout', metodosAuth.cerrarSesion)






export default loginRoutes