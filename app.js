// Importamos Express y CORS
import express from "express";
import cors from "cors";

// Importamos las rutas para el login y proyectos
import loginRoutes from "./routes/loginRoutes.js";
import proyectosRoutes from "./routes/proyectosRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

// Creamos una instancia de Express
const app = express();
// Definimos el puerto en el que se ejecutará el servidor
const port = process.env.PORT || 8000;

// Iniciamos el servidor
app.listen(port);

// Utilizamos CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Configuramos Express para que pueda procesar solicitudes JSON
app.use(express.json());
// Imprimimos un mensaje en la consola para confirmar que el servidor se ha iniciado correctamente
console.log(`Server on port ${port}`);

// Definimos las rutas para el login y proyectos
app.use("/usuarios", loginRoutes);
app.use("/proyectos", proyectosRoutes);
app.use("/admin", adminRouter)

// Exportamos la aplicación para poder utilizarla en otros archivos
export default app;
