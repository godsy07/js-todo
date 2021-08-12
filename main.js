// Variable to store todo
let tempTodo = {
  id: "head-1",
  heading: "Test Heading",
  body: [
    {
      id: "item-1",
      listItem: "Go for a walk",
      status: false,
    },
    {
      id: "item-2",
      listItem: "Attend Meeting",
      status: true,
    },
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
    tempTodo.id = "heading-" + 1;
    tempTodo.heading = addHeading.innerHTML;
    addHeading.setAttribute("style", "boder: none");
    addHeading.setAttribute("contenteditable", "false");
    editHeading.setAttribute("class", "edit-heading fa fa-check-circle");
  }
}

function addListItem() {
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
  if (e.keyCode === 13) {
    addListItem();
  }
}

function checkItemFunction(listElement) {
  const listId = listElement.parentNode.getAttribute("id");
  tempTodo.body.map((el) => {
    if (el.id === listId) {
      el.status = !el.status; // Completed Status changed
      if (el.status) {
        listElement.parentNode.setAttribute("class", "completed");
        listElement.setAttribute(
          "class",
          "check check-item fa fa-check-circle"
        );
        // listElement.nextSibling.setAttribute("class", "list-item completed");
      } else {
        listElement.parentNode.setAttribute("class", "");
        listElement.setAttribute(
          "class",
          "uncheck check-item fa fa-check-circle"
        );
        // listElement.nextSibling.setAttribute("class", "list-item");
      }
    }
  });
}
function editItemFunction(editItem) {
  console.log(editItem.parentNode);
  console.log("edit");
}
function deleteItemFunction(delItem) {
  delId = delItem.parentNode.id.split('-')[1] - 1;
  tempTodo.body.splice(delId,1)
  delItem.parentNode.remove();
}

function viewTodoData() {
  if (!(tempTodo.heading === "")) {
    addHeading.innerHTML = tempTodo.heading;
    addHeading.setAttribute("id", tempTodo.id);
  }
  if (!(tempTodo.body.length === 0)) {
    tempTodo.body.map((bodyItem) => {
      const listItemExits = document.querySelector("#" + bodyItem.id);
      if (listItemExits === null) {
        const listItem = document.createElement("li");
        listItem.setAttribute("id", bodyItem.id);
        const checkIcon = document.createElement("i");
        const listContent = document.createElement("span");
        if (bodyItem.status === true) {
          listItem.setAttribute("class", "completed");
          checkIcon.setAttribute(
            "class",
            "check check-item fa fa-check-circle"
          );
          listContent.setAttribute("class", "list-item");
        } else {
          checkIcon.setAttribute(
            "class",
            "uncheck check-item fa fa-check-circle"
          );
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
      } else {
        // Check for changes here
      }
    });
  }
  // For editing listItems
  const checkItem = document.querySelectorAll(".check-item");
  const editItem = document.querySelectorAll(".edit");
  const deleteItem = document.querySelectorAll(".delete");
  if (checkItem) {
    checkItem.forEach((check) => {
      check.addEventListener("click", function () {
        checkItemFunction(check);
      });
    });
  }
  if (editItem) {
    editItem.forEach((edit) => {
      edit.addEventListener("click", function () {
        editItemFunction(edit);
      });
    });
  }
  if (deleteItem) {
    deleteItem.forEach((del) => {
      del.addEventListener("click", function () {
        deleteItemFunction(del);
      });
    });
  }
}

window.addEventListener("load", (event) => {
  // If tempTodo in not empty
  viewTodoData();
});
