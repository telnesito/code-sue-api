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

export const metodosAdmin = { getProjectsByUId }