//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.
//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.
// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//Create new task list item
var createNewTaskElement = function(taskString) {
  // Create new list item
  var listItem = document.createElement("li");
  listItem.className = 'tasks-list__item';

  // Create chekbox for new list item
  var checkBox = document.createElement("input");
  checkBox.type='checkbox';
  checkBox.className = "task-checkbox";

  // Create label for new list item
  var label = document.createElement("label");
  label.innerText = taskString;
  label.className = 'task-label';

  // Create text input for new list item
  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "input task-label task-input";

  // Create edit button for new list item
  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "button edit";

  // Create delete button for new list item
  var deleteButton = document.createElement("button");
  deleteButton.className = "button delete";

  // Add image for delete button
  var deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = './img/remove.svg';
  deleteButtonImg.className = 'button__image';

  deleteButton.appendChild(deleteButtonImg);

  // Fill new list item
  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
}

// Function for add button to add new task
var addTask = function() {
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

// Edit an existing task
var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit");
  var containsClass = listItem.classList.contains("edit-text");

  //If class of the parent is .editmode
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent
  listItem.classList.toggle("edit-text");
};

// Delete task
var deleteTask = function() {
  this.parentNode.remove();
}

// Mark task completed
var taskCompleted = function() {
  completedTasksHolder.appendChild(this.parentNode);
  bindTaskEvents(this.parentNode, taskIncomplete);
}

var taskIncomplete = function() {
  incompleteTaskHolder.appendChild(this.parentNode);
  bindTaskEvents(this.parentNode, taskCompleted);
}

// Bind task event
var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  taskListItem.querySelector(".edit").onclick = editTask;
  taskListItem.querySelector(".delete").onclick = deleteTask;

  checkBox.onchange = checkBoxEventHandler;
}

addButton.addEventListener("click", addTask);

// Bind task event for incomplite tasks (first load)
for (var i = 0; i < incompleteTaskHolder.children.length; i++){
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Bind task event for complite tasks (first load)
for (var i = 0; i < completedTasksHolder.children.length; i++){
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.
//prevent creation of empty tasks.
//Change edit to save when you are in edit mode.