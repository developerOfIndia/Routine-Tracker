function addTask() {
  const inputTask = document.getElementById("inputTask").value.trim();
  const timeValue1 = document.getElementById("timePicker1").value;
  const timeValue2 = document.getElementById("timePicker2").value;
  // validation for time
  if (!timeValue1 || !timeValue2) {
    alert("Please select valid time values!");
    return;
  }
  if (timeValue2 <= timeValue1) {
    alert("Please select time in order");
    document.getElementById("timePicker1").value = "12:00";
    document.getElementById("timePicker2").value = "12:00";
    document.getElementById("inputTask").value = "";
    return;
  }
  // validation for input
  if (inputTask === "") {
    alert("Please enter a task! Task cannot be empty.");
    document.getElementById("inputTask").value = "";
    return;
  }
  // formattedTime
  const formattedTime1 = convertTo12HourFormat(timeValue1);
  const formattedTime2 = convertTo12HourFormat(timeValue2);

  const newTask = document.createElement("li");
  newTask.classList.add("task-item");
  // Create a container for the time details
  const timeDiv = document.createElement("div");
  timeDiv.className = "timeData";
  timeDiv.innerHTML = `Started at: ${formattedTime1} <br> Due at: ${formattedTime2}`;

  // Create a container for the task description
  const taskDiv = document.createElement("div");
  taskDiv.className = "taskData";
  taskDiv.textContent = inputTask;
// Ensure the existing button stays at the end
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className="delete-btn";
  deleteBtn.onclick = function () {
    newTask.remove();
  };
  // Append elements to the list item
  newTask.appendChild(timeDiv);
  newTask.appendChild(taskDiv);
  newTask.appendChild(deleteBtn);
  // Append the new list item to the task list
  const taskList = document.getElementById("taskList");
  taskList.appendChild(newTask);
  document.getElementById("inputTask").value = "";
  document.getElementById("timePicker1").value = "12:00";
  document.getElementById("timePicker2").value = "12:00";
  
}
// Function to convert 24-hour format to 12-hour format
function convertTo12HourFormat(time) {
  let [hours, minutes] = time.split(":");
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${hours}:${minutes} ${period}`;
}
