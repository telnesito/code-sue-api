import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { services } from '../database/db.js'

const { auth } = services

const iniciarSesion = async (req, res) => {

  try {
    const { email, password } = req.body

    const response = await signInWithEmailAndPassword(auth, email, password)

    const { user } = response

    res.json(user)
    res.status(200)

  } catch ({ message, code }) {
    res.json(`${message} ${code}`)
    res.status(400)
  }

}

const crearCuenta = async (req, res) => {
  try {

    const { email, password } = req.body

    const usuarioNuevo = createUserWithEmailAndPassword(auth, email, password)
    const { user } = usuarioNuevo

    res.json('Usuario creado correctamente')
    res.status(200)


  } catch ({ message, code }) {

    res.json(`${message} ${code}`)
    res.status(400)

  }
}

export const metodosAuth = { iniciarSesion, crearCuenta }