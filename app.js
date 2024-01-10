//Load server
const express = require('express')
const app = express();
require('dotenv').config();


const port = process.env.PORT || 8000;

const cors = require('cors');


//Load environment variables

app.use(express.json())
app.use(cors())

//Connect to database
const mongoose = require("mongoose");
const connectionStringToDB = `mongodb://localhost:27017/${process.env.DB_NAME}?retryWrites=true&w=majority` 

async function main() {
  return await mongoose.connect(connectionStringToDB);
}
main()
  .then(() => console.log('Estamos conectados a la DB'))
  .catch(err => console.log(err));


//Load routes
const tasks = require('./routes/tasks');
const routerUsers = require('./routes/users')

app.use('/tasks', tasks)
app.use('/users', routerUsers)


//Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


module.exports = app