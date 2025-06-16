const Project = require('../model/project')

const createProject = async (req, res) =>{
    try {
        const {title,description,tools,sourceCode,hostLink} = req.body
        
        const project = await Project.create({
            title:title,
            description:description,
            tools:tools,
            sourceCode:sourceCode,
            hostLink:hostLink,
            user:req.user.id
            })
        res.status(201).json({message: 'Project created successfully', project})
        } catch (error) {
            res.status(500).json({message: 'Error creating project', error})
            }
}

const getProject = async (req, res) =>{
    try{
        const project = await Project.find()
        res.status(200).json({project})
        } catch (error) {
            res.status(500).json({message: 'Error fetching project', error})
    }
}

const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found or not authorized' });
    }

    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
};


const deleteProject = async (req, res) =>{
    try {
        const project = await Project.findByIdAndDelete(req.params.id)
        if(!project) return res.status(404).json({message: 'Project not found'})
            res.status(200).json({message: 'Project deleted successfully', project})
        } catch (error) {
            res.status(500).json({message: 'Error deleting project', error})
            }

}

const getProjectById = async (req, res) =>{
    try{
        const project = await Project.findById({user:req.params.userId})
        if(!project) return res.status(404).json({message: 'Project not found'})
            res.status(200).json({project})
    }catch{
        res.status(500).json({message: 'Error fetching project', error})
    }
}

module.exports = {createProject,deleteProject,getProject,getProjectById,updateProject}
