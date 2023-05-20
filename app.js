import express from "express";
import cors from 'cors'

const app = express()

app.listen(8000)
app.use(cors())
app.use(express.json())

export default app