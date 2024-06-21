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
    onValue(dailyTasksRef, (snapshot) => {
        if (snapshot.exists()) {
            const tasksArray = Object.entries(snapshot.val());

            // Filter out tasks without a defined 'time' field
            const validTasksArray = tasksArray.filter(([id, taskData]) => taskData.time);

            // Sort tasks by time in ascending order
            validTasksArray.sort((a, b) => {
                const timeA = parseTime(a[1].time);
                const timeB = parseTime(b[1].time);
                return timeA - timeB;
            });

            clearShoppingListEl();

            validTasksArray.forEach(([id, taskData]) => {
                const taskItem = document.createElement("li");
                const taskStatus = taskData.status === "complete" ? "✓" : "✗";
                taskItem.textContent = `${taskData.task} - ${taskData.time} - ${taskStatus}`;
                shoppingListEl.appendChild(taskItem);
            });
        } else {
            shoppingListEl.innerHTML = "No tasks found";
        }
    });
}

function parseTime(timeString) {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

// Initial fetch
fetchAndDisplayTasks();
