import { pool } from "../database/db.js";

const getProyetos = async (req, res) => {

  try {

    console.log('Obteniendo proyectos')
    res.send('Obteniendo proyectos')
  } catch (error) {
    res.send(error.message)

  }

}


export const metodos = { getProyetos }