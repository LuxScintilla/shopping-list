const submitButton = document.querySelector(".item-submit");
const itemInput = document.querySelector(".item-input");
const list = document.querySelector(".list");
const clearButton = document.querySelector(".item-clear");
const filter = document.querySelector(".filter-item");

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
  toggleUI();

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

function deleteItem() {
  this.parentElement.remove();
  toggleUI();
}

function clearAll() {
  const items = list.querySelectorAll("li");
  items.forEach((item) => item.remove());
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

submitButton.addEventListener("click", addToList);
clearButton.addEventListener("click", clearAll);
filter.addEventListener("input", filterItems);

toggleUI();
