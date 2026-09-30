const data = require('../data/studentJson.json');
const fs = require('fs');

const getStudents = function(req,res){
    try
    {
        res.json(data.students);
    }
    catch(error)
    {
        res.send(404,error);
    }
}

const getNewStudent = function(req ,res){
    try
    {
        const newStudent = req.body;

        data.students.push(newStudent);

        fs.writeFileSync('./src/data/studentJson.json',
            JSON.stringify(data, null, 2));

        res.status(201).json(newStudent);
    }
    catch(error)
    {
        res.status(500).send(error);
    }

}

const deleteStudent = function(req,res){
    try{
        const studentID = Number(req.params.id);

        const index = data.students.findIndex(student =>
            student.id === studentID
        )

        if(index !== -1)
        {
            data.students.splice(index,1);

            fs.writeFileSync('./src/data/studentJson.json',
                JSON.stringify(data,null,1)
            );
            res.status(201).json({
                message : "Student Deleted Successfully"
            });
        }
    }
    catch(error)
    {
        res.status(500).send(error);
    }
}

module.exports ={
    getStudents,
    getNewStudent,
    deleteStudent
}