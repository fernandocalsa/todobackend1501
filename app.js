//Load server
const express = require('express')
const app = express()
const port = 8000

//Load environment variables
require('dotenv').config();

//Connect to database
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_SERVER+"/"+process.env.DB_NAME+"?retryWrites=true&w=majority";
async function main() {
  await mongoose.connect(mongoDB);
}
main().catch(err => console.log(err));

//Load routes
const tasks = require('./routes/tasks')
app.use('/tasks', tasks)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})