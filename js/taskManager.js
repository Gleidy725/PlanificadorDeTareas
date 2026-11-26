// Clase que guarda y maneja las tareas 

// Crea el HTML de una tarjeta de tarea
function createTaskHtml(id, name, description, dueDate, status) {
  let claseTarjeta = 'card tarjeta-tarea';
  let claseEtiqueta = 'etiqueta-pendiente';
  let textoEstado = 'Pendiente';
  let textoBoton = 'Mark As Done';

  if (status === 'DONE') {
    claseTarjeta = claseTarjeta + ' tarjeta-completada';
    claseEtiqueta = 'etiqueta-completada';
    textoEstado = 'Completada';
    textoBoton = 'Marcar como pendiente';
  }

  return '<div class="' + claseTarjeta + '">' +
    '<div class="card-body" data-task-id="' + id + '">' +
      '<h3 class="card-title h6">' + name + '</h3>' +
      '<p class="card-text">' + description + '</p>' +
      '<p class="card-text">Fecha de entrega: ' + dueDate + '</p>' +
      '<span class="badge ' + claseEtiqueta + '">' + textoEstado + '</span>' +
      '<button type="button" class="btn btn-sm boton-lavanda done-button d-block mt-2">' + textoBoton + '</button>' +
      '<button type="button" class="delete-button btn btn-sm btn-danger mt-2">Eliminar</button>' +
    '</div>' +
  '</div>';
}

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  // Agrega una tarea nueva al array tasks
  addTask(name, description, dueDate, status) {
    this.currentId++;

    this.tasks.push({
      id: this.currentId,
      name: name,
      description: description,
      dueDate: dueDate,
      status: 'PORHACER'
    });
  }

  // Elimina la tarea que tenga ese id
  deleteTask(taskId) {
    const newTasks = [];

    for (let task of this.tasks) {
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }

    this.tasks = newTasks;
  }

  // Busca una tarea por su id
  getTaskById(taskId) {
    let foundTask;

    for (let task of this.tasks) {
      if (task.id === taskId) {
        foundTask = task;
      }
    }

    return foundTask;
  }

  // Guarda las tareas en el localStorage
  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('currentId', this.currentId);
  }

  // Trae las tareas guardadas en el localStorage
  load() {
    const savedTasks = localStorage.getItem('tasks');
    const savedId = localStorage.getItem('currentId');

    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }

    if (savedId) {
      this.currentId = Number(savedId);
    }
  }

  // Dibuja las tareas en la lista
  render() {
    const listaTareas = document.querySelector('#listaTareas');
    let html = '';

    for (let task of this.tasks) {
      html = html + createTaskHtml(task.id, task.name, task.description, task.dueDate, task.status);
    }

    if (this.tasks.length === 0) {
      html = '<p class="texto-vacio mb-0">Todavía no hay tareas registradas.</p>';
    }

    listaTareas.innerHTML = html;
  }
}