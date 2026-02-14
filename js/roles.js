document.addEventListener("DOMContentLoaded", () => {
    const user = getCurrentUser();

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    loadViewByRole(user);
});

function loadViewByRole(user) {

    const container = document.getElementById("roleView");

    if (user.role === "cliente") {
        container.innerHTML = `
            <h3>Panel Cliente</h3>
            <button class="btn btn-primary mb-3" onclick="renderCreateForm()">Nueva Reserva</button>
            <div id="reservationsList"></div>
        `;
        renderUserReservations(user.id);
    }

    if (user.role === "operador") {
        container.innerHTML = `
            <h3>Panel Operador</h3>
            <div id="reservationsList"></div>
        `;
        renderAllReservations();
    }

    if (user.role === "admin") {
        container.innerHTML = `
            <h3>Panel Administrador</h3>
            <div id="stats"></div>
            <div id="reservationsList"></div>
        `;
        renderStats();
        renderAllReservations();
    }
}
