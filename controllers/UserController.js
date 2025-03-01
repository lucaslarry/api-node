const ProfileModel = require('../models/ProfileModel');
const User = require('../models/UserModel');

exports.createUser = async (req, res) => {
  try {
    const { name, email, bio, profilePicture } = req.body;


    if (!name || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
    }
    
    const user = new User({ name, email });
    await user.save();


    const profile = new ProfileModel({
      user: user._id,
      bio: bio || '', 
      profilePicture: profilePicture || 'default-profile.jpg', 
    });
    await profile.save();


    user.profile = profile._id;
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email já está em uso.' });
    } else {
      res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
  }
};



exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { name, email, profile } = req.body;


    if (name && (name.length < 2 || name.length > 50)) {
      return res.status(400).json({ error: 'Nome deve conter entre 2 e 50 caracteres.' });
    }
    if (name && !/^[A-Za-z\s]+$/.test(name)) {
      return res.status(400).json({ error: 'Nome deve conter apenas letras e espaços.' });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Email inválido.' });
    }


    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.params.id) {
        return res.status(400).json({ error: 'Email já está em uso.' });
      }
    }


    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
      runValidators: true, 
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    await ProfileModel.findOneAndDelete({ user: req.params.id });
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
};