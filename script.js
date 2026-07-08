// Simulamos una BDD
const salas = [
    { id: 1, nombre: 'Sala 1', capacidad: 8, estado: 'ocupada' },
    { id: 2, nombre: 'Sala 2', capacidad: 8, estado: 'disponible' },
    { id: 3, nombre: 'Sala 3', capacidad: 8, estado: 'disponible' },
    { id: 4, nombre: 'Sala 4', capacidad: 4, estado: 'disponible' },
    { id: 5, nombre: 'Sala 5', capacidad: 6, estado: 'disponible' },
    { id: 6, nombre: 'Sala 6', capacidad: 6, estado: 'disponible' },
    { id: 7, nombre: 'Sala 7', capacidad: 4, estado: 'disponible' },
    { id: 8, nombre: 'Sala 8', capacidad: 4, estado: 'disponible' },
    { id: 9, nombre: 'Sala 9', capacidad: 4, estado: 'ocupada' },
]


// Seleccion de elementos del DOM
// Capturamos los elementos del formulario (entradas)
const formulario = document.getElementById('form-reserva');
const inputNombre = document.getElementById('nombre');
const inputRut = document.getElementById('rut-usuario');
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
const hoy = new Date();
const maxFecha = new Date();
maxFecha.setDate(hoy.getDate() + 7);

// Formateamos las fechas a YYYY-MM-DD que es lo que acepta input type="date"
inputFecha.min = hoy.toISOString().split('T')[0];
inputFecha.max = maxFecha.toISOString().split('T')[0];


// Cambia el estado de una sala (disponible / ocupada)
function cambiarEstadoSala(id, nuevoEstado) {
    const sala = buscarSala(id);
    if (sala) {
        sala.estado = nuevoEstado;
    }
}


// Carga las opciones de salas en el formulario.
function cargarOpcionesSala() {
    salas.forEach(sala => {
        const opcion = document.createElement('option');
        opcion.value = sala.id;
        opcion.textContent = `${sala.nombre} - ${sala.capacidad} personas`;
        selectSala.appendChild(opcion);
    });
}

// Carga la tabla de salas a partir del arreglo "salas".
function cargarTablaSalas() {
    const tabla = document.getElementById('tabla-salas');
    tabla.innerHTML = '';

    salas.forEach(sala => {
        const clase = sala.estado === 'ocupada' ? 'estado-ocupada' : 'estado-disponible';
        const texto = sala.estado === 'ocupada' ? 'Ocupada' : 'Disponible';

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${sala.nombre}</td>
            <td>${sala.capacidad} personas</td>
            <td id="estado-${sala.id}" class="${clase}">${texto}</td>
        `;
        tabla.appendChild(fila);
    });
}

// Cargamos el formulario y la tabla apenas se abre la pagina
cargarOpcionesSala();
cargarTablaSalas();