const express = require('express');
const threadController = require('../controllers/threadController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, threadController.createThread);
router.get('/forum/:forumId', threadController.getThreadsByForum);
router.get('/:id', threadController.getThreadById);
router.put('/:id', authMiddleware, threadController.updateThread);
router.delete('/:id', authMiddleware, threadController.deleteThread);

module.exports = router;