import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://propclean-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const dailyTasksRef = ref(database, "Daily Tasks");

const shoppingListEl = document.getElementById("shopping-list");

onValue(dailyTasksRef, function(snapshot) {
    if (snapshot.exists()) {
        let tasksArray = Object.entries(snapshot.val());
        
        clearShoppingListEl();
        
        tasksArray.forEach(function(taskItem) {
            let taskData = taskItem[1];
            appendTaskToShoppingListEl(taskItem[0], taskData);
        });
    } else {
        shoppingListEl.innerHTML = "No tasks found";
    }
});

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
