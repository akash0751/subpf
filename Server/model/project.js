const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PfUser',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    tools:{
        type: String,
        required: true
    },
    sourceCode:{
        type: String,
        required: true
    },
    hostLink:{
        type: String
    }
})

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;