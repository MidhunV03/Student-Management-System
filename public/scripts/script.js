const studentDetails = document.getElementById('studentDetailsRow');
let allStudents = [];

function renderStudent(data)
{
        studentDetails.innerHTML = '';

        data.forEach(element => {
            const row = document.createElement('tr');

            row.innerHTML = `
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.age}</td>
            <td>${element.course}</td>

            <td>
            <button class="btn btn-danger deleteBtn" data-id="${element.id}"><i class="bi bi-trash3"></i></button>
            <button class="btn btn-warning editBtn" data-id="${element.id}"><i class="bi bi-pen"></i></button>
            </td>
            `

            studentDetails.appendChild(row);
        });
}

async function getStudents() {
    
    try{        
        const response = await fetch('/student/');
        const data = await response.json();
        
        const sortedData = data.sort((a,b) => a.id - b.id)
        allStudents = sortedData;
        // console.log(allStudents);
        renderStudent(sortedData);
    }
    catch(error)
    {
        console.log(error);
    }

}

document.getElementById('addBtn').addEventListener('click',async function(){

    const studentDetailsToAdd  = {
        id : Number(document.getElementById('idEntryModal').value),
        name : document.getElementById('nameEntryModal').value,
        age : Number(document.getElementById('ageEntryModal').value),
        course : document.getElementById('courseEntryModal').value,
    }

    try
    {
        const response = await fetch('/student/',{
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(studentDetailsToAdd)
        })

        const modal = bootstrap.Modal.getInstance('#addStudentModal');
        if(response.ok)
        {
            getStudents();
            modal.hide();
            window.alert('Student Added');
        }
        else
        {
            console.log('CANT ABLE TO ADD STUDENT');
        }
    }
    catch(error)
    {
        console.log(error);
    }
})

document.getElementById('clearBtn').addEventListener('click',function(){
    
        document.getElementById('idEntryModal').value  = ''
        document.getElementById('nameEntryModal').value = ''
        document.getElementById('ageEntryModal').value = ''
        document.getElementById('courseEntryModal').value = ''
        
})

document.getElementById('studentSearchInput').addEventListener('input',function(){
    const studentSearchInput = document.getElementById('studentSearchInput').value.trim().toLowerCase();
    
    const searchedData = allStudents.filter(student => {
        // console.log(studentSearchInput.value);
        const idVice = student.id === Number(studentSearchInput);
        const nameVice = student.name.toLowerCase().includes(studentSearchInput);
        const ageVice = student.age === Number(studentSearchInput);
        console.log("idVice" + idVice);
        console.log("nameVice" + nameVice);

        return idVice || nameVice || ageVice    
    })

    console.log(searchedData);
    renderStudent(searchedData);

})

async function deleteStudent(id) {

    console.log(id);
    
    try
    {
        const response = await fetch(`/student/${id}`,{
            method : "DELETE"
        })

        if(response.ok)
        {
            getStudents();
            window.alert('Student Deleted');
        }
        else
        {
            console.log('Unable to Delete Student');
        }
    }
    catch(error)
    {
        console.log('ERROR' + error);
    }

}

document.addEventListener('click',async function(event) {
    
    const btn = event.target.closest('.deleteBtn');
    if (!btn) return;
    const id = btn.dataset.id;
    deleteStudent(id);  
    
    
    // getStudents();
})
getStudents();