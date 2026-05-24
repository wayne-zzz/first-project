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
const selectedSort = document.getElementById("sort");


const retrievedData = localStorage.getItem('savedTasks');
const retrievedTasks = JSON.parse(retrievedData) || [];

var taskArray = [...retrievedTasks];


var Index = taskArray.reduce((max, task) => {
    return Math.max(max, task.id);
}, 0);

let editMode = false;


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
    
    // For tracking Index purposes
    Index += 1;
    
    // Adding task into Array
    taskArray.push({
        id: Index,
        Task: x, 
        Due: y, 
        Priority: Number(z)
    });
    
    // Render tasks
    updateApp();
    
    // Reseting Input bar
    inputBar.value = '';
    
    // Reseting Due bar
    dueBar.value = '';
    
    // Reseting Priority bar
    priBar.value = '';
    
    // Resets placeholder
    resetPlaceholders();
    
});


// Functionality of 'close' button for '+'
closeBtn.addEventListener('click', (e) => {
    
    // Toggling of '+' and 'close' buttons
    closeBtn.style.display = "none"; 
    addBtn.style.display = "";
    
    // Hiding of Task bar
    taskBar.style.display = "none";
    
    // Undim of tasks
    taskCtr.style.opacity = "1";
    
    // Resets placeholder
    resetPlaceholders();
    
});


// Functionality of 'EDIT' button
editBtn.addEventListener('click', (e) => {
    
    // Toggles buttons
    editBtn.style.display = "none";
    uneditBtn.style.display = "";
    
    // Resets placeholder
    resetPlaceholders();
    
    // Shows tool buttons
    editMode = true;
    renderTasks();
    
});


// Functionality of CANCEL button
uneditBtn.addEventListener('click', (e) => {
    
    // Toggles buttons
    uneditBtn.style.display = "none";
    editBtn.style.display = "";
    
    // Hides tool buttons
    editMode = false;
    renderTasks();
});


const renderTasks = () => {
    
    taskCtr.replaceChildren()
    
    const sortedTasks = sortTasksByCategory();
    
    sortedTasks.forEach((item) => {
        
        // To store Task and Editors in one div
        const taskDiv = document.createElement('div');
        
        // Creating Task
        const task = document.createElement('p');
        task.textContent = item.Task;
        
        const dueDate = document.createElement('p');
        dueDate.textContent = item.Due;
        
        // To store Editors in one div
        const editors = document.createElement('div');
        editors.className = 'editors'
        
        // Creating edit Editor
        const editTask = document.createElement('button');
        editTask.textContent = '✍️';
        
        // Creating delete Editor
        const deleteTask = document.createElement('button');
        deleteTask.textContent = '🗑️';
        
        deleteTask.addEventListener('click', () => {
            taskArray = taskArray.filter(task => task.id !== item.id);
            
            updateApp();
        });
        
        
        editTask.addEventListener('click', () => {       
            const editedTask = prompt(
                "Edit task:",
                item.Task
            );

            if (editedTask === null) return;

            item.Task = editedTask;

            updateApp();
        });

        
        // Functionality of editMode
        if(editMode){
            editors.style.display = "inline";
        }
        else{
            editors.style.display = "none";
        }
        
        // Adding to index.html
        editors.appendChild(editTask);
        editors.appendChild(deleteTask);
        
        taskDiv.appendChild(task);
        taskDiv.appendChild(dueDate);
        taskDiv.appendChild(editors);
        
        taskCtr.appendChild(taskDiv);
        
    });

};


function resetPlaceholders(){
    // Resets input bar placeholder
    inputBar.setAttribute('placeholder', 'Enter task here');
    
    // Resets due bar placeholder
    dueBar.setAttribute('placeholder', 'Enter Due Date here');
    
    // Resets priority bar placeholder
    priBar.setAttribute('placeholder', 'Enter Priority here');
};


function sortTasksByCategory(){
    
    let sortedArray = [...taskArray];
    
    switch(selectedSort.value){
        case "Due_date":
            // Sort by 'Due', smallest to largest date
            sortedArray.sort((a, b) => {
                return new Date(a.Due) - new Date(b.Due);
            });
            
            break;
            
            case "Priority": 
            
            // Sort by 'Priority', smallest to largest number
            sortedArray.sort((a, b) => {
                return a.Priority - b.Priority;
            });
            
            break;
            
        };
        
        return sortedArray;
    };
    
    selectedSort.addEventListener('change', () => {
        updateApp();
    });

    const saveTasksStorage = () => {
        localStorage.setItem('savedTasks', JSON.stringify(taskArray));
    };
    
    function updateApp(){
        renderTasks();
        saveTasksStorage();
    }
    
    renderTasks();