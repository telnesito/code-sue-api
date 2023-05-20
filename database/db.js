import pkg from 'pg'

const config = {
  user: 'postgres',
  host: 'localhost',
  password: 'pas123',
  database: 'codesue'
}

export const pool = new pkg.Pool(config)