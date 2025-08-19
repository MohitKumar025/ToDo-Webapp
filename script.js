document.addEventListener('DOMContentLoaded',()=>{ 
const todoInput = document.getElementById("todoInput");
const addTaskButton = document.getElementById("addTaskButton");
const todoList = document.getElementById("todoList");

const noteInput = document.getElementById("noteInput");
const addNoteButton = document.getElementById("addNoteButton");
const notesList = document.getElementById("notesList");

let tasks = JSON.parse(localStorage.getItem("tasks"))||[];
let notes = JSON.parse(localStorage.getItem("notes")) || [];
// Render saved items
tasks.forEach((tasks) => renderTask(tasks));
  notes.forEach((note) => renderNote(note));
// Tasks
addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    
    if(taskText === "") return;
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value = ""; // clear input
  console.log("Task added:", newTask);
});

function renderTask(task){
 const li =document.createElement('li')
 li.setAttribute('data-id',tasks.id)
 if(tasks.completed) li.classList.add("completed");
 li.innerHTML=` 
 <span>${task.text}</span>
 <button>delete</button>
 `;
 li.addEventListener('click',(e)=>{
   if(e.target.tagName === 'BUTTTON') return;
   tasks.completed = !tasks.completed
   li.classList.toggle('completed')
   saveTasks();
 })
 li.querySelector('button').addEventListener('click',(e)=>{
  e.stopPropagation(); //prevent toggle from firing
  tasks = tasks.filter(t => t.id !== task.id)
  li.remove()
  saveTasks();
 })
 todoList.appendChild(li);
}

function saveTasks(){
     localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Notes----
addNoteButton.addEventListener("click", () => {
    const noteText = noteInput.value.trim();
    if (noteText === "") return;

    const newNote = { id: Date.now(), text: noteText };
    notes.push(newNote);
    saveNotes();
    renderNote(newNote);
    noteInput.value = "";
  });

  function renderNote(note) {
    const div = document.createElement("div");
    div.classList.add("note");
    div.setAttribute("data-id", note.id);
    div.innerHTML = `
      <p>${note.text}</p>
      <button>delete</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      notes = notes.filter(n => n.id !== note.id);
      div.remove();
      saveNotes();
    });

    notesList.appendChild(div);
  }

  function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }
});