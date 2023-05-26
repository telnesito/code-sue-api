import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword, deleteUser, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { services } from '../database/db.js'

const { auth, db } = services

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

const saveUserData = async ({ uid, email }) => {

  const userDoc = doc(db, 'users', uid)
  await setDoc(userDoc, {
    email,
    projects: [{

    }]
  })

}

const crearCuenta = async (req, res) => {
  try {

    const { email, password } = req.body

    const usuarioNuevo = await createUserWithEmailAndPassword(auth, email, password)
    const { user } = usuarioNuevo
    saveUserData({
      uid: user.uid,
      email: user.email,
      projects: [{

      }]


    })
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

const cerrarSesion = async (req, res) => {
  try {
    const response = await signOut(auth)
    res.json("Sesion cerrada correctamente")
  } catch (error) {
    res.json("No existe una sesion activa")
  }
}


export const metodosAuth = { iniciarSesion, crearCuenta, actualizarClave, cargarPerfil, borrarUsusario, cerrarSesion }