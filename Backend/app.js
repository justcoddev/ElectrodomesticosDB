const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const { json } = require('express')
const app = express()

app.use(express.json())
app.use(cors())
//Establecemos los prámetros de conexión
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'electrodomesticosdb',
  // insecureAuth: true
})
//Conexión a la database
conexion.connect(function (error) {
  if (error) {
    throw error
  } else {
    console.log("¡Conexión exitosa a la base de datos!")
  }
})
app.get('/', function (req, res) {
  res.send('Ruta INICIO')
})
//Mostrar todos los artículos
app.get('/api/clientes', (req, res) => {
  conexion.query('SELECT * FROM clientes', (error, filas) => {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})
//Mostrar un SOLO artículo
app.get('/api/clientes/:id', (req, res) => {
  conexion.query('SELECT * FROM clientes WHERE id = ?', [req.params.id], (error, fila) => {
    if (error) {
      throw error
    } else {
      res.send(fila)
    }
  })
})
//Crear un artículo
app.post('/api/clientes', (req, res) => {
  let data = { cedula: req.body.cedula, nombre: req.body.nombre, apellido: req.body.apellido, sexo: req.body.sexo, estado_civil: req.body.estado_civil, edad: req.body.edad }
  let sql = "INSERT INTO clientes SET ?"
  conexion.query(sql, data, function (err, result) {
    if (err) {
      throw err
    } else {
      /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
      Object.assign(data, { id: result.insertId }) //agregamos el ID al objeto data             
      res.send(data) //enviamos los valores                         
    }
  })
})
//Editar articulo
app.put('/api/clientes/:id', (req, res) => {
  let id = req.params.id
  let cedula = req.body.cedula
  let nombre = req.body.nombre
  let apellido = req.body.apellido
  let sexo = req.body.sexo
  let estado_civil = req.body.estado_civil
  let edad = req.body.edad
  let sql = "UPDATE clientes SET cedula = ?, nombre = ?, apellido = ?, sexo = ?, estado_civil= ?, edad = ? WHERE id = ?"
  conexion.query(sql, [cedula, nombre, apellido, sexo, estado_civil, edad, id], function (error, results) {
    if (error) {
      throw error
    } else {
      res.send(results)
    }
  })
})
//Eliminar articulo
app.delete('/api/clientes/:id', (req, res) => {
  conexion.query('DELETE FROM clientes WHERE id = ?', [req.params.id], function (error, filas) {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})
const puerto = process.env.PUERTO || 3000
app.listen(puerto, function () {
  console.log("Servidor Ok en puerto:" + puerto)
})