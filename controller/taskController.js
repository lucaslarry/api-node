const Task = require("../model/task.js");

const createTask = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'O título é obrigatório' });
  }

  try {
    const newTask = new Task({
      title,
      finished: false,
    });

    await newTask.save();

    res.status(201).json({
      message: "Tarefa criada com sucesso!",
      task: newTask,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.status(200).json({ message: "Tarefa removida com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover tarefa' });
  }
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const { title, finished } = req.body;

  if (!title || typeof finished !== 'boolean') {
    return res.status(400).json({ error: 'Título e status são obrigatórios' });
  }

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, finished },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.status(200).json({
      message: "Tarefa atualizada com sucesso!",
      task,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

module.exports = { getAllTasks, createTask, editTask, deleteTask };