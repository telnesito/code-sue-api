import { config } from "dotenv";


import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
config()

const app = initializeApp({
  credential: applicationDefault()
})

const authAdmin = getAuth(app)


// const authAdmin = getAuth();

export { authAdmin };