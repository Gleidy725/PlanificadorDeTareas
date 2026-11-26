// Traigo los elementos del HTML
const formulario = document.querySelector('#formularioTarea');
const alertaError = document.querySelector('#alertaError');

const entradaNombre = document.querySelector('#entradaNombre');
const entradaDescripcion = document.querySelector('#entradaDescripcion');
const entradaFecha = document.querySelector('#entradaFecha');
const entradaEstado = document.querySelector('#entradaEstado');

// Creo el TaskManager que guarda las tareas
const taskManager = new TaskManager();
taskManager.load();
taskManager.render();
console.log(taskManager.tasks);


// Revisa los datos del formulario.
// Devuelve un texto con los errores. Si no hay errores devuelve "".
function validFormFieldInput(datos) {
  let mensaje = "";

  if (datos.nombre.trim() == "") {
    mensaje = mensaje + "El nombre no puede estar vacío.<br>";
  }

  if (datos.descripcion.trim() == "") {
    mensaje = mensaje + "La descripción no puede estar vacía.<br>";
  }

  if (datos.fecha == "") {
    mensaje = mensaje + "Debes seleccionar una fecha de entrega.<br>";
  }

  if (datos.estado == "") {
    mensaje = mensaje + "Debes seleccionar un estado.<br>";
  }

  return mensaje;
}


// Muestra la alerta con el mensaje
function mostrarAlerta(mensaje) {
  alertaError.innerHTML = mensaje;
  alertaError.classList.remove('d-none');
}

// Oculta la alerta
function ocultarAlerta() {
  alertaError.classList.add('d-none');
}


// Cuando se envía el formulario
formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const datos = {
    nombre: entradaNombre.value,
    descripcion: entradaDescripcion.value,
    fecha: entradaFecha.value,
    estado: entradaEstado.value
  };

  // para comprobar que se leen los datos
  console.log("nombre: " + datos.nombre);
  console.log("descripcion: " + datos.descripcion);
  console.log("fecha: " + datos.fecha);
  console.log("estado: " + datos.estado);

  const errores = validFormFieldInput(datos);

  if (errores != "") {
    mostrarAlerta(errores);
  } else {
    ocultarAlerta();

    // los datos son válidos, entonces se agrega la tarea
    taskManager.addTask(datos.nombre, datos.descripcion, datos.fecha, datos.estado);
    taskManager.save();
    taskManager.render();
    console.log(taskManager.tasks);

    formulario.reset();
  }
});

// Click en la lista de tareas (sirve para los botones de cada tarjeta)
const listaTareas = document.querySelector('#listaTareas');

listaTareas.addEventListener('click', function (event) {

  // Botón de marcar o desmarcar como completada (Sprint 2 - Tarea 4)
  if (event.target.classList.contains('boton-estado')) {
    const parentTask = event.target.parentElement;
    const taskId = Number(parentTask.dataset.taskId);

    for (let task of taskManager.tasks) {
      if (task.id === taskId) {
        if (task.status === 'HECHO') {
          task.status = 'PORHACER';
        } else {
          task.status = 'HECHO';
        }
      }
    }

    taskManager.save();
    taskManager.render();
  }

  // Botón de eliminar (Sprint 2 - Tarea 6)
  if (event.target.classList.contains('delete-button')) {
    const parentTask = event.target.parentElement;
    const taskId = Number(parentTask.dataset.taskId);

    taskManager.deleteTask(taskId);
    taskManager.save();
    taskManager.render();
  }
});
