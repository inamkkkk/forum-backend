const express = require('express');
const forumController = require('../controllers/forumController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, forumController.createForum);
router.get('/', forumController.getAllForums);
router.get('/:id', forumController.getForumById);
router.put('/:id', authMiddleware, forumController.updateForum);
router.delete('/:id', authMiddleware, forumController.deleteForum);

module.exports = router;