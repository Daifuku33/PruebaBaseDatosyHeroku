const mysql = require('mysql2/promise')

class SqlClient {
  constructor () {
    // pool conexion dormida que cuando se solicita el pool está lista
    this.pool = mysql.createPool({ uri: process.env.DATABASE_URL })
    this.query = this.query.bind(this)
  }

  // pasamos las queries con un sistema de seguridad para evitar inyeccion de sql
  // como es un constructor que debe ir asincrónico usamos el async
  async query (sql, params) {
    // como estamos esperando una respuesta de la base de datos usamos el await
    const connection = await this.pool.getConnection()
    // cuando llegó la respuesta se ejecuta el sql con execute
    const response = await connection.execute(sql, params)
    // cerramos la conexión
    connection.release()
    // retornamos la respuesta
    return response
  }
}

module.exports = SqlClient
