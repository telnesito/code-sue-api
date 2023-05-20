import { Router } from "express";
const proyectosRoutes = Router()

proyectosRoutes.get('/getProyectos', () => console.log('obtener proyectos'))



export default proyectosRoutes