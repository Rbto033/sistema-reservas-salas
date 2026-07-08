// Seleccion de elementos del DOM
// Capturamos los elementos del formulario (entradas)
const formulario = document.getElementById('form-reserva');
const inputNombre = document.getElementById('nombre');
const inputRut = document.getElementById('rut');
const selectSala = document.getElementById('sala');
const inputFecha = document.getElementById('fecha');
const inputHoraInicio = document.getElementById('hora_inicio');
const inputHoraFin = document.getElementById('hora_fin');


// Evento 'submit' del formulario
// Se dispara al hacer clic en el boton Reservar
formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    const salaSeleccionada = selectSala.value;

    // Validacion: verificar que se haya seleccionado una sala
    if (salaSeleccionada === '') {
        alert('Por favor selecciona una sala.');
        return;
    }

    // Capturamos la celda de estado correspondiente a la sala
    const celdaEstado = document.getElementById('estado-' + salaSeleccionada);

    // Validacion: verificar que la sala no este ocupada
    if (celdaEstado.textContent === 'Ocupada') {
        alert('La sala seleccionada ya está ocupada. Por favor elige otra.');
        return;
    }

    // Actualizamos el estado de la sala en la tabla
    celdaEstado.textContent = 'Ocupada';
    // Gestion de estilos: removemos la clase disponible y agregamos ocupada
    celdaEstado.classList.remove('estado-disponible');
    celdaEstado.classList.add('estado-ocupada');
    selectSala.classList.remove('sala-ocupada');

    alert('¡Reserva realizada con éxito!');

    // Limpiamos el formulario tras la reserva exitosa
    formulario.reset();
});


// Reflejo en tiempo real (Evento 'change')
// Se dispara al seleccionar una sala distinta en el menu desplegable
selectSala.addEventListener('change', function() {
    const salaSeleccionada = selectSala.value;

    // Si no se selecciono ninguna sala, no hacemos nada
    if (salaSeleccionada === '') return;

    const celdaEstado = document.getElementById('estado-' + salaSeleccionada);

    // Avisamos visualmente si la sala ya esta ocupada al momento de seleccionarla
    if (celdaEstado.textContent === 'Ocupada') {
        selectSala.classList.add('sala-ocupada');
    } else {
        selectSala.classList.remove('sala-ocupada');
    }
});

// Limitar la fecha al rango permitido (hoy hasta 7 dias adelante)
const inputFecha = document.getElementById('fecha');
const hoy = new Date();
const maxFecha = new Date();
maxFecha.setDate(hoy.getDate() + 7);

// Formateamos las fechas a YYYY-MM-DD que es lo que acepta input type="date"
inputFecha.min = hoy.toISOString().split('T')[0];
inputFecha.max = maxFecha.toISOString().split('T')[0];