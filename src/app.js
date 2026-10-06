const express = require('express');
const path = require('path')
const app = express();

const PORT = process.env.PORT || 3000;

const StudentRouter = require('./routers/studentRouter.js');
app.use(cors());    
app.use(express.json());    

app.use('/student',StudentRouter);
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT,function(){
    console.log(`server is started on port ${PORT}....`);
}) 