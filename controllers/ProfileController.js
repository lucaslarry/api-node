const ProfileModel = require('../models/ProfileModel');
const User = require('../models/UserModel');
const mongoose = require('mongoose');

exports.createProfile = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, bio, profilePicture } = req.body;


    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const existingProfile = await ProfileModel.findOne({ user: userId }).session(session);
    if (existingProfile) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: 'Este usuário já possui um perfil.' });
    }


    const profile = new ProfileModel({
      user: userId,
      bio: bio || '', 
      profilePicture: profilePicture || 'default-profile.jpg', 
    });
    await profile.save({ session });


    user.profile = profile._id;
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(profile);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (error.code === 11000) {
      res.status(400).json({ error: 'Este usuário já possui um perfil.' });
    } else {
      res.status(500).json({ error: 'Erro ao criar perfil.' });
    }
  }
};

exports.getProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }


    const profile = await ProfileModel.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil.' });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bio, profilePicture } = req.body;


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }


    if (bio && bio.length > 500) {
      return res.status(400).json({ error: 'A biografia deve ter no máximo 500 caracteres.' });
    }


    const profile = await ProfileModel.findOneAndUpdate(
      { user: userId },
      { bio, profilePicture },
      { new: true, runValidators: true } 
    );
    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar perfil.' });
  }
};

exports.deleteProfile = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId } = req.params;

    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }


    const profile = await ProfileModel.findOneAndDelete({ user: userId }).session(session);
    if (!profile) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }

    user.profile = null;
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(204).send(); 
  } catch (error) {

    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: 'Erro ao excluir perfil.' });
  }
};