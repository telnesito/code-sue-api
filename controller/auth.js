import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword, deleteUser } from "firebase/auth";
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

    const usuarioNuevo = await createUserWithEmailAndPassword(auth, email, password)
    const { user } = usuarioNuevo
    res.json(user)
    res.status(200)


  } catch (error) {
    const { message, code } = error;
    res.status(400).json(`${message} ${code}`);
  }
}

const actualizarClave = async (req, res) => {

  const { newPassowrd } = req.body
  try {
    const user = auth.currentUser;
    if (!user) {
      // res.json('No hay usuario iniciado')
    }
    await updatePassword(user, newPassowrd)
    res.json('Clave actualizada')

  } catch (error) {
    res.json(error)
  }
}

const cargarPerfil = (req, res) => {
  const user = auth.currentUser;

  if (user !== null) {
    const email = user.email
    const uid = user.uid
    res.json({ email, uid })
  } else {
    res.json({ 'Error': 'No existe un usuario logueado' })
  }
}

const borrarUsusario = async (req, res) => {
  const user = auth.currentUser

  try {
    await deleteUser(user)
    res.json('Usuario eliminado')

  } catch (error) {

    res.json("Usuario no eliminado")

  }

}


export const metodosAuth = { iniciarSesion, crearCuenta, actualizarClave, cargarPerfil, borrarUsusario }