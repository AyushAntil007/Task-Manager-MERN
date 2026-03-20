const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware')
const {isAdmin} = require('../middleware/roleMiddleware');


const { 
    createTask,
    getTasks,
    deleteTask,
    updateTask
    
    } = require('../controllers/taskController');


//logged in users

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.put('/:id', authMiddleware, updateTask)


//admins

router.delete('/:id', authMiddleware, isAdmin, deleteTask)

module.exports = router;