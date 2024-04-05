const mongoose = require('mongoose');


const  userSchema = new mongoose.Schema({
    nom: { type : String , required : true },
    prenom :{type :String,required:true},
    email:{type:String,unique:true,lowercase:true,required:true},
    password : {type:String,required:true},
    dateCreation:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model( 'User',userSchema);