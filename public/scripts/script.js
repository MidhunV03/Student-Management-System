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
            <button class="btn btn-warning openEditModalBtn" data-id="${element.id}"><i class="bi bi-pen"></i></button>
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

function openEditModal(id)
{
    const modalElement = document.querySelector('#editStudentModal')
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();

    const respectiveStudent = allStudents.filter(student => {
        return student.id == id;
    });
    
    document.getElementById('idEditModal').value = respectiveStudent[0].id;
    document.getElementById('nameEditModal').value = respectiveStudent[0].name;
    document.getElementById('ageEditModal').value = respectiveStudent[0].age;
    document.getElementById('courseEditModal').value = respectiveStudent[0].course  ;
}

document.getElementById('saveChangesBtn').addEventListener('click',async function(){
    const updatedDetails = {
        id : Number(document.getElementById('idEditModal').value),
        name : document.getElementById('nameEditModal').value,
        age : Number(document.getElementById('ageEditModal').value),
        course : document.getElementById('courseEditModal').value,
    }

    try{

        const response = await fetch(`/student/${updatedDetails.id}`,{
        method : "PUT",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(updatedDetails)
        })

        if (response.ok) {
            getStudents();
            const modalElement = document.querySelector('#editStudentModal');
            const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
            modal.hide();
            window.alert('student updated');
        }
        else {
            console.log("Unable to update student");
        }
    }
    catch(error)
    {
        console.error("Update Error",error);
    }
})

document.addEventListener('click',async function(event) {

    if(event.target.closest('.deleteBtn'))
    {
        const btn = event.target.closest('.deleteBtn');
        if(!btn) return;
        const id = btn.dataset.id;
        deleteStudent(id);  
    }
    else if(event.target.closest('.openEditModalBtn'))
    {
        const btn = event.target.closest('.openEditModalBtn');
        if (!btn) return;
        const id = Number(btn.dataset.id);
        openEditModal(id);
    }
    
    
    // getStudents();
})
getStudents();