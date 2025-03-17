function addTask(){
    const inputTask = document.getElementById('inputTask').value.trim();
    const timeValue1 = document.getElementById('timePicker1').value;
    const timeValue2 = document.getElementById('timePicker2').value;
    if(timeValue2 <= timeValue1)
    {
        alert("Please select time in order")
        document.getElementById('inputTask').value=""
        return; 
    }
    if (inputTask === "") {
        alert("Please enter a task!"); 
        document.getElementById('inputTask').value=""
        return; 
    }
    // Ensure the time is displayed in 24-hour format
    const formattedTime1 = convertTo24HourFormat(timeValue1)
    const formattedTime2 = convertTo24HourFormat(timeValue2)
    
    const newTask = document.createElement('li')
    const taskList = document.getElementById('taskList')
    newTask.textContent = `Started at: ${formattedTime1} - Due at: ${formattedTime2} | ${inputTask}`
    taskList.appendChild(newTask)
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
