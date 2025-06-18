const apiGetUrl = "https://prod-21.brazilsouth.logic.azure.com/workflows/77da8e4a1ca74d87bf2ddea91a375874/triggers/manual/paths/invoke/obtener_registros?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=iw7pt60GqUMZjXpkAv9bCxeYb3ao1S0ILD6maqo5FBE";
const apiDeleteUrl = "https://prod-16.brazilsouth.logic.azure.com/workflows/afdbdf82d461481c8e6c1381ba764ba3/triggers/manual/paths/invoke/eliminar_cliente?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jn1ys-p_-efu_bwm0D-AJIBS2gOkiGqKTVWUW45pesQ";
const apiUpdateUrl = "https://prod-05.brazilsouth.logic.azure.com/workflows/1b22dc96da714da1a10b6ed483c76a90/triggers/manual/paths/invoke/actualizar_cliente?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dikB4VCLsvBfEUyXgJ7Q1wyF0O1Onpwa9GsJdH8YzdU";

document.addEventListener('DOMContentLoaded', async () => {
    const clientTableBody = document.querySelector('#clientTable tbody');

    try {
        const response = await fetch(apiGetUrl);
        if (response.ok) {
            const clients = await response.json();

            if (clients.length === 0) {
                clientTableBody.innerHTML = '<tr><td colspan="8">No hay clientes registrados en el sistema.</td></tr>';
                return;
            }

            clients.forEach(client => {
                let formattedPhone = client.Telefono.replace(/\D/g, '');
                if (!formattedPhone.startsWith("54")) {
                    formattedPhone = "54" + formattedPhone;
                }
                const whatsappLink = `https://wa.me/${formattedPhone}`;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${client.Numero_Cliente}</td>
                    <td>${client.Nombre}</td>
                    <td>${client.Apellido}</td>
                    <td>${client.Vendedor || ''}</td>
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
        clientTableBody.innerHTML = '<tr><td colspan="8">Error al cargar los clientes.</td></tr>';
    }
});

function filterTable() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const tableBody = document.querySelector('#clientTable tbody');
    const rows = tableBody.getElementsByTagName('tr');

    for (let row of rows) {
        let text = '';
        const cells = row.getElementsByTagName('td');
        if (cells.length <= 1) continue;

        for (let cell of cells) {
            text += cell.textContent.toLowerCase() + ' ';
        }

        row.style.display = text.includes(searchInput) ? '' : 'none';
    }
}

async function deleteClient(clientNumber) {
    if (!confirm('¿Estás seguro de que deseas eliminar este cliente?')) return;

    try {
        const response = await fetch(apiDeleteUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Numero_Cliente: clientNumber })
        });
        if (response.ok) {
            alert('Cliente eliminado con éxito.');
            location.reload();
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

        document.getElementById('editClientNumber').value = client.Numero_Cliente;
        document.getElementById('editName').value = client.Nombre;
        document.getElementById('editSurname').value = client.Apellido;
        document.getElementById('editAddress').value = client.Direccion;
        document.getElementById('editPhone').value = client.Telefono;
        document.getElementById('editMunicipality').value = client.Municipio;
        document.getElementById('editSeller').value = client.Vendedor || '';

        const modalElement = document.getElementById('editClientModal');
        const editModal = new bootstrap.Modal(modalElement);
        editModal.show();
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        alert("Hubo un error al intentar editar el cliente.");
    }
}

document.getElementById('editClientForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const clientData = {
        Numero_Cliente: document.getElementById('editClientNumber').value,
        Nombre: document.getElementById('editName').value,
        Apellido: document.getElementById('editSurname').value,
        Direccion: document.getElementById('editAddress').value,
        Telefono: document.getElementById('editPhone').value,
        Municipio: document.getElementById('editMunicipality').value,
        Vendedor: document.getElementById('editSeller').value,
    };

    try {
        const response = await fetch(apiUpdateUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData),
        });

        if (response.ok) {
            alert('Cliente actualizado con éxito.');
            const modalElement = document.getElementById('editClientModal');
            const editModal = bootstrap.Modal.getInstance(modalElement);
            editModal.hide();
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
    clientTableBody.innerHTML = '';

    try {
        const response = await fetch(apiGetUrl);
        if (response.ok) {
            const clients = await response.json();

            if (clients.length === 0) {
                clientTableBody.innerHTML = '<tr><td colspan="8">No hay clientes registrados en el sistema.</td></tr>';
                return;
            }

            clients.forEach(client => {
                let formattedPhone = client.Telefono.replace(/\D/g, '');
                if (!formattedPhone.startsWith("54")) {
                    formattedPhone = "54" + formattedPhone;
                }
                const whatsappLink = `https://wa.me/${formattedPhone}`;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${client.Numero_Cliente}</td>
                    <td>${client.Nombre}</td>
                    <td>${client.Apellido}</td>
                    <td>${client.Vendedor || ''}</td>
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
        clientTableBody.innerHTML = '<tr><td colspan="8">Error al cargar los clientes.</td></tr>';
    }
}
