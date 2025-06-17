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
            },
            apiKey:{
                type:String
            }

},{
    timestamps:true
})

const PfUser = mongoose.model('PfUser',registerSchema)
module.exports = PfUser