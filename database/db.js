import pkg from 'pg'

const config = {
  user: 'carlosternera',
  host: 'dpg-chkfgsjhp8uej74a82a0-a',
  password: 'X0unXRwnJeM02sOT0dkWq91AKHXQlye3',
  database: 'codesuedb'
}

export const pool = new pkg.Pool(config)