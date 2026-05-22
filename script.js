const addBtn = document.getElementById("plusSign");
const closeBtn = document.getElementById("closeSign");
const taskBar = document.getElementById("taskBar");
const taskCtr = document.getElementById("taskCtr");
const inputBar = document.getElementById("inputBar");
const createBtn = document.getElementById("createBtn");
const editBtn = document.getElementById("editBtn");
const uneditBtn = document.getElementById("uneditBtn");

var Index = 0;

var taskArray = []

// '+' button functionality
addBtn.addEventListener('click', (e) => {
    
    // 1. Toggling '+' and 'close' buttons
    addBtn.style.display = "none"; 
    closeBtn.style.display = "";

    // 2. Task bar appears
    taskBar.style.display = "";

    // 3. All tasks dim out
    taskCtr.style.opacity = "0.5";

})

// 'Add' button functionality
createBtn.addEventListener('click', (e) => {

    // For tracking Index purposes
    Index += 1;
    const x = inputBar.value;

    //Error message when Task bar is empty
    if(x.trim() === ""){
        inputBar.setAttribute('placeholder', 'Task bar empty! Please enter a task before adding');
        return;
    }

    // To store Task and Editors in one div
    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('id', `Task_${Index}`);
    taskCtr.appendChild(taskDiv);

    // Creating Task
    const task = document.createElement('p');
    task.setAttribute('class', 'Task');
    task.textContent = x;

    // To store Editors in one div
    const editors = document.createElement('div');
    editors.className = "editors";
    editors.style.display = "none";

    // Creating edit Editor
    const editTask = document.createElement('button');
    editTask.setAttribute('id', `Edit_${Index}`);
    editTask.className = "editTools"
    editTask.textContent = '✍️';
    
    // Creating delete Editor
    const deleteTask = document.createElement('button');
    deleteTask.setAttribute('id', `Delete_${Index}`);
    deleteTask.className = "editTools"
    deleteTask.textContent = '🗑️';

    // Adding to index.html
    taskDiv.appendChild(task);
    taskDiv.appendChild(editors);
    editors.appendChild(editTask);
    editors.appendChild(deleteTask);

    // Reseting Input bar
    inputBar.value = '';
})

// Functionality of 'close' button for '+'
closeBtn.addEventListener('click', (e) => {

    // Toggling of '+' and 'close' buttons
    closeBtn.style.display = "none"; 
    addBtn.style.display = "";

    // Hiding of Task bar
    taskBar.style.display = "none";

    //Undim of tasks
    taskCtr.style.opacity = "1";

    //Resets placeholder
    inputBar.setAttribute('placeholder', 'Enter task here');

})

// Functionality of 'EDIT' button
editBtn.addEventListener('click', (e) => {

    //Toggles buttons
    editBtn.style.display = "none";
    uneditBtn.style.display = "";

    //Copies all editors into an array 
    const tools = document.getElementsByClassName("editors");
    
    //Resets placeholder
    inputBar.setAttribute('placeholder', 'Enter task here');
    
    //Shows tool buttons
    for(let i = 0; i < tools.length; i++){
        tools[i].style.display = "inline";
    }
    
})

//Functionality of CANCEL button
uneditBtn.addEventListener('click', (e) => {
    
    //Toggles buttons
    uneditBtn.style.display = "none";
    editBtn.style.display = "";
    
    //Copies all editors into an array 
    const tools = document.getElementsByClassName("editors");
    
    //Hides tool buttons
    for(let i = 0; i < tools.length; i++){
        tools[i].style.display = "none";
    }
})