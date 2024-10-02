const submitButton = document.querySelector(".item-submit");
const itemInput = document.querySelector(".item-input");
const list = document.querySelector(".list");
const clearButton = document.querySelector(".item-clear");

function addToList(e) {
  e.preventDefault();

  const item = itemInput.value;

  if (item === "") {
    alert(
      "You left the field empty. Please type in your grocery item before pressing the Add button."
    );
    return;
  }

  createItem(item);

  itemInput.value = "";
}

function createItem(item) {
  const li = document.createElement("li");
  li.classList.add("list-item");

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("list-content");

  const groceryItem = document.createElement("p");
  groceryItem.classList.add("grocery-item");
  groceryItem.textContent = item;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-item");
  deleteButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  deleteButton.addEventListener("click", deleteItem);

  contentDiv.appendChild(groceryItem);
  li.appendChild(contentDiv);
  li.appendChild(deleteButton);
  list.appendChild(li);
}

function deleteItem() {}

submitButton.addEventListener("click", addToList);
