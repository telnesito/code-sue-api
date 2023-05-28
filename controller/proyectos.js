import { doc, collection, setDoc, getDocs, deleteDoc } from "firebase/firestore"
import { services } from "../database/db.js"

const { db, auth } = services

const createProyecto = async (req, res) => {
  try {
    const { nombre, contenido, lenguaje, fecha } = req.body


    if (auth.currentUser) {
      const { uid } = auth.currentUser
      const projectDoc = doc(collection(db, 'users', uid, 'proyectos'))
      await setDoc(projectDoc,
        {
          nombre,
          contenido,
          lenguaje,
          fecha,
        }
      )
    } else {
      throw new Error("No existe un usuario logueado")
    }

    res.json('Proyecto creado')

  } catch (error) {
    res.json(error.message)

  }
}

const getProyetos = async (req, res) => {


  const proyectosData = [];

  try {

    if (auth.currentUser) {
      const { uid } = auth.currentUser
      const querySnapshot = await getDocs(collection(db, "users", uid, "proyectos"));

      querySnapshot.forEach((doc) => {
        const proyecto = doc.data();
        proyecto.id = doc.id
        proyectosData.push(proyecto);
      });
    } else {
      throw new Error("No existe un usuario logueado")
    }


    res.json(proyectosData);

  } catch (error) {
    res.json({ error: error.message });
  }
};

const deleteProyectos = async (req, res) => {
  try {

    const { uid } = auth.currentUser
    const { idProject } = req.body

    await deleteDoc(doc(db, 'users', uid, "proyectos", idProject))
    res.json(`Proyecto id: ${idProject} eliminado`)
  } catch (error) {
    res.json(error)

  }
}



export const metodosProjects = { getProyetos, createProyecto, deleteProyectos }