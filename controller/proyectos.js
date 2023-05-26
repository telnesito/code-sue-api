import { doc, updateDoc } from "firebase/firestore"
import { services } from "../database/db.js"

const { db } = services

const createProyecto = async (req, res) => {
  try {
    const { nombre, contenido, lenguaje, fecha, uid } = req.body

    const projectRef = doc(db, 'users', uid)

    await updateDoc(projectRef, {
      "projects.nombre": nombre,
      "projects.contenido": contenido,
      "projects.lenguaje": lenguaje,
      "projects.fecha": fecha
    })

    res.json('Proyecto creado')
    console.error('hola')

  } catch (error) {
    res.json('Error')
    res.json(error.message)

  }
}

const getProyetos = async (req, res) => {

  try {
    console.log('Obteniendo proyectos')
    res.json('Obteniendo proyectos')
  } catch (error) {
    res.json(error.message)

  }

}


export const metodosProjects = { getProyetos, createProyecto }