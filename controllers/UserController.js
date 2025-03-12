const ProfileModel = require('../models/ProfileModel');
const User = require('../models/UserModel');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, bio, profilePicture } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }
    const user = new User({ name, email, password });
    await user.save();

    const profile = new ProfileModel({
      user: user._id,
      bio: bio || '',
      profilePicture: profilePicture || 'default-profile.jpg',
    });
    await profile.save();

    user.profile = profile._id;
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email já está em uso.' });
    }
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

exports.getUserById = async (req, res) => {
  try {

    const user = await User.findById(req.params.id).select('-password');
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
    const { name, email, password, bio, profilePicture } = req.body;


    if (name && (name.length < 2 || name.length > 50)) {
      return res.status(400).json({ error: 'Nome deve conter entre 2 e 50 caracteres.' });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Email inválido.' });
    }
    if (password && password.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres.' });
    }

    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.params.id) {
        return res.status(400).json({ error: 'Email já está em uso.' });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    if (bio || profilePicture) {
      await ProfileModel.findOneAndUpdate(
        { user: user._id },
        { bio, profilePicture },
        { new: true, runValidators: true }
      );
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await Book.updateMany(
      { borrowedBy: userId }, 
      { $set: { borrowedBy: null, isAvailable: true } } 
    );

    await ProfileModel.findOneAndDelete({ user: userId });

    await User.findByIdAndDelete(userId);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
};