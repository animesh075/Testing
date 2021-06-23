const form = document.getElementById('form');
const inputs = document.getElementsByTagName('input');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const employee = document.getElementById('employee');
const password = document.getElementById('password');
var index, table = document.getElementById('show');

var selectedRow = null

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if (validate()) {
        var formData = addRow();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
});
function validate() {
    isValid = true;
    const firstNameValue=firstName.value;
    const lastNameValue=lastName.value;
    const emailValue=email.value;
    const employeeValue=employee.value;
    const passwordValue=password.value;
    if (firstNameValue === "" ) {
        isValid = false;
        setErrorFor(firstName,'Invalid! or First name cannot be blank');
    }
    if (lastNameValue === "") {
        isValid = false;
        setErrorFor(lastName,'Invalid! or Last name cannot be blank');
    }
    if (emailValue === "") {
        isValid = false;
        setErrorFor(email,'Invalid! or Email name cannot be blank');
    } 
    if (employeeValue === "") {
        isValid = false;
        setErrorFor(employee,'Invalid! or Employee name cannot be blank');
    } 
    if ((passwordValue === "") || (passwordValue < 8 ) &&(/[A-Z]/.test(passwordValue)==false) || (/[a-z]/.test(passwordValue)==false) || (/[0-9]/.test(passwordValue)==false) ){
        isValid = false;
        setErrorFor(password,'Password must contain atleast alpha0-9 character');
    } 
    else {
        isValid = true;
        setSuccessFor(firstName);
        setSuccessFor(lastName);
        setSuccessFor(email);
        setSuccessFor(employee);
        setSuccessFor(password);
    }
    return isValid;
}
function addRow() {
    var formData = {};
    formData["firstName"] = document.getElementById("firstName").value;
    formData["lastName"] = document.getElementById("lastName").value;
    formData["email"] = document.getElementById("email").value;
    formData["employee"] = document.getElementById("employee").value;
    formData["password"]=document.getElementById("password").value;
    return formData;
}
function insertNewRecord(data) {
    var table = document.getElementById("show").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.firstName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.lastName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.employee;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onDelete(this)">Delete</a>`;
}
function resetForm() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("employee").value = "";
    document.getElementById("password").value = "";
    document.getElementById("male").checked = false;
    document.getElementById("female").checked = false;
    selectedRow = null;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.firstName;
    selectedRow.cells[1].innerHTML = formData.lastName;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.employee;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("show").deleteRow(row.rowIndex);
        resetForm();
    }
}
function setErrorFor(input,message){
    const control = input.parentElement;
    const small = control.querySelector('small');

    small.innerText = message;
    control.className = "controls error";
}
function setSuccessFor(input){
    const control = input.parentElement;
    control.className = "controls success";
}