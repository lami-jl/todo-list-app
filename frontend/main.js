const host = 'http://localhost:3000';

const getUsersButton = document.getElementById('get-users');
const getUserResult = document.getElementById('get-users-result');

let selectedListId = null;





getUsersButton.addEventListener('click', () => {

  apiRequest(host + "/lists", 'GET', {})
    .then(data => {

      getUserResult.innerHTML = '';
      const container = document.createElement("div");
      container.className = "lists-grid";

      for (const list of data) {

        const card = document.createElement("div");
        card.className = "list-card";

        const title = document.createElement("h3");
        title.innerText = list.name;

        const desc = document.createElement("p");
        desc.innerText = list.description;

        const actions = document.createElement("div");
        actions.className = "actions";

        
        const tasksBtn = document.createElement("button");
        tasksBtn.innerText = "📝";
        
     //da vedere
        tasksBtn.addEventListener("click", () => {
          selectedListId = list.id;
          document.getElementById("tasks-section").style.display = "block";
          loadItems(); 
        });

       
        const editBtn = document.createElement("button");
        
        editBtn.innerText = "✏️";
//la diff tra un click e addeventlistenner
        editBtn.onclick = () => {


          title.innerHTML = "";
          desc.innerHTML = "";


          const inputName = document.createElement("input");
          inputName.value = list.name;


          const inputDesc = document.createElement("input");
          inputDesc.value = list.description;


          const saveBtn = document.createElement("button");
          saveBtn.innerText = "✔";

          saveBtn.onclick = () => {
            apiRequest(host + "/lists/" + list.id, "PUT", {
              name: inputName.value,
              description: inputDesc.value
            }).then(() => getUsersButton.click());
          };

          title.appendChild(inputName);
          desc.appendChild(inputDesc);
          actions.appendChild(saveBtn);

        };

       
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "🗑️";

        deleteBtn.addEventListener("click", () => {
          apiRequest(host + "/lists/" + list.id, "DELETE", {})
            .then(() => getUsersButton.click());
        });

        actions.appendChild(tasksBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(actions);

        container.appendChild(card);
      }

      getUserResult.appendChild(container);

    });

});





const addUserButton = document.getElementById('get-user');
const userIdInput = document.getElementById('user-id');
const descriptionInput = document.getElementById('description-input');

addUserButton.addEventListener('click', () => {

  apiRequest(host + "/lists", 'POST', {
    name: userIdInput.value,
    description: descriptionInput.value
  })
    .then(() => {
      userIdInput.value = "";
      descriptionInput.value = "";
      getUsersButton.click();
    });

});



function loadItems() {

  apiRequest(host + "/lists/" + selectedListId + "/items", "GET", {})
    .then(data => {

      const container = document.getElementById("tasks-container");
      container.innerHTML = "";

      for (const item of data) {

        const card = document.createElement("div");
        card.className = "task-card";

        const left = document.createElement("div");
        left.innerText = item.name;

        if (item.stato === "done") {
          left.classList.add("done");
        }

        const actions = document.createElement("div");
        actions.className = "task-actions";



        const toggleBtn = document.createElement("button");
        toggleBtn.innerText = "✅";

        toggleBtn.onclick = () => {
          apiRequest(host + "/items/" + item.id, "PUT", {
            name: item.name,
            stato: item.stato === "todo" ? "done" : "todo"
          }).then(loadItems);
        };

       
        const editBtn = document.createElement("button");
        editBtn.innerText = "✏️";

        editBtn.onclick = () => {

          left.innerHTML = "";

          const input = document.createElement("input");
          input.value = item.name;
          input.style.marginRight = "8px";

          const saveBtn = document.createElement("button");
          saveBtn.innerText = "✔";

          saveBtn.onclick = () => {
            apiRequest(host + "/items/" + item.id, "PUT", {
              name: input.value,
              stato: item.stato
            }).then(loadItems);
          };

          left.appendChild(input);
          left.appendChild(saveBtn);

        };

        
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "🗑️";

        deleteBtn.onclick = () => {
          apiRequest(host + "/items/" + item.id, "DELETE", {})
            .then(loadItems);
        };

        actions.appendChild(toggleBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(left);
        card.appendChild(actions);

        container.appendChild(card);
      }

    });

}

const addTask = document.getElementById("add-task");
const taskInput = document.getElementById("task-name");
addTask.addEventListener("click", () => {
  apiRequest(host + "/lists/" + selectedListId + "/items", "POST", {
    name: taskInput.value
  })
    .then(() => {
      taskInput.value = "";
      loadItems();
    });

});
