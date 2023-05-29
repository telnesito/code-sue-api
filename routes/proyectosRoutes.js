// Importamos Router desde Express
import { Router } from "express";

// Importamos el controlador de proyectos
import { metodosProjects } from "../controller/proyectos.js";

// Creamos una instancia de Router
const proyectosRoutes = Router();

// Definimos las diferentes rutas para la gestión de proyectos
// Crear proyecto
proyectosRoutes.post("/crear-proyecto", metodosProjects.createProyecto);
// Ver proyectos
proyectosRoutes.get("/ver-proyectos", metodosProjects.getProyetos);
// Eliminar proyecto
proyectosRoutes.delete("/eliminar-proyecto", metodosProjects.deleteProyectos);
// Actualizar proyecto
proyectosRoutes.put("/actualizar-proyecto", metodosProjects.updateProyecto);

// Exportamos las rutas para poder utilizarlas en otros archivos
export default proyectosRoutes;
