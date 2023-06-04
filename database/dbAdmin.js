import { config } from "dotenv";
// const serviceAccount = require('./credentials/firebase.json');
import admin from 'firebase-admin';

import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = {
  "type": "service_account",
  "project_id": "codesue-fa36f",
  "private_key_id": "48fa0aba6c2fdd54d03178ccbcc878173cbb1128",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDXZ1gEj6Tf1ppJ\nT0S1KO683HRvTdy2D+almn6E6yAyazKXs2MlV0Zv7F25+K7ftK+oVHF89F6K8ayg\nijQuu7cSso9A7/Uv7kzmUUEJ/2xcu1KaFsg3bLRZyni8D6y+XfJ8SjwWHyqgbaoK\nKuqEakMDBa+GI2x0EwdRpdZMEEWjzqouzRJ3TSfp5J40xE/jR5T3TY1JrE9QPA/y\nwUjFikT/jGIu5WbuTlZX9R2ArlkrwTXcTrnZgafHFX42e/g8xvOjuT0+MKzc7mvu\nRgWPAyIcwvmRTsmCrywAQjkCGdrFiwOyZ4OBdIcgT4P5ieaAOFCsJoZYoxwyQW8x\n6ze4TaXnAgMBAAECggEAAwJPEPU+vN+/FQIV+B/jweCkgb+JM0PimXKgjNPKBdpI\ngSUA4A8pjTu0jXoDW12nTIctdKznOzKoEjAMDZESvCChbqtLdglyqo79BRo71cnK\nHBvwXRHYLR7uc9YWOCyQzBqvXzG9QzN0+iJiV0oyuHKWYp3REIgJhKL37OUXS/P7\nDMpkcj9EoZR55rYhihLmbZ2V+oZ2pGPLslmqI0UHirSWRJ1Dwijqp/hyYxhgV/NJ\n/mCVglt/OGiRM94X/E7a36aJXhc+MCuh+vyWQlznnXcIdvxVG+yThq2GZ/UhzQhx\nhcjTxF02JySho23nzvJzli7K0aO9qLNqunrRKFMunQKBgQD0JxCX6+Ud2D6bGYUd\nWSfJ5Ij+CMXUx9/kgEJMqUetcp/qF5lW6S3xuOoAFC5M73jIS0iyfZJyuTsQ7CQb\nnyaXevYfFYifMOsQVNXBJqCvNOisBRWdBbgdTUG6fkunmo7vLCLi2xbkJ3Iy6tNw\nvuuI2RYxRTE53Yd882lcJFl0dQKBgQDh2ybPpweZ+vfy1ePUG4xJ4WjQp9HhDr0t\nOVnMLCb2I5uGJ+0GQQ7T8eys3I6+06osgZ9MBjn8dK0YlMgIr0mf0+uE4v9/yN1t\nCvLswhl40HZa9vVWXFYlI2X51gFwgBAyqR+zwDzGho6FwB/0DHKFYAfNnWzEbU/8\nnowGmd71awKBgE3AzxkCp+GcRzvPocPZ68DxBeuY0Z/U02mKqxKM6mXDVkgPoea6\ntcYANI034BLiRJ3M0+b79JKSiMv31/vv8DNXlmAJ1IuV4ZY+3h/39D435E08BUkP\nVDYIr4D7zY4fu5tRe/6w9RZNtaGfhRynwIzBTb79IRMjiI1zWz9b2B0tAoGAZmNB\nLvXbnlSFvxJz3B449O045Q6POOXDoRLUwJhreT4fLSxAaYtou3B7CMpb8+pkxRRm\nMMLJ2sbSCci4/iboy4n4xR9bEITwzJQgGHDNt1VZslcuVV46t09a1W3M7UFBFpZR\nBt3pL16kkcHNOofCCvDD2NS7EDk1/6GofP2Yc80CgYBKNHAXfjXcWT6xcW8Rtswg\n93uk6pfGB5ZDp6Tq7SE/MGcwgjMkNfrpXbP3bb6FbBHx4cs1su/oH/HZfI1Amw+P\nHJUvIQHj50JzX+mPGRkO9B4s2+WhBv60M3WEkBm4W6mQEfI56moMzWKrKrWxFaAB\nSNFo+hJtwxqnsyZGoyr04w==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-jiu7a@codesue-fa36f.iam.gserviceaccount.com",
  "client_id": "114983186207582121879",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jiu7a%40codesue-fa36f.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


const app = initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const authAdmin = getAuth(app)



export { authAdmin };