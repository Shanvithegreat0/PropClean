import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://propclean-default-rtdb.firebaseio.com/"
};

// Initialize Firebase only if it hasn't been initialized already
if (!getApps().length) {
    initializeApp(appSettings);
}

const database = getDatabase();
const dailyTasksRef = ref(database, "Daily Tasks");

const shoppingListEl = document.getElementById("shopping-list");

// Fetch and display tasks sorted by time in ascending order
function fetchAndDisplayTasks() {
    onValue(dailyTasksRef, function(snapshot) {
        if (snapshot.exists()) {
            let tasksArray = Object.entries(snapshot.val());

            // Sort tasks by time in ascending order
            tasksArray.sort((a, b) => {
                const timeA = parseTime(a[1].time);
                const timeB = parseTime(b[1].time);
                return timeA - timeB;
            });

            clearShoppingListEl();

            tasksArray.forEach(function(taskItem) {
                let taskData = taskItem[1];
                appendTaskToShoppingListEl(taskItem[0], taskData);
            });
        } else {
            shoppingListEl.innerHTML = "No tasks found";
        }
    });
}

function parseTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

function appendTaskToShoppingListEl(taskId, taskData) {
    let newEl = document.createElement("li");
    newEl.textContent = `${taskData.task} - ${taskData.time}`;
    newEl.addEventListener("click", function() {
        window.location.href = `taskDetails.html?id=${taskId}`;
    });
    shoppingListEl.appendChild(newEl);
}

// Initial fetch
fetchAndDisplayTasks();
