/*
    reservations.js
    Maneja todo el CRUD de reservas:
    - Crear
    - Listar
    - Actualizar estado
    - Eliminar
*/

/*
    Muestra el formulario para crear nueva reserva
*/
console.log("reservations.js cargado");

function renderCreateForm() {

    const container = document.getElementById("reservationsList");

    container.innerHTML = `
    <div class="card p-4 mb-4 shadow-sm">
        <h5 class="mb-3">Nueva Reserva</h5>

        <label class="form-label">Servicio</label>
        <input type="text" id="service" class="form-control mb-3" placeholder="Ej: Asesoría">

        <label class="form-label">Fecha</label>
        <input type="date" id="date" class="form-control mb-3">

        <label class="form-label">Hora</label>
        <input type="time" id="time" class="form-control mb-3" step="1800">

        <button class="btn btn-success w-100" onclick="handleCreateReservation()">
            Guardar
        </button>
    </div>

    <div id="userReservations"></div>
`;

    renderUserReservations(getCurrentUser().id);
}

/*
    Captura datos del formulario y valida
*/
function handleCreateReservation() {

    const service = document.getElementById("service").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!service || !date || !time) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (date < today) {
        alert("No se permiten fechas pasadas");
        return;
    }

    const reservations = getReservations();

    // Validar que no exista reserva en misma fecha y hora
    const exists = reservations.some(r => r.date === date && r.time === time);

    if (exists) {
        alert("Ya existe una reserva en esa fecha y hora");
        return;
    }

    const user = getCurrentUser();

    const newReservation = {
        id: Date.now().toString(),
        clientId: user.id,
        service: service,
        date: date,
        time: time,
        status: "pendiente",
        createdAt: new Date().toISOString()
    };

    reservations.push(newReservation);
    saveReservations(reservations);

    alert("Reserva creada correctamente");

    renderUserReservations(user.id);
}

/*
    Lista reservas del cliente actual
*/
function renderUserReservations(userId) {

    const reservations = getReservations().filter(r => r.clientId === userId);

    const container = document.getElementById("userReservations");

    if (!container) return;

    let html = `
        <h5>Mis Reservas</h5>
        <table class="table">
            <thead>
                <tr>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
    `;

    reservations.forEach(r => {
        html += `
            <tr>
                <td>${r.service}</td>
                <td>${r.date}</td>
                <td>${r.time}</td>
                <td>${r.status}</td>
                <td>
                    <button class="btn btn-danger btn-sm"
                        onclick="deleteReservation('${r.id}')">
                        Cancelar
                    </button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;

    container.innerHTML = html;
}

/*
    Lista todas las reservas (admin y operador)
*/
function renderAllReservations() {

    const reservations = getReservations();
    const container = document.getElementById("reservationsList");
    // Obtener lista de usuarios para poder mostrar el nombre
    const users = getUsers();

    let html = `
        <table class="table">
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    reservations.forEach(r => {
        html += `
            <tr>
                <td>${users.find(u => u.id === r.clientId)?.name || "Desconocido"}</td>
                <td>${r.service}</td>
                <td>${r.date}</td>
                <td>${r.time}</td>
                <td>${r.status}</td>
                <td>
                    <button class="btn btn-success btn-sm"
                        onclick="updateReservationStatus('${r.id}','confirmada')">
                        Confirmar
                    </button>

                    <button class="btn btn-warning btn-sm"
                        onclick="updateReservationStatus('${r.id}','cancelada')">
                        Cancelar
                    </button>

                    <button class="btn btn-danger btn-sm"
                        onclick="deleteReservation('${r.id}')">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;

    container.innerHTML = html;
}

/*
    Cambia estado de reserva
*/
function updateReservationStatus(id, status) {

    const reservations = getReservations();
    const index = reservations.findIndex(r => r.id === id);

    if (index !== -1) {
        reservations[index].status = status;
        saveReservations(reservations);
        renderAllReservations();
    }
}

/*
    Elimina reserva
*/
function deleteReservation(id) {

    let reservations = getReservations();
    reservations = reservations.filter(r => r.id !== id);
    saveReservations(reservations);

    const user = getCurrentUser();

    if (user.role === "cliente") {
        renderUserReservations(user.id);
    } else {
        renderAllReservations();
    }
}
