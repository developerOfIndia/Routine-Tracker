function addTask(){
    const inputTask = document.getElementById('inputTask').value.trim();
    const timeValue1 = document.getElementById('timePicker1').value;
    const timeValue2 = document.getElementById('timePicker2').value;
    if (inputTask === "") {
        alert("Please enter a task!"); 
        document.getElementById('inputTask').value=""
        return; 
    }
    const newTask = document.createElement('li')
    const taskList = document.getElementById('taskList')
    newTask.textContent = `Started at: ${timeValue1} ${inputTask} Due at: ${timeValue2}`
    taskList.appendChild(newTask)
    // newTask.textContent = inputTask
    // newTask.textContent = document.getElementById('inputTask').value
    document.getElementById('inputTask').value=""
    deleteTask(newTask)
}
function deleteTask(newTask)
{
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent="Delete"
    newTask.appendChild(deleteBtn)
    deleteBtn.onclick = function(){
        newTask.remove()
    }
}