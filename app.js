// Validación del formulario de tareas (Sprint 1 - Tarea 3)

// Traigo los elementos del HTML
const formulario = document.querySelector('#formularioTarea');
const alertaError = document.querySelector('#alertaError');

const entradaNombre = document.querySelector('#entradaNombre');
const entradaDescripcion = document.querySelector('#entradaDescripcion');
const entradaFecha = document.querySelector('#entradaFecha');
const entradaEstado = document.querySelector('#entradaEstado');


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
  }
});
