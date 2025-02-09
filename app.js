//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.
//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.
// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks

//New task list item
var createNewTaskElement = function(taskString){

  var listItem = document.createElement("li");
  listItem.className = 'tasks-list__item';
  //input (checkbox)
  var checkBox = document.createElement("input");//checkbx
  checkBox.type='checkbox';
  checkBox.className = "task-checkbox";
  //label
  var label = document.createElement("label");//label
  label.innerText = taskString;
  label.className = 'task-label';
  //input (text)
  var editInput = document.createElement("input");//text
  editInput.type = "text";
  editInput.className = "input task-label task-input";
  //button.edit
  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "button edit";
  //button.delete
  var deleteButton = document.createElement("button");
  deleteButton.className = "button delete";

  var deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'button__image';

  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
}

var addTask=function(){
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

//Edit an existing task.
var editTask = function(){
  var listItem = this.parentNode;  
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit");
  var containsClass = listItem.classList.contains("edit-text");
  //If class of the parent is .editmode
  if(containsClass){
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  }else{
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  //toggle .editmode on the parent.
  listItem.classList.toggle("edit-text");
};

//Delete task.
var deleteTask=function(){
  this.parentNode.remove();
}

//Mark task completed
var taskCompleted=function(){
  completedTasksHolder.appendChild(this.parentNode);
  bindTaskEvents(this.parentNode, taskIncomplete);  
}

var taskIncomplete=function(){
  incompleteTaskHolder.appendChild(this.parentNode);
  bindTaskEvents(this.parentNode, taskCompleted);
}

//The glue to hold it all together.
//Set the click handler to the addTask function.


var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  taskListItem.querySelector(".edit").onclick = editTask;
  taskListItem.querySelector(".delete").onclick = deleteTask;

  checkBox.onchange = checkBoxEventHandler;
}

addButton.addEventListener("click", addTask);

//cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTaskHolder.children.length; i++){
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++){
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.
//prevent creation of empty tasks.
//Change edit to save when you are in edit mode.