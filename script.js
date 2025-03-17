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
    newTask.textContent = `Started at: ${timeValue1}- Due at: ${timeValue2} ${inputTask}`
    taskList.appendChild(newTask)
    // newTask.textContent = inputTask
    // newTask.textContent = document.getElementById('inputTask').value
    document.getElementById('inputTask').value=""
    deleteTask(newTask)
}
function validateTime() {
            let time1 = document.getElementById("timePicker1").value
            let time2 = document.getElementById("timePicker2")
            // Ensure time2 cannot be earlier than time1
            time2.min = time1
            if (time2.value < time1) {
                time2.value = time1
            }
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
