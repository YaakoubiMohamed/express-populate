const mongoose = require('mongoose');


const  articleSchema = new mongoose.Schema({
    titre: { type : String , required : true },
    contenu :{type :String,required:true},
    auteur:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    },
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
        enum:['publie','draft'],
        default:'draft',
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model( 'Article',articleSchema);