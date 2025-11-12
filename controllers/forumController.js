const Forum = require('../models/Forum');

exports.createForum = async (req, res) => {
  try {
    const { name, description } = req.body;
    const forum = new Forum({ name, description, createdBy: req.userId });
    await forum.save();
    res.status(201).json(forum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create forum' });
  }
};

exports.getAllForums = async (req, res) => {
  try {
    const forums = await Forum.find();
    res.json(forums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch forums' });
  }
};

exports.getForumById = async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id);
    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }
    res.json(forum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch forum' });
  }
};

exports.updateForum = async (req, res) => {
  try {
    const { name, description } = req.body;
    const forum = await Forum.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }
    res.json(forum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update forum' });
  }
};

exports.deleteForum = async (req, res) => {
  try {
    const forum = await Forum.findByIdAndDelete(req.params.id);
    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }
    res.json({ message: 'Forum deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete forum' });
  }
};