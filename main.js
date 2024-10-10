const submitButton = document.querySelector(".item-submit");
const itemInput = document.querySelector(".item-input");
const list = document.querySelector(".list");
const clearButton = document.querySelector(".item-clear");
const filter = document.querySelector(".filter-item");

function checkAndSubmit(e) {
  e.preventDefault();

  const item = itemInput.value;
  if (item === "") {
    alert(
      "You left the field empty. Please type in your grocery item before pressing the Add button."
    );
    return;
  }

  addToStorage(item);
  addToDOM(item);
}

function addToDOM(item) {
  createFromStorage();
  toggleUI();
  itemInput.value = "";
}

function getFromStorage() {
  let itemArray;
  if (localStorage.getItem("groceries") === null) {
    itemArray = [];
  } else {
    itemArray = JSON.parse(localStorage.getItem("groceries"));
  }
  return itemArray;
}

function checkDuplicate(item) {
  const itemArray = getFromStorage();
  return itemArray.includes(item);
}

function addToStorage(item) {
  const itemArray = getFromStorage();

  if (checkDuplicate(item)) {
    alert("You already have this item in your list!");
  } else {
    itemArray.push(item);
    localStorage.setItem("groceries", JSON.stringify(itemArray));
  }
}

function editStorage(newText, originalText) {
  const itemArray = getFromStorage();
  const updatedArray = itemArray.map((item) => {
    if (item === originalText) {
      return newText;
    } else {
      return item;
    }
  });

  if (checkDuplicate(newText)) {
    alert("You already have this item in your list!");
  } else {
    localStorage.setItem("groceries", JSON.stringify(updatedArray));
  }
}

function createFromStorage() {
  const itemArray = getFromStorage();

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  itemArray.forEach((item) => createItem(item));
}

function removeFromStorage(deletedItem) {
  const itemArray = getFromStorage();
  const filteredArray = itemArray.filter((item) => item !== deletedItem);
  localStorage.setItem("groceries", JSON.stringify(filteredArray));
}

function createItem(item) {
  const li = document.createElement("li");
  li.classList.add("list-item");
  if (item.length >= 16) {
    li.classList.add("long-item");
  }

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("list-content");

  const buttonDiv = document.createElement("div");

  const groceryItem = document.createElement("p");
  groceryItem.classList.add("grocery-item");
  groceryItem.textContent = item;

  const editButton = document.createElement("button");
  editButton.classList.add("edit-item");
  editButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
  editButton.addEventListener("click", editItem);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-item");
  deleteButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  deleteButton.addEventListener("click", deleteItem);

  contentDiv.appendChild(groceryItem);
  li.appendChild(contentDiv);
  buttonDiv.appendChild(editButton);
  buttonDiv.appendChild(deleteButton);
  li.appendChild(buttonDiv);
  list.appendChild(li);
}

function createEditMode(element, text) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  const buttonDiv = document.createElement("div");

  const inputEdit = document.createElement("input");
  inputEdit.value = text;
  inputEdit.setAttribute("type", "text");
  inputEdit.setAttribute("autofocus", "true");
  inputEdit.classList.add("item-edit-mode");
  inputEdit.style.width = text.length + "ch";
  inputEdit.addEventListener("input", function () {
    if (this.value.length <= 20) {
      inputEdit.style.width = this.value.length + "ch";
    } else {
      inputEdit.style.width = "20ch";
    }
  });

  const submitEdit = document.createElement("button");
  submitEdit.classList.add("submit-edit");
  submitEdit.innerHTML = `<i class="fa-solid fa-check"></i>`;
  submitEdit.addEventListener("click", function () {
    submitEditItem(element, text);
  });

  const cancelEdit = document.createElement("button");
  cancelEdit.classList.add("cancel-edit");
  cancelEdit.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
  cancelEdit.addEventListener("click", createFromStorage);

  buttonDiv.appendChild(submitEdit);
  buttonDiv.appendChild(cancelEdit);
  element.appendChild(inputEdit);
  element.appendChild(buttonDiv);
}

function editItem(e) {
  const li = e.target.parentElement.parentElement.parentElement;
  const text = li.querySelector("p").textContent;
  createEditMode(li, text);
}

function submitEditItem(element, originalText) {
  const newText = element.querySelector("input");

  if (newText.value === "") {
    alert(
      "You left the field empty. Please type in your grocery item before pressing the Edit button."
    );
    return;
  }

  editStorage(newText.value, originalText);
  createFromStorage();
}

function deleteItem() {
  removeFromStorage(
    this.parentElement.parentElement.querySelector("p").textContent
  );
  createFromStorage();
  toggleUI();
}

function clearAll() {
  localStorage.clear();
  createFromStorage();
  toggleUI();
}

function toggleUI() {
  if (list.firstChild) {
    filter.classList.remove("hidden");
    clearButton.classList.remove("hidden");
  } else {
    filter.classList.add("hidden");
    clearButton.classList.add("hidden");
  }
}

function filterItems(e) {
  const filterValue = filter.value.toLowerCase();

  const items = list.querySelectorAll("li");

  items.forEach((item) => {
    const itemText = item.querySelector("p").textContent.toLowerCase();

    if (itemText.indexOf(filterValue) != -1 || filterValue === "") {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

submitButton.addEventListener("click", checkAndSubmit);
clearButton.addEventListener("click", clearAll);
filter.addEventListener("input", filterItems);

createFromStorage();
toggleUI();
