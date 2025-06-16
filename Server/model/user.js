const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
        },
        password:{
            type:String,
            required:true
            },
            role:{
                type:String,
                default:'user'
            }

},{
    timestamps:true
})

const PfUser = mongoose.model('PfUser',registerSchema)
module.exports = PfUser