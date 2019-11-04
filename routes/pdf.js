const express = require('express');
const router = express.Router();

router.get('/pdf',(req,res)=>{
    res.render('pdf');
})

module.exports = router