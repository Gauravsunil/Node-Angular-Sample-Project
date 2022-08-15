// now here we are going to create schema

const mongoose = require('mongoose')
const schema = mongoose.Schema;
let book = new schema({
    name:{
        type:String
    },
    price:{
        type:String
    },
    description:{
        type:String
    }  
},
{
    collection:'books'
})

module.exports = mongoose.model('Book', book)