var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();
    
  // package up data as an object
  var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
  };

  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
};

var createTaskEl = function (taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  //call the createTaskActions function to create the actions
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  // increase task counter for next unique id
  taskIdCounter++;
};

//the parameter taskId is how we pass a different id into the function
//each time to keep track of which elements we're creating for which taks
//creating new form elements dynically function
var createTaskActions = function(taskId) {
  //create div container and assign a class to div
  //this is the container for the other elements
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);  //taskId is the parameter passed into the function
  
  actionContainerEl.appendChild(editButtonEl);

  //create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);  //give it the date id, taskIs is the parameter passed into the function

  actionContainerEl.appendChild(deleteButtonEl);

  //add dropdown
  var statusSelectEl = document.createElement("select");  //create dropdown (select) element
  statusSelectEl.className = "select-status";         //assign class
  statusSelectEl.setAttribute("name", "status-change");   //assign name attribute and status change value
  statusSelectEl.setAttribute("data-task-id", taskId);  //assign data id attribute and value taskId (parameter)
  
  actionContainerEl.appendChild(statusSelectEl);  //append dropdown to the div element

  //create the three option elements for the dropdown options using a for loop
  //create an array with status choices
  var statusChoices = ["To Do", "In Progress", "Completed"];

  //create the for loop
  for (var i = 0; i < statusChoices.length; i++) {
    //create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
}

formEl.addEventListener("submit", taskFormHandler);

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

//function to see if delete button is cl
var taskButtonHandler = function(event) {
  console.log(event.target);

  if (event.target.matches(".delete-btn")) {
    //get the element's task id
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};
pageContentEl.addEventListener("click", taskButtonHandler);

