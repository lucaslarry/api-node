const Profile = require("../model/profile.js");


const createProfile = async (req, res) => {
  const { occupation, phone, address, personId } = req.body;

  if (!occupation || !phone || !address || !personId) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const newProfile = new Profile({
      occupation,
      phone,
      address,
      person: personId,
    });

    await newProfile.save();

    res.status(201).json({
      message: "Perfil criado com sucesso!",
      profile: newProfile,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erro ao criar perfil' });
  }
};


const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('person');
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfis' });
  }
};


const deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Profile.findByIdAndDelete(id);
    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado' });
    }

    res.status(200).json({ message: "Perfil removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover perfil' });
  }
};

const editProfile = async (req, res) => {
  const { id } = req.params;
  const { occupation, phone, address, personId } = req.body;

  if (!occupation || !phone || !address || !personId) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const profile = await Profile.findByIdAndUpdate(
      id,
      { occupation, phone, address, person: personId },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado' });
    }

    res.status(200).json({
      message: "Perfil atualizado com sucesso!",
      profile,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
};

module.exports = { createProfile, getAllProfiles, deleteProfile, editProfile };