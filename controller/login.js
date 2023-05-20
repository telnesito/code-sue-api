import { pool } from "../database/db.js";

const getUsers = async (req, res) => {

  try {
    const { email, password } = req.body
    const response = await pool.query(`SELECT * FROM USUARIOS WHERE EMAIL = '${email}'  AND PASSWORD = '${password}'`)


    if (response.rowCount) {
      console.log(response.rows)
      res.json(response.rows)
      res.status(200)
    } else {
      res.send({ error: "El usuario no esta registrado" })
    }

  } catch (error) {
    res.send(error.message)
    res.status(400)

  }

}

export const metodos = {
  getUsers
}