const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); 
const userController = require('./UserController');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        userController.createUser({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }


        user.isCorrectPassword(password, (err, same) => {
            if (err || !same) {
                return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
            }


            const token = jwt.sign({ email }, secret, { expiresIn: '1d' });
            res.status(200).json({ user, token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente.' });
    }
};

module.exports = {
    login,
    register,
};