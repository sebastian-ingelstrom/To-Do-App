const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const filters = document.querySelectorAll(".filter");
const deleteAllButton = document.getElementById("delete-all");
const activeTasks = document.getElementById("active-tasks");
let filter = '';


function updateActiveTasks() {
    let tasks = JSON.parse(localStorage.getItem("data"));
    let activeCount = 0;
    if(tasks){
        tasks.forEach(task => {
            if(!task.checked){
                activeCount++;
            }
        });
    }
    activeTasks.innerHTML = activeCount;
}

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    updateActiveTasks();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    let tasks = [];
    for(let i = 0; i < listContainer.children.length; i++){
        let li = listContainer.children[i];
        tasks.push({text: li.textContent.slice(0, -1), checked: li.classList.contains("checked")});
    }
    localStorage.setItem("data", JSON.stringify(tasks));
    updateActiveTasks();
}

function showTask(){
    let tasks = JSON.parse(localStorage.getItem("data"));
    listContainer.innerHTML = '';
    if(tasks){
        tasks.forEach(task => {
            if(filter === '' || (filter === 'completed' && task.checked) || (filter === 'pending' && !task.checked)){
                let li = document.createElement("li");
                if(task.checked){
                    li.classList.add("checked");
                }
                li.innerHTML = task.text;
                listContainer.appendChild(li);
                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                li.appendChild(span);
            }
        });
    }
}

showTask();

filters.forEach(function (el) {
    el.addEventListener("click", (e) => {
      if (el.classList.contains('active')) {
        el.classList.remove('active');
        filter = '';
      } else {
        filters.forEach(tag => tag.classList.remove('active'));
        el.classList.add('active');
        filter = e.target.dataset.filter;
      }
      showTask();
    });
});

deleteAllButton.addEventListener("click", () => {
    localStorage.clear();
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
    updateActiveTasks();
});
