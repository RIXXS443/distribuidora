const apiGetUrl = "https://prod-21.brazilsouth.logic.azure.com/workflows/a1f66a512b30401f837963fb67c270fb/triggers/manual/paths/invoke/obtener_registros?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wv5unUjOMZBO6-uen9yvRsJi-ao7WAkE_pB35q_0D7k";
const apiDeleteUrl = "https://prod-16.brazilsouth.logic.azure.com/workflows/afdbdf82d461481c8e6c1381ba764ba3/triggers/manual/paths/invoke/eliminar_cliente?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jn1ys-p_-efu_bwm0D-AJIBS2gOkiGqKTVWUW45pesQ";
const apiUpdateUrl = "https://prod-05.brazilsouth.logic.azure.com/workflows/1b22dc96da714da1a10b6ed483c76a90/triggers/manual/paths/invoke/actualizar_cliente?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dikB4VCLsvBfEUyXgJ7Q1wyF0O1Onpwa9GsJdH8YzdU";

document.addEventListener('DOMContentLoaded', async () => {
    const clientTableBody = document.querySelector('#clientTable tbody');

    try {
        const response = await fetch(apiGetUrl);
        if (response.ok) {
            const clients = await response.json();

            if (clients.length === 0) {
                clientTableBody.innerHTML = '<tr><td colspan="7">No hay clientes registrados en el sistema.</td></tr>';
                return;
            }

            clients.forEach(client => {
                // Formatear número para WhatsApp (Argentina +54)
                let formattedPhone = client.Telefono.replace(/\D/g, ''); // Elimina caracteres no numéricos
                if (!formattedPhone.startsWith("54")) {
                    formattedPhone = "54" + formattedPhone; // Agrega el prefijo si no lo tiene
                }
                const whatsappLink = `https://wa.me/${formattedPhone}`;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${client.Numero_Cliente}</td>
                    <td>${client.Nombre}</td>
                    <td>${client.Apellido}</td>
                    <td>${client.Direccion}</td>
                    <td>
                        <a href="${whatsappLink}" target="_blank" class="btn btn-success btn-sm">
                            <i class="bi bi-whatsapp"></i> ${client.Telefono}
                        </a>
                    </td>
                    <td>${client.Municipio.trim()}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteClient('${client.Numero_Cliente}')">Eliminar</button>
                        <button class="btn btn-warning btn-sm" onclick="editClient('${client.Numero_Cliente}')">Editar</button>
                    </td>
                `;
                clientTableBody.appendChild(row);
            });
        } else {
            throw new Error('Error al obtener la lista de clientes.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        clientTableBody.innerHTML = '<tr><td colspan="7">Error al cargar los clientes.</td></tr>';
    }
});

function filterTable() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const tableBody = document.querySelector('#clientTable tbody');
    const rows = tableBody.getElementsByTagName('tr');

    for (let row of rows) {
        let text = '';
        const cells = row.getElementsByTagName('td');
        
        // Omitir si es una fila de error o mensaje de "no hay clientes"
        if (cells.length <= 1) {
            continue;
        }

        // Concatenar todo el contenido de las celdas
        for (let cell of cells) {
            text += cell.textContent.toLowerCase() + ' ';
        }

        // Mostrar/ocultar fila según el texto de búsqueda
        if (text.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

async function deleteClient(clientNumber) {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este cliente?');
    if (!confirmation) return;

    try {
        const response = await fetch(apiDeleteUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Numero_Cliente: clientNumber })
        });
        if (response.ok) {
            alert('Cliente eliminado con éxito.');
            location.reload(); // Recargar la página para actualizar la lista
        } else {
            throw new Error('Error al eliminar el cliente.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert('No se pudo eliminar el cliente.');
    }
}

async function editClient(clientNumber) {
    try {
        const response = await fetch(apiGetUrl);
        const clients = await response.json();
        const client = clients.find(c => c.Numero_Cliente === clientNumber);

        if (!client) {
            alert("Cliente no encontrado.");
            return;
        }

        // Llenar el modal con los datos del cliente
        document.getElementById('editClientNumber').value = client.Numero_Cliente;
        document.getElementById('editName').value = client.Nombre;
        document.getElementById('editSurname').value = client.Apellido;
        document.getElementById('editAddress').value = client.Direccion;
        document.getElementById('editPhone').value = client.Telefono;
        document.getElementById('editMunicipality').value = client.Municipio;

        // Forzar inicialización del modal para evitar errores
        const modalElement = document.getElementById('editClientModal');
        const editModal = new bootstrap.Modal(modalElement);
        editModal.show();
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        alert("Hubo un error al intentar editar el cliente.");
    }
}

function updateClient(clientNumber) {
    document.getElementById('editClientForm').submit();
}

document.getElementById('editClientForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar que la página se recargue

    const clientData = {
        Numero_Cliente: document.getElementById('editClientNumber').value,
        Nombre: document.getElementById('editName').value,
        Apellido: document.getElementById('editSurname').value,
        Direccion: document.getElementById('editAddress').value,
        Telefono: document.getElementById('editPhone').value,
        Municipio: document.getElementById('editMunicipality').value,
    };

    try {
        console.log("Enviando datos a:", apiUpdateUrl); // 📌 Verifica si la URL es correcta

        const response = await fetch(apiUpdateUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData),
        });

        if (response.ok) {
            alert('Cliente actualizado con éxito.');

            // **Cerrar el modal correctamente**
            const modalElement = document.getElementById('editClientModal');
            const editModal = bootstrap.Modal.getInstance(modalElement);
            editModal.hide();

            // **Recargar la tabla sin refrescar la página**
            await loadClients();
        } else {
            throw new Error(`Error en la API: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        alert('No se pudo actualizar el cliente.');
    }
});

async function loadClients() {
    const clientTableBody = document.querySelector('#clientTable tbody');
    clientTableBody.innerHTML = ''; // Limpiar tabla antes de recargar datos

    try {
        const response = await fetch(apiGetUrl);
        if (response.ok) {
            const clients = await response.json();

            if (clients.length === 0) {
                clientTableBody.innerHTML = '<tr><td colspan="7">No hay clientes registrados en el sistema.</td></tr>';
                return;
            }

            clients.forEach(client => {
                // Formatear número para WhatsApp (Argentina +54)
                let formattedPhone = client.Telefono.replace(/\D/g, ''); // Elimina caracteres no numéricos
                if (!formattedPhone.startsWith("54")) {
                    formattedPhone = "54" + formattedPhone; // Agrega el prefijo si no lo tiene
                }
                const whatsappLink = `https://wa.me/${formattedPhone}`;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${client.Numero_Cliente}</td>
                    <td>${client.Nombre}</td>
                    <td>${client.Apellido}</td>
                    <td>${client.Direccion}</td>
                    <td>
                        <a href="${whatsappLink}" target="_blank" class="btn btn-success btn-sm">
                            <i class="bi bi-whatsapp"></i> ${client.Telefono}
                        </a>
                    </td>
                    <td>${client.Municipio.trim()}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteClient('${client.Numero_Cliente}')">Eliminar</button>
                        <button class="btn btn-warning btn-sm" onclick="editClient('${client.Numero_Cliente}')">Editar</button>
                    </td>
                `;
                clientTableBody.appendChild(row);
            });
        } else {
            throw new Error('Error al obtener la lista de clientes.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        clientTableBody.innerHTML = '<tr><td colspan="7">Error al cargar los clientes.</td></tr>';
    }
}
