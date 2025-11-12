const Thread = require('../models/Thread');

exports.createThread = async (req, res) => {
  try {
    const { title, content, forumId } = req.body;
    const thread = new Thread({ title, content, forum: forumId, createdBy: req.userId });
    await thread.save();
    res.status(201).json(thread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create thread' });
  }
};

exports.getThreadsByForum = async (req, res) => {
  try {
    const threads = await Thread.find({ forum: req.params.forumId });
    res.json(threads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch threads' });
  }
};

exports.getThreadById = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    res.json(thread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch thread' });
  }
};

exports.updateThread = async (req, res) => {
  try {
    const { title, content } = req.body;
    const thread = await Thread.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    res.json(thread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update thread' });
  }
};

exports.deleteThread = async (req, res) => {
  try {
    const thread = await Thread.findByIdAndDelete(req.params.id);
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    res.json({ message: 'Thread deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete thread' });
  }
};