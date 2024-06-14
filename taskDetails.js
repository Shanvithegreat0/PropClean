import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, child, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://propclean-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

const taskRef = ref(database, `Daily Tasks/${taskId}`);
onValue(taskRef, (snapshot) => {
    if (snapshot.exists()) {
        const taskData = snapshot.val();
        document.getElementById("task-name").textContent = `Task: ${taskData.task}`;
        document.getElementById("task-time").textContent = `Time: ${taskData.time}`;
        const statusButton = document.getElementById("status-button");
        statusButton.textContent = taskData.status === "Incomplete" ? "Mark as Complete" : "Mark as Incomplete";

        if (taskData.status === "Complete") {
            statusButton.disabled = true;
        } else {
            statusButton.addEventListener("click", () => {
                window.location.href = `upload.html?id=${taskId}`;
            });
        }
    } else {
        document.getElementById("task-details").textContent = "Task not found";
    }
});
