const data = require('../data/studentJson.json');
const fs = require('fs');

const jsonPath = './src/data/studentJson.json';
 
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

        fs.writeFileSync(jsonPath,
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

            fs.writeFileSync(jsonPath,
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

const updateStudent = function(req,res){
    try
    {
        const studentID = Number(req.params.id);

        const index = data.students.findIndex(student =>{
            return student.id === studentID;
        })

        if(index === -1)
        {
            res.send(400).json({
                message : "Student not found"
            })
        }

        data.students[index] = req.body;

        fs.writeFileSync(jsonPath,
            JSON.stringify(data,null,1)
        );
        
        res.status(201).json({
             message : "Student Updated Successfully"
        });
    }
    catch(error)
    {
        
    }
}

module.exports ={
    getStudents,
    getNewStudent,
    deleteStudent,
    updateStudent
}