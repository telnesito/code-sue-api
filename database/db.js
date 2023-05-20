import pkg from 'pg'

const config = {
  user: 'postgres',
  host: 'localhost',
  password: '27728122',
  database: 'codesue'
}

export const pool = new pkg.Pool(config)