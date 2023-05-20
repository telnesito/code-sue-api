0
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

const setUsers = async (req, res) => {
  try {
    const { email, password, username, preguntaSeguridad, respuestaSeguridad } = req.body
    const response = await pool.query(`INSERT INTO USUARIOS(email,username, password,preguntaSeguridad, respuestaSeguridad)values('${email}', '${username}', '${password}', '${preguntaSeguridad}', '${respuestaSeguridad}' )`)

    res.json(response)
    console.log(req.body)


  } catch (error) {
    res.status(500)
    res.send(error.message)
  }
}

export const metodos = {
  getUsers, setUsers
}