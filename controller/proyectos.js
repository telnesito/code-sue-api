// Importamos las funciones de Firebase Firestore
import {
	doc,
	collection,
	setDoc,
	getDocs,
	deleteDoc,
	updateDoc,
} from "firebase/firestore";
import { services } from "../database/db.js";

// Desestructuramos las funciones de autenticación y base de datos de Firebase
const { db, auth } = services;

// Función para crear un proyecto
const createProyecto = async (req, res) => {
	try {
		const { nombre, contenido, lenguaje, fecha, ultimoCambio } = req.body;

		// Comprobamos si hay un usuario iniciado
		if (auth.currentUser) {
			const { uid } = auth.currentUser;
			// Creamos una referencia al documento del proyecto en la colección "proyectos" del usuario correspondiente

			const projectDoc = doc(collection(db, "users", uid, "proyectos"));
			// Establecemos los datos del proyecto en el documento correspondiente
			await setDoc(projectDoc, {
				nombre,
				contenido,
				lenguaje,
				fecha,
				ultimoCambio,
			});
		} else {
			throw new Error("No existe un usuario logueado");
		}
		// Devolvemos un mensaje indicando que el proyecto se ha creado correctamente
		res.json("Proyecto creado");
	} catch (error) {
		// Si se produce un error, devolvemos el mensaje de error en la respuesta
		res.json(error.message);
	}
};

// Función para obtener los proyectos de un usuario
const getProyetos = async (req, res) => {
	const proyectosData = [];

	try {
		// Comprobamos si hay un usuario iniciado
		if (auth.currentUser) {
			const { uid } = auth.currentUser;

			// Obtenemos todos los documentos de la colección "proyectos" del usuario correspondiente
			const querySnapshot = await getDocs(
				collection(db, "users", uid, "proyectos")
			);

			// Iteramos sobre los documentos y añadimos los datos de cada proyecto al array proyectosData
			querySnapshot.forEach((doc) => {
				const proyecto = doc.data();
				proyecto.id = doc.id;
				proyectosData.push(proyecto);
			});
		} else {
			throw new Error("No existe un usuario logueado");
		}
		// Devolvemos los proyectos en la respuesta
		res.json(proyectosData);
	} catch (error) {
		// Si se produce un error, devolvemos el mensaje de error en la respuesta
		res.json({ error: error.message });
	}
};

// Función para eliminar un proyecto
const deleteProyectos = async (req, res) => {
	try {
		// Comprobamos si hay un usuario iniciado
		if (auth.currentUser) {
			const { uid } = auth.currentUser;
			const { idProject } = req.body;
			// Borramos el documento del proyecto correspondiente a partir de su ID
			await deleteDoc(doc(db, "users", uid, "proyectos", idProject));
			// Devolvemos un mensaje indicando que el proyecto se ha eliminado correctamente
			res.json(`Proyecto id: ${idProject} eliminado`);
		} else {
			throw new Error("No existe un usuario logueado");
		}
	} catch (error) {
		// Si se produce un error, devolvemos el mensaje de error en la respuesta
		res.json(error);
	}
};

// Función para actualizar un proyecto
const updateProyecto = async (req, res) => {
	try {
		// Comprobamos si hay un usuario iniciado
		if (auth.currentUser) {
			const { uid } = auth.currentUser;
			const { idProject, contenido, ultimoCambio } = req.body;
			// Creamos una referencia al documento del proyecto que queremos actualizar
			const projectRef = doc(db, "users", uid, "proyectos", idProject);

			// Actualizamos los datos del proyecto
			await updateDoc(projectRef, {
				contenido,
				ultimoCambio,
			});
			// Devolvemos un mensaje indicando que el proyecto se ha actualizado correctamente
			res.json("Archivo actualizado");
		} else {
			throw new Error("No existe un usuario logueado");
		}
	} catch (error) {
		// Si se produce un error, devolvemos el mensaje de error en la respuesta
		res.json({ error: error.message });
	}
};

// Exportamos las funciones de los controladores
export const metodosProjects = {
	getProyetos,
	createProyecto,
	deleteProyectos,
	updateProyecto,
};
