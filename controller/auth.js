import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword, deleteUser, signOut, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";
import { setDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { services } from "../database/db.js";

// Desestructuramos las funciones de autenticación y base de datos de Firebase
const { auth, db } = services;


// Función para guardar los datos del usuario en la base de datos
const saveUserData = async ({ uid, email, state, provider }) => {
  // Creamos una referencia al documento del usuario en la colección "users" de la base de datos
  const userDoc = doc(db, "users", uid);

  // Establecemos los datos del usuario en el documento correspondiente
  await setDoc(userDoc, {
    uid, email, state
  });
};

// Función para iniciar sesión
const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Iniciamos sesión con el correo electrónico y la contraseña proporcionados
    const response = await signInWithEmailAndPassword(auth, email, password);
    const { user } = response;

    // Guardamos los datos del usuario en la base de datos
    saveUserData({
      uid: user.uid,
      email: user.email,
      state: user.emailVerified,

    });

    // Devolvemos el usuario en la respuesta
    res.json(user);
    res.status(200);
  } catch ({ message, code }) {
    // Si se produce un error, devolvemos el mensaje de error y el código en la respuesta
    res.json(`${message} ${code}`);
    res.status(400);
  }
};





// Función para crear una cuenta de usuario
const crearCuenta = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Creamos una nueva cuenta de usuario con el correo electrónico y la contraseña proporcionados
    const usuarioNuevo = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = usuarioNuevo;


    // Devolvemos el usuario en la respuesta
    res.json(user);
    res.status(200);
  } catch (error) {
    // Si se produce un error, devolvemos el mensaje de error y el código en la respuesta
    const { message, code } = error;
    res.status(400).json(`${message} ${code}`);
  }
};

// Función para actualizar la clave de un usuario
const actualizarClave = async (req, res) => {
  const { newPassowrd } = req.body;
  try {
    // Obtenemos el usuario actual
    const user = auth.currentUser;
    if (!user) {
      // Si no hay un usuario iniciado, devolvemos un mensaje de error
      // res.json('No hay usuario iniciado')
    }

    // Actualizamos la contraseña del usuario
    await updatePassword(user, newPassowrd);
    // Devolvemos un mensaje indicando que la clave se ha actualizado correctamente
    res.json("Clave actualizada");
  } catch (error) {
    // Si se produce un error, devolvemos el mensaje de error en la respuesta
    res.json(error);
  }
};

// Función para cargar el perfil de un usuario
const cargarPerfil = (req, res) => {
  const user = auth.currentUser;

  if (user !== null) {
    // Si hay un usuario iniciado, devolvemos su correo electrónico y su UID en la respuesta
    const email = user.email;
    const uid = user.uid;
    const username = user.displayName
    const emailVerified = user.emailVerified
    res.json({ email, uid, username, emailVerified });
  } else {
    // Si no hay un usuario iniciado, devolvemos un mensaje de error en la respuesta
    res.json({ Error: "No existe un usuario logueado" });
  }
};

// Función para borrar un usuario
const borrarUsusario = async (req, res) => {
  const user = auth.currentUser;

  try {
    // Borramos el usuario actual
    await deleteUser(user);

    // Devolvemos un mensaje indicando que el usuario se ha eliminado correctamente
    res.json("Usuario eliminado");
  } catch (error) {
    // Si se produce un error, devolvemos un mensaje de error en la respuesta
    res.json("Usuario no eliminado");
  }
};

// Función para cerrar sesión
const cerrarSesion = async (req, res) => {
  try {
    // Cerramos la sesión del usuario actual
    const response = await signOut(auth);
    // Devolvemos un mensaje indicando que la sesión se ha cerrado correctamente
    res.json("Sesion cerrada correctamente");
  } catch (error) {
    // Si no hay una sesión activa, devolvemos un mensaje de error en la respuesta
    res.json("No existe una sesion activa");
  }
};

const recuperarClave = async (req, res) => {
  const { email } = req.body

  try {
    const response = await sendPasswordResetEmail(auth, email)

    res.json('Correo de recuperacion enviado!')
  }
  catch (error) {
    res.json(error.message)

  }
}

const verificarCorreo = async (req, res) => {
  try {

    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser)
      res.json('Email de verificacion enviado')
    } else {
      throw new Error("No existe un usuario logueado")
    }
  } catch (error) {
    res.json(error.message)

  }
}

const obtenerUsuarios = async (req, res) => {
  const users = []
  const q = collection(db, "users")
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.forEach((doc) => {
      const { email, uid, state } = doc.data()
      users.push({
        email, uid, state
      })
    })
    unsubscribe()
    res.json(users)
  })


}


export const metodosAuth = { obtenerUsuarios, verificarCorreo, recuperarClave, iniciarSesion, crearCuenta, actualizarClave, cargarPerfil, borrarUsusario, cerrarSesion }
