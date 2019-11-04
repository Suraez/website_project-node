const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/myWeb');
var Schema = mongoose.Schema;
const { bookData } = require('./sell');

router.get('/index',(req,res)=>{
   bookData.find()
    .then((docs)=>{
        res.render('index',{items:docs});
    })
})

router.get('/',(req,res)=>{
    bookData.find()
    .then((docs)=>{
        res.render('index',{items:docs});
    })
})

module.exports = router