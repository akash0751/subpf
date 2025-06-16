const express = require('express');
const router = express.Router();
const {createProject,deleteProject,getProject,getProjectById,updateProject} = require('../contoller/project')
const authMiddleware = require('../middleware/userAuth')

router.post('/add',authMiddleware,createProject)
router.delete('/delete/:id',authMiddleware,deleteProject)
router.get('/get',getProject)
router.get('/get/:UserId',getProjectById)
router.put('/update/:id',authMiddleware,updateProject)

module.exports = router;