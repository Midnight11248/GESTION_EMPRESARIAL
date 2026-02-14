/*
    Muestra estadísticas en tarjetas visuales
*/
function renderStats() {

    const statsContainer = document.getElementById("stats");
    const reservations = getReservations();

    const total = reservations.length;
    const confirmadas = reservations.filter(r => r.status === "confirmada").length;
    const canceladas = reservations.filter(r => r.status === "cancelada").length;
    const pendientes = reservations.filter(r => r.status === "pendiente").length;

    statsContainer.innerHTML = `
        <div class="row text-center mb-4">

            <div class="col">
                <div class="card p-3 shadow-sm">
                    <h6>Total</h6>
                    <h4>${total}</h4>
                </div>
            </div>

            <div class="col">
                <div class="card p-3 shadow-sm">
                    <h6>Confirmadas</h6>
                    <h4>${confirmadas}</h4>
                </div>
            </div>

            <div class="col">
                <div class="card p-3 shadow-sm">
                    <h6>Canceladas</h6>
                    <h4>${canceladas}</h4>
                </div>
            </div>

            <div class="col">
                <div class="card p-3 shadow-sm">
                    <h6>Pendientes</h6>
                    <h4>${pendientes}</h4>
                </div>
            </div>

        </div>
    `;
}
