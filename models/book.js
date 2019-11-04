const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    book_name:{type:String,required:true},
    book_price:{type:Number,required:true}
},{collection: 'book_data'});

module.exports = mongoose.model('bookData',bookSchema);