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

function addToStorage(item) {
  let itemArray;
  if (localStorage.getItem("groceries") === null) {
    itemArray = [];
  } else {
    itemArray = JSON.parse(localStorage.getItem("groceries"));
  }
  itemArray.push(item);
  localStorage.setItem("groceries", JSON.stringify(itemArray));
}

function editStorage(newText, originalText) {
  let itemArray;
  if (localStorage.getItem("groceries") === null) {
    itemArray = [];
  } else {
    itemArray = JSON.parse(localStorage.getItem("groceries"));
  }
  const updatedArray = itemArray.map((item) => {
    if (item === originalText) {
      return newText;
    } else {
      return item;
    }
  });
  localStorage.setItem("groceries", JSON.stringify(updatedArray));
}

function createFromStorage() {
  let itemArray;
  if (localStorage.getItem("groceries") === null) {
    itemArray = [];
  } else {
    itemArray = JSON.parse(localStorage.getItem("groceries"));
  }

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  itemArray.forEach((item) => createItem(item));
}

function removeFromStorage(deletedItem) {
  let itemArray;
  if (localStorage.getItem("groceries") === null) {
    itemArray = [];
  } else {
    itemArray = JSON.parse(localStorage.getItem("groceries"));
  }
  itemArray = itemArray.filter((item) => item !== deletedItem);
  localStorage.setItem("groceries", JSON.stringify(itemArray));
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

  const inputEdit = document.createElement("input");
  inputEdit.value = text;
  inputEdit.setAttribute("type", "text");
  inputEdit.classList.add("item-edit-mode");

  const submitEdit = document.createElement("button");
  submitEdit.classList.add("submit-edit");
  submitEdit.innerHTML = `<i class="fa-solid fa-check"></i>`;
  submitEdit.addEventListener("click", function () {
    submitEditItem(element, text);
  });

  element.appendChild(inputEdit);
  element.appendChild(submitEdit);
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
  removeFromStorage(this.parentElement.querySelector("p").textContent);
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
