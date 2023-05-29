// Importamos las funciones de autenticación y base de datos de Firebase
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updatePassword,
	deleteUser,
	signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { services } from "../database/db.js";

// Desestructuramos las funciones de autenticación y base de datos de Firebase
const { auth, db } = services;

// Función para iniciar sesión
const iniciarSesion = async (req, res) => {
	try {
		const { email, password } = req.body;
		// Iniciamos sesión con el correo electrónico y la contraseña proporcionados
		const response = await signInWithEmailAndPassword(auth, email, password);
		const { user } = response;

		// Devolvemos el usuario en la respuesta
		res.json(user);
		res.status(200);
	} catch ({ message, code }) {
		// Si se produce un error, devolvemos el mensaje de error y el código en la respuesta
		res.json(`${message} ${code}`);
		res.status(400);
	}
};

// Función para guardar los datos del usuario en la base de datos
const saveUserData = async ({ uid, email }) => {
	// Creamos una referencia al documento del usuario en la colección "users" de la base de datos
	const userDoc = doc(db, "users", uid);

	// Establecemos los datos del usuario en el documento correspondiente
	await setDoc(userDoc, {
		email,
	});
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

		// Guardamos los datos del usuario en la base de datos
		saveUserData({
			uid: user.uid,
			email: user.email,
		});

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
		res.json({ email, uid });
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

// Exportamos las funciones de autenticación para poder utilizarlas en otros archivos
export const metodosAuth = {
	iniciarSesion,
	crearCuenta,
	actualizarClave,
	cargarPerfil,
	borrarUsusario,
	cerrarSesion,
};
