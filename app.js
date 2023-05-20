import express from "express";
import cors from 'cors'
import loginRoutes from "./routes/loginRoutes.js";
import proyectosRoutes from "./routes/proyectosRoutes.js";

const app = express()
const port = process.env.PORT || 8000

app.listen(port)
app.use(cors())
app.use(express.json())
console.log(`Server on port ${port}`)

app.use('/usuarios', loginRoutes)
app.use('/proyectos', proyectosRoutes)

export default app