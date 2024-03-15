const mongoose = require('mongoose');


const  articleSchema = new mongoose.Schema({
    titre: { type : String , required : true },
    contenu :{type :String,required:true},
    auteur:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    password : {type:String,required:true},
    datePublication:{
        type:Date,
        default: Date.now
    },
    tags:{
        type: [String]
    },
    categorie: {
        type: String
    },
    statut:{
        type:String,
        enum:['publié','en attente de publication'],
        default:'en attente de publication',
    }
});

module.exports = mongoose.model( 'Article',articleSchema);