import { Router } from "express";
import { metodos } from "../controller/proyectos.js";
const proyectosRoutes = Router()

proyectosRoutes.get('/getProyectos', metodos.getProyetos)



export default proyectosRoutes