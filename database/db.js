// Importa las funciones que necesitas de los SDK que necesitas
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de la web app de Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBgEgqUoOixEFLcxLhv1DFFZ6NMzKI-9Vk",
	authDomain: "codesue-fa36f.firebaseapp.com",
	projectId: "codesue-fa36f",
	storageBucket: "codesue-fa36f.appspot.com",
	messagingSenderId: "462243194513",
	appId: "1:462243194513:web:b56f19c908cca76fdfc130",
	measurementId: "G-34MKB60NL5",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const services = { auth, db };
