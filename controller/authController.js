const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

const secret = process.env.JWT_SECRET;


const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(200).json({ name: user.name, email: user.email });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        user.isCorrectPassword(password, (err, same) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao verificar senha' });
            }
            if (!same) {
                return res.status(401).json({ error: 'Email ou senha incorretos' });
            }

        
            const token = jwt.sign({ email }, secret, { expiresIn: '30d' });
            res.status(200).json({ user: { name: user.name, email: user.email }, token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};

module.exports = {
    login,
    register,
};