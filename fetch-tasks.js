import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAn2hwFs7g1StFNAGVbiOxTTcLbuNq1le0",
    authDomain: "propclean.firebaseapp.com",
    databaseURL: "https://propclean-default-rtdb.firebaseio.com",
    projectId: "propclean",
    storageBucket: "propclean.appspot.com",
    messagingSenderId: "795234019311",
    appId: "1:795234019311:web:369566b90b91139164781a",
    measurementId: "G-CE3LFP4HSJ"
};

// Initialize Firebase only if it hasn't been initialized already
if (!getApps().length) {
    initializeApp(firebaseConfig);
}

const database = getDatabase();
const dailyTasksRef = ref(database, "Daily Tasks");

const taskTableBody = document.querySelector("#task-table tbody");

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

            taskTableBody.innerHTML = "";

            validTasksArray.forEach(([id, taskData]) => {
                const status = taskData.status ? taskData.status.toLowerCase() : "incomplete";
                const statusClass = status === "complete" ? "status-complete" : "status-incomplete";
                const statusText = status === "complete" ? "Complete" : "Incomplete";

                const taskRow = document.createElement("tr");
                taskRow.innerHTML = `
                    <td>${taskData.task}</td>
                    <td>${taskData.date}</td>
                    <td class="${statusClass}">${statusText}</td>
                    <td>${taskData.uploadTime ? formatDate(taskData.uploadTime) : 'N/A'}</td>
                    <td>${taskData.completedBy || 'N/A'}</td>
                `;
                taskTableBody.appendChild(taskRow);
            });
        } else {
            taskTableBody.innerHTML = "<tr><td colspan='5'>No tasks found</td></tr>";
        }
    });
}

function parseTime(timeString) {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Fetch and display tasks initially
fetchAndDisplayTasks();
