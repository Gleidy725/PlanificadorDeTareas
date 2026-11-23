// Traigo los elementos del HTML
const formulario = document.querySelector('#formularioTarea');
const alertaError = document.querySelector('#alertaError');

const entradaNombre = document.querySelector('#entradaNombre');
const entradaDescripcion = document.querySelector('#entradaDescripcion');
const entradaFecha = document.querySelector('#entradaFecha');
const entradaEstado = document.querySelector('#entradaEstado');

// Creo el TaskManager que guarda las tareas
const taskManager = new TaskManager();
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
    console.log(taskManager.tasks);

    formulario.reset();
  }
});

// Marcar o desmarcar una tarea como completada (Sprint 2 - Tarea 4)
const botonesEstado = document.querySelectorAll('.boton-estado');

for (let i = 0; i < botonesEstado.length; i++) {
  botonesEstado[i].addEventListener('click', function () {
    cambiarEstadoTarea(botonesEstado[i]);
  });
}

// Cambia la tarjeta entre Pendiente y Completada
function cambiarEstadoTarea(boton) {
  const tarjeta = boton.closest('.tarjeta-tarea');
  const etiqueta = tarjeta.querySelector('.badge');

  if (tarjeta.classList.contains('tarjeta-completada')) {
    // volver a pendiente
    tarjeta.classList.remove('tarjeta-completada');
    etiqueta.classList.remove('etiqueta-completada');
    etiqueta.classList.add('etiqueta-pendiente');
    etiqueta.textContent = 'Pendiente';
    boton.textContent = 'Marcar como completada';
  } else {
    // marcar como completada
    tarjeta.classList.add('tarjeta-completada');
    etiqueta.classList.remove('etiqueta-pendiente');
    etiqueta.classList.add('etiqueta-completada');
    etiqueta.textContent = 'Completada';
    boton.textContent = 'Marcar como pendiente';
  }
}
