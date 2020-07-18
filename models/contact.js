// it will be called from the same instance as mongoose library in index.js
// if that is called before this 
const mongoose = require('mongoose');

//create a schema
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});


// 'Contact' is the name of the collection in the database 
// we can name it whatever we want
const Contact = mongoose.model('Contact', contactSchema);


module.exports = Contact;