// Importamos Router desde Express
import { Router } from "express";
// Importamos el controlador de autenticación
import { metodosAuth } from "../controller/auth.js";

// Creamos una instancia de Router
const loginRoutes = Router();

// Definimos las diferentes rutas para la autenticación
// Iniciar sesión
loginRoutes.post("/login", metodosAuth.iniciarSesion);
// Crear cuenta
loginRoutes.post("/create-account", metodosAuth.crearCuenta);
// Actualizar clave
loginRoutes.post("/update-password", metodosAuth.actualizarClave);
// Cargar perfil
loginRoutes.get("/get-profile", metodosAuth.cargarPerfil);
// Borrar usuario
loginRoutes.delete("/delete-user", metodosAuth.borrarUsusario);
// Cerrar sesión
loginRoutes.get("/logout", metodosAuth.cerrarSesion);

// Exportamos las rutas para poder utilizarlas en otros archivos
export default loginRoutes;
