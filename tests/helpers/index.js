const Task = require('../../models/task.model')

const cleanDatabase = () => {
    return Task.deleteMany()
}


const newTaskToAdd1 = {
    name: 'Prueba de los tests',
    status: 'PENDING'
}

const newTaskToAdd2 = {
    name: 'Prueba de los tests 22222',
    status: 'PENDING'
}

const newTaskToAdd3 = {
    name: 'Prueba de los tests extra en el POST suelto',
    status: 'PENDING'
}

const feedDatabase = () => {
    return Task.insertMany([newTaskToAdd1, newTaskToAdd2]);
}

const addSpecificTask = async () => {
    const doc = await Task.create(newTaskToAdd3);
    return doc._id;
}


module.exports = {
    cleanDatabase,
    feedDatabase,
    addSpecificTask
}