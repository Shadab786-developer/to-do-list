document.addEventListener("DOMContentLoaded", () => {
  let inputElement = document.getElementById("todo-input");
  let addButton = document.getElementById("big-btn-todo");
  let todoList = document.getElementById("todo-item");
  let completeElement = document.getElementById("completed-task");
  let completeMsg = document.getElementById("complete-msg");
  let itemMsg = document.getElementById("item-msg");

  //it means that when the dom is load the task array was collect the information into local storage or the information is not present then it return empty array

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let completeTask = JSON.parse(localStorage.getItem("completeTask")) || [];

  tasks.forEach((task) => pickDataLocalStorage(task));
  completeTask.forEach((comtask) => pickDataLocalStorage(comtask));

  addButton.addEventListener("click", () => {
    const inputText = inputElement.value.trim(); //it will remove the space while the user is given input

    if (inputText === "") return 0; //it will return when the input box is empty

    const newItem = {
      //create an item information
      id: Date.now(),
      text: inputText,
      complete: false,
    };
    tasks.push(newItem); // adding item into array
    pickDataLocalStorage(newItem, tasks);
    saveTask(); //calling the function to save data in local storage
    inputElement.value = ""; //clear input
    console.log(tasks);
  });

  function pickDataLocalStorage(task, comtask) {
    // console.log(task.text);
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.complete) li.classList.add("complete");
    li.innerHTML = `
    <li>${task.text}
    <button data-id="btn1" id="btn1">Delete</button>
    <button data-id="btn2" id="btn2">✔</button>
    </li>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.id === "btn1") return;
      task.complete = !task.complete; //in it will reverse the complete false to true
      li.classList.toggle("complete");
      console.log(task.complete);

      saveTask();
    });
    li.addEventListener("click", (e) => {
      if (e.target.id === "btn1") {
        e.stopPropagation(); //prevent toggle from firing
        tasks = tasks.filter((t) => t.id !== task.id); //in it we say that only return the id element from object the true value

        li.remove();
        saveTask();
      }
    });
    if (tasks.push()) {
      todoList.appendChild(li);
      if (todoList.appendChild(li)) {
        itemMsg.classList.add("hide");
      } else {
        itemMsg.classList.remove("hide");
      }
    } else {
      completeElement.appendChild(li);
      if (completeElement.appendChild(li)) {
        completeMsg.classList.add("hide");
      } else {
        completeMsg.classList.remove("hide");
      }
    }
    li.addEventListener("click", (e) => {
      if (e.target.id === "btn2") {
        completeTask.push(task);
        todoList.removeChild(li);
        completeMsg.classList.add("hide");
        tasks.pop(task.id);
        li.innerHTML = `<li>${task.text}
        <button data-id="btn1" id="btn1">Delete</button>
        </li>`;
        completeElement.appendChild(li);
        saveTask();
      } else if (e.target.id === "btn1") {
        e.stopPropagation();
        completeTask.pop();
        li.remove();
        saveTask();
      } else {
        completeMsg.classList.remove("hide");
      }

      console.log(completeTask);
      saveTask();
    });
    // completeElement.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completeTask", JSON.stringify(completeTask));
  }
});
