// background color

function changeBackgroundColor() {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = randomColor;
}

// page link

function redirectToPage() {
    window.location.href = "question.html";
}



// Global function to update date, time, and day name
function updateDateTime() {
    const now = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = now.getDate();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const fullDayName = dayNames[now.getDay()];
    const fullDate = `${date} ${month} ${year}`;
    const fullTime = `${hours}:${minutes}:${seconds} ${ampm}`;

    // Display the date anywhere in page
    document.getElementById('differentSection').innerText = fullDate;
    document.getElementById('todayName').innerText = fullDayName;
    window.fullTime = fullTime; 
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Task function started 
document.addEventListener("DOMContentLoaded", function () {
    const tasks = document.querySelectorAll('.task-completed');
    const totalTasks = tasks.length;
    let completedTasks = 0;

    tasks.forEach(function(button) {
        button.addEventListener('click', function() {
            const taskContainer = this.closest('.task');
            const assignedElement = document.getElementById('taskAssigned');
            const markElement = document.getElementById('mark');
            const titleElement = taskContainer.querySelector('.task-title');
            const button = this;

            let assigned = parseInt(assignedElement.innerText, 10);
            let taskMark = parseInt(markElement.innerText, 10);
            let title = titleElement ? titleElement.innerText : '';

            if (assigned > 0 && title) {
                assigned--;
                taskMark++;

                assignedElement.innerText = assigned;
                markElement.innerText = taskMark;
                button.disabled = true;
                button.innerText = 'Completed';
                button.style.backgroundColor = 'oklch(0.9 0.06 291.59)';
                button.style.color = '#ffff';
                
                alert("Board Updated Successfully");

                // Using the global `fullTime` value
                const now = new Date();
                const fullDayName = window.fullDayName || 'Unknown Day'; 
                const fullDate = window.fullDate || 'Unknown Date'; 

                const completeMessage = document.createElement('span');
                completeMessage.textContent = `You have completed the task ${title} at ${window.fullTime}`;
                completeMessage.style.textAlign = "left";
                completeMessage.style.padding = "20px";
                completeMessage.style.background = "#F4F7FF";
                completeMessage.style.borderRadius = "12px";

                const logElement = document.getElementById('activityLog');
                logElement.insertBefore(completeMessage, logElement.firstChild);

                completedTasks++;

                if (completedTasks === totalTasks) {
                    alert("Congrats!!! You have completed all the current tasks");
                }
            } else {
                alert("Task cannot be completed!");
            }
        });
    });

    document.getElementById('clearHistory').addEventListener('click', function() {
        const log = document.getElementById('activityLog');
        log.innerHTML = '';
    });

   
});





   

