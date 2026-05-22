const addBtn = document.getElementById("plusSign");
const closeBtn = document.getElementById("closeSign");
const taskBar = document.getElementById("taskBar");
const dueBar = document.getElementById("dueBar");
const priBar = document.getElementById("priBar");
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
    const y = dueBar.value;
    const z = priBar.value;

    //Error message when any bar is empty
    if(x.trim() === "" || y.trim() === "" || z.trim() === ""){
        inputBar.setAttribute('placeholder', 'Task bar empty! Please enter a task before adding');
        dueBar.setAttribute('placeholder', 'Due Date bar empty! Please enter a date before adding');
        priBar.setAttribute('placeholder', 'Priority bar empty! Please enter a number before adding');
        return;
    }

    // Adding task into Array
    taskArray.push(
        { Task: `${x}`, Due: `${y}`, Priority: `${z}` }
    );
    
    taskArray.forEach((item) => {
        
        // To store Task and Editors in one div
        const taskDiv = document.createElement('div');
        taskCtr.appendChild(taskDiv);
    
        // Creating Task
        const task = document.createElement('p');
        task.setAttribute('class', 'Task');
        task.textContent = item.Task;
        task.style.display = "inline"
        
        const dueDate = document.createElement('p');
        dueDate.setAttribute('class', 'Due');
        dueDate.textContent = item.Due;
        dueDate.style.display = "flex"

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
        console.log(taskArray);
    
        // Adding to index.html
        taskDiv.appendChild(task);
        taskDiv.appendChild(dueDate);
        taskDiv.appendChild(editors);
        editors.appendChild(editTask);
        editors.appendChild(deleteTask);
    })


    // Reseting Input bar
    inputBar.value = '';

    // Reseting Due bar
    dueBar.value = '';

    // Reseting Priority bar
    priBar.value = '';

    //Resets placeholder
    inputBar.setAttribute('placeholder', 'Enter task here');

    //Resets placeholder
    dueBar.setAttribute('placeholder', 'Enter Due Date here');

    //Resets placeholder
    priBar.setAttribute('placeholder', 'Enter Priority here');

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

    //Resets placeholder
    dueBar.setAttribute('placeholder', 'Enter Due Date here');

    //Resets placeholder
    priBar.setAttribute('placeholder', 'Enter Priority here');

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

    //Resets placeholder
    dueBar.setAttribute('placeholder', 'Enter Due Date here');

    //Resets placeholder
    priBar.setAttribute('placeholder', 'Enter Priority here');

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
