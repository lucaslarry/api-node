const Project = require("../model/project.js");
const Task = require("../model/task.js");


const createProject = async (req, res) => {
  const { name, description, startDate, endDate, tasksIds } = req.body;

  if (!name || !description || !startDate || !endDate || !tasksIds) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      tasks: tasksIds,
    });

    await newProject.save();

    // Atualiza as tarefas associadas ao projeto
    await Task.updateMany(
      { _id: { $in: tasksIds } },
      { $push: { projects: newProject._id } }
    );

    res.status(201).json({
      message: "Projeto criado com sucesso!",
      project: newProject,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erro ao criar projeto' });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("tasks");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar projetos' });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    res.status(200).json({ message: "Projeto removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover projeto' });
  }
};

const editProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, tasks } = req.body;

  if (!name || !description || !startDate || !endDate || !tasks) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { name, description, startDate, endDate, tasks },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    res.status(200).json({
      message: "Projeto atualizado com sucesso!",
      project,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erro ao atualizar projeto' });
  }
};

module.exports = { createProject, getAllProjects, deleteProject, editProject };