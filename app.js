import express from "express";
import cors from 'cors'
import loginRoutes from "./routes/loginRoutes.js";
import proyectosRoutes from "./routes/proyectosRoutes.js";

const app = express()

app.listen(8000)
app.use(cors())
app.use(express.json())


app.use('/usuarios', loginRoutes)
app.use('/proyectos', proyectosRoutes)

export default app