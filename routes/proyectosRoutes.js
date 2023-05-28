import { Router } from "express";
import { metodosProjects } from "../controller/proyectos.js";

const proyectosRoutes = Router()

proyectosRoutes.post('/crear-proyecto', metodosProjects.createProyecto)
proyectosRoutes.get('/ver-proyectos', metodosProjects.getProyetos)
proyectosRoutes.delete('/eliminar-proyecto', metodosProjects.deleteProyectos)


export default proyectosRoutes