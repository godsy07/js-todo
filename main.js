// Variable to store todo
let tempTodo = {
  id: "head-1",
  heading: "Your Heading",
  body: [
    // { id: "item-1", listItem: "Attend Meeting", status: false },
    // { id: "item-2", listItem: "Run a mile", status: true },
    // { id: "item-3", listItem: "Go for a walk", status: false },
    // { id: "item-4", listItem: "Learn WebDev", status: false },
  ],
};
// Query Selectors
const addHeading = document.querySelector(".add-heading");
const editHeading = document.querySelector(".edit-heading");
const todoList = document.querySelector(".todo-list");
const plusIcon = document.querySelector(".fa-plus-circle");
const inputItem = document.querySelector(".input-item");

// Event Listeners
editHeading.addEventListener("click", changeToEditingHead);
plusIcon.addEventListener("click", addListItem);
inputItem.addEventListener("keypress", inputItemFunction);

// Functions
function changeToEditingHead() {
  // For editing Heading of Todo
  if (addHeading.getAttribute("contenteditable") === "false") {
    addHeading.setAttribute("contenteditable", "true");
    editHeading.setAttribute(
      "class",
      "edit-heading fa fa-check-circle complete"
    );
    addHeading.setAttribute("style", "border:1px solid black");
    addHeading.focus();
    // addHeading.select();
  } else if (addHeading.getAttribute("contenteditable") === "true") {
    if (addHeading.innerHTML === "") {
      alert("Please enter a heading");
      addHeading.focus();
      return;
    }
    tempTodo.id = "head-" + 1;
    tempTodo.heading = addHeading.innerHTML;
    addHeading.setAttribute("style", "boder: none");
    addHeading.setAttribute("contenteditable", "false");
    editHeading.setAttribute("class", "edit-heading fa fa-check-circle");
  }
}

function addListItem() {
  // For adding list Item
  if (inputItem.value === "") {
    alert("Enter a List Item");
    return;
  } else {
    // console.log("Add List Item called");
    const counter = tempTodo.body.length;
    tempTodo.body.push({
      id: "item-" + (counter + 1),
      listItem: inputItem.value,
      status: false,
    });
    inputItem.value = "";
    viewTodoData();
  }
}

function inputItemFunction(e) {
  // For adding list item when enter key is pressed
  if (e.keyCode === 13) {
    addListItem();
  }
}

function checkItemFunction(e) {
  // For checking and unchecking completed todos
  const listId = e.path[1].getAttribute("id");
  tempTodo.body.map((el) => {
    if (el.id === listId) {
      listElement = e.path[0];
      el.status = !el.status; // Completed Status changed
      if (el.status === true) {
        // console.log("true");
        listElement.parentNode.setAttribute("class", "completed");
        listElement.setAttribute(
          "class",
          "check check-item fa fa-check-circle"
        );
      } else {
        // console.log("false");
        listElement.parentNode.setAttribute("class", "");
        listElement.setAttribute(
          "class",
          "uncheck check-item fa fa-check-circle"
        );
      }
    }
  });
}

function editItemFunction(e) {
  // For editing list items of TodoList
  editSpan = e.path[0].previousSibling;
  editId = e.path[1].getAttribute("id").split("-")[1] - 1;
  if (editSpan.getAttribute("contenteditable") === "true") {
    tempTodo.body[editId] = editSpan.innerHTML;
    editSpan.setAttribute("contenteditable", "false"); // Edit done
  } else {
    editSpan.setAttribute("contenteditable", "true");
    editSpan.focus();
  }
}
function deleteItemFunction(e) {
  // For deleting list item from TodoList
  delId = e.path[1].getAttribute("id").split("-")[1] - 1; // Fetch index of array
  tempTodo.body.splice(delId, 1); // Delete data from tempTodo variable
  e.path[1].remove(); // Deleting the li element
}

// Function to view data in page STARTS
function viewTodoData() {
  // For viewing TodoList items dynamically
  if (!(tempTodo.heading === "")) {
    // Set up local storage
    addHeading.innerHTML = tempTodo.heading;
    addHeading.setAttribute("id", tempTodo.id);
  }
  if (!(tempTodo.body.length === 0)) {
    tempTodo.body.map((bodyItem) => {
      const listItemExits = document.querySelector("#" + bodyItem.id);
      if (listItemExits === null) {
        inputListItem(bodyItem);
      }
    });
  }

  // For editing listItems, creating dynamic selectors
  let checkItem = document.querySelectorAll(".check-item");
  let editItem = document.querySelectorAll(".edit");
  let deleteItem = document.querySelectorAll(".delete");
  //  For event listeners using dynamic selectors
  if (checkItem) {
    checkItem.forEach((check) => {
      check.addEventListener("click", checkItemFunction);
    });
  }
  if (editItem) {
    editItem.forEach((edit) => {
      edit.addEventListener("click", editItemFunction);
    });
  }
  if (deleteItem) {
    deleteItem.forEach((del) => {
      del.addEventListener("click", deleteItemFunction);
    });
  }
} // Function to view data in page ENDS

// Function to Input list element STARTS
function inputListItem(bodyItem) {
  // For insertion of new HTML elements when new todos are added
  const listItem = document.createElement("li");
  listItem.setAttribute("id", bodyItem.id);
  const checkIcon = document.createElement("i");
  const listContent = document.createElement("span");
  if (bodyItem.status === true) {
    listItem.setAttribute("class", "completed");
    checkIcon.setAttribute("class", "check check-item fa fa-check-circle");
    listContent.setAttribute("class", "list-item");
  } else {
    listItem.setAttribute("class", "");
    checkIcon.setAttribute("class", "uncheck check-item fa fa-check-circle");
    listContent.setAttribute("class", "list-item");
  }
  listContent.innerHTML = bodyItem.listItem;
  const editIcon = document.createElement("i");
  editIcon.setAttribute("class", "edit fa fa-pencil");
  editIcon.setAttribute("title", "Edit");
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "delete fa fa-trash-o");
  deleteIcon.setAttribute("title", "Delete");
  listItem.insertAdjacentElement("beforeend", checkIcon);
  listItem.insertAdjacentElement("beforeend", listContent);
  listItem.insertAdjacentElement("beforeend", editIcon);
  listItem.insertAdjacentElement("beforeend", deleteIcon);
  todoList.insertAdjacentElement("beforeend", listItem);
}
// Function to Input list element ENDS

// Callback when page Loads
window.addEventListener("load", (event) => {
  // If tempTodo in not empty
  viewTodoData();
});
