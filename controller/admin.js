import { services } from "../database/db.js";
import {
  doc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const { db, auth } = services

const getProjectsByUId = async (req, res) => {

  const { uid } = req.body

  const proyectosData = [];
  try {
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

    // Devolvemos los proyectos en la respuesta
    res.json(proyectosData);
  } catch (error) {
    // Si se produce un error, devolvemos el mensaje de error en la respuesta
    res.json({ error: error.message });
  }
}

// Función para eliminar un proyecto
const deleteProjectById = async (req, res) => {
  const { idProject, uid } = req.body;

  try {
    // Borramos el documento del proyecto correspondiente a partir de su ID
    await deleteDoc(doc(db, "users", uid, "proyectos", idProject));
    // Devolvemos un mensaje indicando que el proyecto se ha eliminado correctamente
    res.json(`Proyecto id: ${idProject} eliminado`);

  } catch (error) {
    // Si se produce un error, devolvemos el mensaje de error en la respuesta
    res.json(error);
  }
};

// Función para eliminar un usuario
const deleteUserById = async (req, res) => {
  const { uid } = req.body;

  try {
    // Borramos el documento del proyecto correspondiente a partir de su ID
    await deleteDoc(doc(db, "users", uid));
    // Devolvemos un mensaje indicando que el proyecto se ha eliminado correctamente
    res.json(`Usuario id: ${uid} eliminado`);

  } catch (error) {
    // Si se produce un error, devolvemos el mensaje de error en la respuesta
    res.json(error);
  }
};


export const metodosAdmin = { getProjectsByUId, deleteProjectById, deleteUserById }