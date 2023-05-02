# Introducción a Mongoose
Con este ejemplo trabajaremos la conexión de nuestro backend con mongoose. 

## Instalación de mongoose
```shell
$ npm init -y
$ npm install express
$ npm install mongoose
$ npm install nodemon --save-dev
```

## Preparar .env

`.env`
```
DB_USER="user"
DB_PASSWORD="password"
DB_NAME="db"
```

`app.js`
```js
require('dotenv').config();
```

## Preparar conexión con MongoDB
`app.js`
```js
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@nautes.vq3epru.mongodb.net/"+process.env.DB_NAME+"?retryWrites=true&w=majority";
async function main() {
  await mongoose.connect(mongoDB);
}
main().catch(err => console.log(err));
```

## Crear estructura de ficheros (scaffolding)
Estructuraremos los directorios de la siguiente forma:

```
├── app.js
├── models
├── controllers
└── routes
```
## Iteraciones

### Iteración #1
Crear un modelo en `models` para alumnos en un fichero `student.model.js`. Este modelo tendrá los siguientes campos

| Field       | Type        |
| ----------- | ----------- |
| first_name  | String      |
| last_name   | String      |
| birthyear   | Number      |

### Iteración #2
Insertar vuestros datos (o inventados) en nuestra base de datos

```js
Student.create({ first_name: 'Pepe', last_name: 'López', birthyear: 1978 })
  .then(studentDoc => console.log(`Student create worked well: ${studentDoc}`))
  .catch(error =>
    console.log(`Creating a new student went wrong! Try again 😞 ${err}`)
  );
```

```js
const mongoose = require('mongoose');

// here we are getting access to Schema class from mongoose
const Schema = mongoose.Schema;

// Schema defines the STRUCTURE of documents in the collection
// this is the BLUEPRINT for all instances
const studentSchema = new Schema({
  // name: String,
  first_name: String,
  last_name: String,
  birthyear: Number,
});

// Student is our mongoose model class
// all students in students collection will share these properties
// Mongoose turns models name to a collection name (Student --> students)
module.exports = mongoose.module("Student", catSchema);
```

### Iteración #3
Insertar varios alumnos a la vez

```js
Student.create([
    { first_name: 'Pepe', last_name: 'López', birthyear: 1978 }
    { first_name: 'Marta', last_name: 'Fernández', birthyear: 1982 }
])
  .then(studentDocs => console.log(`Multiple students created: ${studentDocs}`))
  .catch(error =>
    console.log(`Creating a new student went wrong! Try again 😞 ${err}`)
  );
```

### Iteración #4
Obtener la lista de alumnos

### Iteración #5
Obtener la lista de alumnos filtrado por nacidos después de 1980

### Iteración #6
Obtener un alumno por Id

### Iteración #7
Contar documentos

### Iteración #8
Modificar un documento a partir de su Id

### Iteración #9
Modificar varios documentos a partir de su nombre

### Iteración #10
Buscar un documento para modificar, si no lo encuentra, insertar uno nuevo

### Iteración #11
Eliminar un documento a partir de su Id

### Iteración #12
Eliminar varios documentos a partir de su nombre

### Iteración #13
Definir validación de datos en el modelo

| Field       | Type        | Validación                      |
| ----------- | ----------- | ------------------------------- |
| first_name  | String      | Requerido. Min 2 carácteres     |
| last_name   | String      | Requerido. Min 2 carácteres     |
| birthyear   | Number      | Requerido. Min: 1900. Max: 2020 |