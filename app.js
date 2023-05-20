import express from "express";
import cors from 'cors'
import router from "./routes/routes.js";

const app = express()

app.listen(8000)
app.use(cors())
app.use(express.json())


app.use('/usuarios', router)

export default app