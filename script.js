function addTask(){
    const inputTask = document.getElementById('inputTask').value.trim();
    if (inputTask === "") {
        alert("Please enter a task!"); 
        document.getElementById('inputTask').value=""
        return; 
    }
    const newTask = document.createElement('li')
    const taskList = document.getElementById('taskList')
    taskList.appendChild(newTask)
    newTask.textContent = inputTask
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