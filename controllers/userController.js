const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const mySalt = 10;
const mySecret = process.env.JWT_SECRET

const addUser = async (req, res) => {
    // encriptamos la password
    const encryptedPassword = await bcrypt.hash(req.body.password, mySalt)
    UserModel.create(
        {
            email: req.body.email,
            password: encryptedPassword,
        }
    ).then(userDoc => res.status(200).send(userDoc))
        .catch(error => {
            console.log(error.code)
            switch (error.code) {
                default:
                    res.status(400).send(error)
            }
        })
}

const checkUser = async (req, res) => {
    const { email, password } = req.body;

    // compruebo que el user existe
    const [userFound] = await UserModel.find({ email: email });
    if (!userFound) return res.status(404).json({ msg: 'User not found' })

    // si el user existe, compruebo que la contraseña coincida
    if (await bcrypt.compare(password, userFound.password)) {
        // genero un jwt o token para enviarselo al cliente
        const token = jwt.sign(
            {
                email: userFound.email,
                id: userFound._id
            },
            mySecret,
            { expiresIn: 3600 })

        return res.status(200).json({ msg: 'Hola estas logueado', token })
    }
    return res.status(404).json({ msg: 'Password does not match' })

}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) res.status(404).json({ msg: 'Missing token!!!!' })
    try {
        const tokenPayload = jwt.verify(token, mySecret)
        req.userId = tokenPayload.id
        return next()
    } catch (error) {
        return res.status(404).json({ msg: 'Token not valid or expired' })
    }

}

module.exports = {
    addUser,
    checkUser,
    verifyToken
}