function addTask() {
  const inputTask = document.getElementById("inputTask").value.trim();
  const timeValue1 = document.getElementById("timePicker1").value;
  const timeValue2 = document.getElementById("timePicker2").value;
  const dateInput = document.getElementById("date");
  const selectedDate = dateInput.value;  // validation for input
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
  //    validation for date
  if (!selectedDate) {
    alert("Please select a date!");
    return;
  }
  

  // formattedTime
  const formattedTime1 = convertTo12HourFormat(timeValue1);
  const formattedTime2 = convertTo12HourFormat(timeValue2);

  const newTask = document.createElement("li");

  // Time Container (left side)
  const timeContainer = document.createElement("div");
  timeContainer.className = "time-container";
  timeContainer.innerHTML = `
     <div class="dateData"> Date- ${selectedDate}</div>
     <div class="timeData"> Started at- ${formattedTime1}</div>
     <div class="timeData"> Due at- ${formattedTime2}</div>
   `;

  // Create a container for the task description (right side)
  const taskDiv = document.createElement("div");
  taskDiv.className = "taskData";
  taskDiv.textContent = inputTask;
  // Ensure the existing button stays at the end
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function () {
    newTask.remove();
  };
  // Append elements to the list item
  newTask.appendChild(timeContainer);
  newTask.appendChild(taskDiv);
  newTask.appendChild(deleteBtn);
  // Append the new list item to the task list
  const taskList = document.getElementById("taskList");
  taskList.appendChild(newTask);
  document.getElementById("inputTask").value = "";
  document.getElementById("timePicker1").value = "12:00";
  document.getElementById("timePicker2").value = "12:00";
  initializeDateInput();
}
// Function to convert 24-hour format to 12-hour format
function convertTo12HourFormat(time) {
  let [hours, minutes] = time.split(":");
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${hours}:${minutes} ${period}`;
}
function initializeDateInput() {
  const dateInput = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  dateInput.min = today; // Prevent past dates
  // Reset the input field without setting an actual value
  dateInput.value = ""; 
  dateInput.removeAttribute("value"); 
  dateInput.setAttribute("placeholder", "mm/dd/yyyy");
}

// Function to download tasks
function downloadTasks() {
  let taskList = document.getElementById("taskList").children;
  if (taskList.length === 0) {
    alert("No tasks to download!");
    return;
  }

  let content = "Routine Tracker Tasks\n\n";
  for (let task of taskList) {
    let time = task.querySelector(".time-container").innerText.trim();
    let taskText = task.querySelector(".taskData").innerText.trim();

    content += `${time}\nTask: ${taskText}\n\n`;
  }

  let blob = new Blob([content], { type: "text/plain" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Routine_Tasks.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
//Function to print tasks

function printTasks() {
  let taskList = document.getElementById("taskList");
  let tasks = taskList.querySelectorAll("li");

  if (tasks.length === 0) {
    alert("No tasks to print!");
    return;
  }

  let printContent = `<h2>Routine Tracker Tasks</h2>
                        <table style="width:100%; border-collapse: collapse;">
                            <tr>
                                <th style="text-align:left; padding:8px; border-bottom: 2px solid #000;">Time</th>
                                <th style="text-align:left; padding:8px; border-bottom: 2px solid #000;">Task</th>
                            </tr>`;

  tasks.forEach((task) => {
    let time = task.querySelector(".time-container").innerText.trim();
    let taskText = task.querySelector(".taskData").innerText.trim();

    printContent += `
     <tr>

                            <td style="padding:8px; border-bottom: 1px solid #ccc;">${time}</td>
                            <td style="padding:8px; border-bottom: 1px solid #ccc;">${taskText}</td>
                         </tr>`;
  });

  printContent += `</table>`;

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

                /* Ensure Watermark is on a Single Line */
                .watermark {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(-30deg);
                    font-size: 50px;
                    font-weight: bold;
                    color: rgba(0, 0, 0, 0.1);
                    z-index: -1;
                    white-space: nowrap; /* Prevents text from wrapping */
                    user-select: none;
                }

                /* Copyright Text */
                .copyright {
                    position: fixed;
                    bottom: 10px;
                    right: 10px;
                    font-size: 12px;
                    color: #666;
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
// Dark Mode Toggle Function
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Check if Dark Mode was enabled before
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
  darkModeToggle.checked = true;
}

// Toggle Dark Mode
darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
    body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  }
});
