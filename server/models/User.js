const mongoose = require('mongoose');


const userSchema =new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    role: {type:String, enum:["admin", "employee"], required: true},
    profileImage:{type:String},
    createAt:{type:Date, default: Date.now},
    updateAt:{type:Date, default: Date.now},

})

module.exports = mongoose.model('User', userSchema);
