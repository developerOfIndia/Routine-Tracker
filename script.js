function addTask() {
  const inputTask = document.getElementById("inputTask").value.trim();
  const timeValue1 = document.getElementById("timePicker1").value;
  const timeValue2 = document.getElementById("timePicker2").value;
  // validation for input
  if (inputTask === "") {
    alert("Please enter a task! Task cannot be empty.");
    document.getElementById("inputTask").value = "";
    return;
  }
  // validation for time
  if (!timeValue1 || !timeValue2) {
    alert("Please select valid time values!");
    return;
  }
  if (timeValue2 <= timeValue1) {
    alert("Please select valid time values!");
    document.getElementById("timePicker1").value = "12:00";
    document.getElementById("timePicker2").value = "12:00";
    //document.getElementById("inputTask").value = "";
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
  timeDiv.innerHTML = `Started at- ${formattedTime1} <br> Due at- ${formattedTime2}`;

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

// Function to download tasks
function downloadTasks() {
    let taskList = document.getElementById("taskList").children
    if (taskList.length === 0) {
        alert("No tasks to download!")
        return;
    }

    let content = "Routine Tracker Tasks\n\n";
    for (let task of taskList) {
        let time = task.querySelector(".timeData").innerText
        let taskText = task.querySelector(".taskData").innerText
        content += `${time}\nTask: ${taskText}\n\n`
    }

    let blob = new Blob([content], { type: "text/plain" })
    let link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "Routine_Tasks.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
//Function to print tasks

function printTasks() {
    let taskList = document.getElementById("taskList");
    let tasks = taskList.querySelectorAll("li"); // Get all task items

    if (tasks.length === 0) { // Check if there are no tasks
        alert("No tasks to print!");
        return; // Stop execution if no tasks exist
    }

    let printContent = `<h2>Routine Tracker Tasks</h2>
                        <table style="width:100%; border-collapse: collapse;">
                            <tr>
                                <th style="text-align:left; padding:8px; border-bottom: 2px solid #000;">Time</th>
                                <th style="text-align:left; padding:8px; border-bottom: 2px solid #000;">Task</th>
                            </tr>`;

    tasks.forEach(task => {
        let time = task.querySelector(".timeData").innerHTML;
        let taskText = task.querySelector(".taskData").innerText;
        printContent += `<tr>
                            <td style="padding:8px; border-bottom: 1px solid #ccc;">${time}</td>
                            <td style="padding:8px; border-bottom: 1px solid #ccc;">${taskText}</td>
                         </tr>`;
    });

    printContent += `</table>`;

    // Open print window only if tasks exist
    let printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Tasks</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; position: relative; }
                h2 { text-align: center; }
                table { width: 100%; border-collapse: collapse; }
                th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ccc; }
                
                /* Watermark Styling */
                .watermark {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(-30deg);
                    font-size: 50px;
                    font-weight: bold;
                    color: rgba(0, 0, 0, 0.1);
                    z-index: -1;
                    user-select: none;
                }

                /* Copyright Styling */
                .copyright {
                    position: fixed;
                    bottom: 10px;
                    right: 10px;
                    font-size: 12px;
                    color: #666;
                    text-align: right;
                }
            </style>
        </head>
        <body>
            <div class="watermark">Routine-Tracker</div>
            ${printContent}
            <div class="copyright">© DeveloperOfIndia</div>
            <script>
                window.onload = function() {
                    window.print();
                    window.onafterprint = function() { window.close(); };
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}
