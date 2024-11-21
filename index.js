document.addEventListener('DOMContentLoaded', ()=> {
    const storedTask = JSON.parse(localStorage.getItem('tasks'))

    if(storedTask){
        storedTask.forEach((task) => tasks.push(task))
        updateTaskList()
        uptatedStetus()
    }
})

let tasks = [];

const saveTask = () => {
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

const textInput = document.getElementById('textInput');
const addBtn = document.getElementById('addBtn');



const addTask = () => {
    const text = textInput.value.trim();

    if(text===''){
        alert('add task first')
    }else{
        tasks.push({text:text,completed:false});
        textInput.value = '';
        updateTaskList();
        uptatedStetus()
        saveTask()
    }
}

const taggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed
    updateTaskList();
    uptatedStetus()
    saveTask()
};

const deletTask = (index) => {
    tasks.splice(index,1)
    updateTaskList();
    uptatedStetus()
    saveTask()
}

const editTask = (index) => {
    textInput.value = tasks[index].text;
    tasks.splice(index,1);
    updateTaskList();
    uptatedStetus()
    saveTask()
}

const uptatedStetus = () => {
    const completedTask = tasks.filter((task) => task.completed).length;
    const totalTask = tasks.length;
    const progress = (completedTask/totalTask) *100;
    const progressBar = document.getElementById('progras')
    progressBar.style.width = `${progress}%`

    document.getElementById('numbers').innerText = `${completedTask} / ${totalTask}`

    if(tasks.length && completedTask === totalTask ){
        plastConfeti()
    }
}

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task,index) => {
        const listItem = document.createElement('li')

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : "" }">
                    <input type="checkbox" class="checkbox" ${task.completed?"checked":''}/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <span onClick="editTask(${index})"><i class="fa-regular fa-pen-to-square"></i></span>
                    <span onClick="deletTask(${index})"><i class="fa-solid fa-trash"></i></span>
                </div>
            </div>
        `;
        listItem.addEventListener('change', ()=> taggleTaskComplete(index))
        taskList.appendChild(listItem)
    });
}

addBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    addTask();
})

const plastConfeti = () => {
    const duration = 3 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
}