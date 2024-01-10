const Task = require('../models/task.model')


const sumar = (a, b) => a + b;


const getTasks = (req, res) => {
    console.log('query', req?.query)
    if (req.params.taskId) {
        Task.findById(req.params.taskId)
            .then(taskDoc => {
                if (taskDoc === null) {
                    res.status(404).send({ msg: "No se han encontrado tareas" })
                } else {
                    res.status(200).send(taskDoc)
                }
            })
            .catch(error => {
                console.log(error);
                switch (error.name) {
                    case 'CastError':
                        res.status(400).send('Formato de id inválido')
                        break;
                    default:
                        res.status(400).send(error)
                }
            })
    } else {

        let filter = {}

        if (req.query?.status) {
            filter.status = req.query.status
        }

        //TODO: Find by text search

        //TODO: Find by datemax is not working properly
        if (req.query.datemax) {
            filter.dueDate = { $lte: new Date(req.query.datemax) }
        }

        console.log(req.query.status, filter)
        Task.find(filter)
            .then(taskDocs => {
                if (taskDocs.length === 0) {
                    res.status(404).send({ msg: "No se han encontrado tareas" })
                } else {
                    res.status(200).send(taskDocs)
                }

            })
            .catch(error => res.status(400).send(error))
    }

}

const addTask = (req, res) => {
    Task.create(
        {
            name: req.body.name,
            dueDate: req.body.dueDate,
        }
    ).then(taskDoc => res.status(200).send(taskDoc))
        .catch(error => {
            console.log(error.code)
            switch (error.code) {
                default:
                    res.status(400).send(error)
            }
        })
}

const deleteTask = (req, res) => {
    Task.findOneAndUpdate(
        {
            _id: req.params.taskId,
            status: { $ne: "DELETED" }
        }
        ,
        {
            status: "DELETED",
            deletedAt: new Date()
        },
        {
            timestamps: false
        }
    )
        .then(taskDoc => {
            if (taskDoc === null) {
                res.status(404).send({ msg: "No se han encontrado la tarea" })
            } else {
                res.status(200).send({ msg: "ok" })
            }
        })
        .catch(error => {
            switch (error.name) {
                case 'CastError':
                    res.status(400).send({ msg: 'Formato de id inválido' })
                    break;
                default:
                    res.status(400).send(error)
            }
        })
}

const updateTask = (req, res) => {
    Task.findByIdAndUpdate(
        req.params.taskId,
        {
            name: req.body.name,
            dueDate: req.body.dueDate,
            status: req.body.status
        },
        { new: true }
    )
        .then(taskDoc => {
            console.log(taskDoc)
            if (taskDoc === null) {
                res.status(404).send({ msg: "No se han encontrado la tarea" })
            } else {
                res.status(200).send(taskDoc)
            }
        })
        .catch(error => {
            switch (error.name) {
                case 'CastError':
                    res.status(400).send({ msg: 'Formato de id inválido' })
                    break;
                default:
                    res.status(400).send(error)
            }
        })
}

module.exports = {
    getTasks,
    addTask,
    deleteTask,
    updateTask,
    sumar
}