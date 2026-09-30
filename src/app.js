const express = require('express');
const path = require('path')
const app = express();

const StudentRouter = require('./routers/studentRouter.js');
app.use(express.json());    

app.use('/student',StudentRouter);
app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000,function(){
    console.log('server is started on port 3000....');
}) 