function addTask(){
    const inputTask = document.getElementById('inputTask').value.trim()
    const timeValue1 = document.getElementById('timePicker1').value
    const timeValue2 = document.getElementById('timePicker2').value
    // validation for time
    if (!timeValue1 || !timeValue2) {
            alert("Please select valid time values!")
            return
    }
    if(timeValue2 <= timeValue1)
    {
        alert("Please select time in order")
        document.getElementById('timePicker1').value = "12:00";  
        document.getElementById('timePicker2').value = "12:00"; 
        document.getElementById('inputTask').value=""
        return; 
    }
    // validation for input
    if (inputTask === "") {
        alert("Please enter a task! Task cannot be empty."); 
        document.getElementById('inputTask').value=""
        return; 
    }
    // formattedTime
    const formattedTime1 = convertTo12HourFormat(timeValue1);
    const formattedTime2 = convertTo12HourFormat(timeValue2);
    
    const newTask = document.createElement('li')
    const taskList = document.getElementById('taskList')
    newTask.textContent = `Started at: ${formattedTime1} - Due at: ${formattedTime2} | ${inputTask}`
    taskList.appendChild(newTask)
    document.getElementById('inputTask').value=""
    document.getElementById('timePicker1').value = "12:00";
    document.getElementById('timePicker2').value = "12:00";
    deleteTask(newTask)
}
// Function to convert 24-hour format to 12-hour format
function convertTo12HourFormat(time) 
{
    let [hours, minutes] = time.split(":");
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
            return `${hours}:${minutes} ${period}`;
}
function deleteTask(newTask)
{
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent="Delete"
    deleteBtn.style.backgroundColor = "#FF6F61"
    deleteBtn.style.color = "white"
    deleteBtn.style.border = "1px solid black"
    deleteBtn.style.padding = "8px 12px"
    deleteBtn.style.borderRadius = "5px"
    deleteBtn.style.cursor = "pointer"
    deleteBtn.style.marginLeft = "10px"
    newTask.appendChild(deleteBtn)
    deleteBtn.onclick = function(){
        newTask.remove()
    }
}
