const apiCreateUrl = "https://prod-02.brazilsouth.logic.azure.com/workflows/e0216dc0080c434f92f90ffda79fd4ff/triggers/manual/paths/invoke/crear_cliente?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lWqG4wSkg3jW3VK7Sl-5oRVdUsijaLZ3BzovP6e86ZA";
const apiGetUrl = "https://prod-21.brazilsouth.logic.azure.com/workflows/a1f66a512b30401f837963fb67c270fb/triggers/manual/paths/invoke/obtener_registros?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wv5unUjOMZBO6-uen9yvRsJi-ao7WAkE_pB35q_0D7k";
const apiDeleteUrl = "https://prod-16.brazilsouth.logic.azure.com/workflows/afdbdf82d461481c8e6c1381ba764ba3/triggers/manual/paths/invoke/eliminar_cliente?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jn1ys-p_-efu_bwm0D-AJIBS2gOkiGqKTVWUW45pesQ";
const apiUpdateUrl = "https://prod-05.brazilsouth.logic.azure.com/workflows/1b22dc96da714da1a10b6ed483c76a90/triggers/manual/paths/invoke/actualizar_cliente?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dikB4VCLsvBfEUyXgJ7Q1wyF0O1Onpwa9GsJdH8YzdU";

const clientForm = document.getElementById('clientForm');
const validationMessage = document.getElementById('validationMessage');
const submitButton = document.getElementById('submitButton');

// Cargar municipios
document.addEventListener('DOMContentLoaded', () => {
    const municipalities = [
    { MUNICIPIOS: "25 de Mayo", Departamento: "25 de Mayo" },
    { MUNICIPIOS: "9 de Julio", Departamento: "Eldorado" },
    { MUNICIPIOS: "Alba Posse", Departamento: "25 de Mayo" },
    { MUNICIPIOS: "Almafuerte", Departamento: "Leandro N. Alem" },
    { MUNICIPIOS: "Apóstoles", Departamento: "Apóstoles" },
    { MUNICIPIOS: "Aristóbulo del Valle", Departamento: "Cainguás" },
    { MUNICIPIOS: "Arroyo del Medio", Departamento: "Leandro N. Alem" },
    { MUNICIPIOS: "Azara", Departamento: "Apóstoles" },
    { MUNICIPIOS: "Bernardo de Irigoyen", Departamento: "General Manuel Belgrano" },
    { MUNICIPIOS: "Bonpland", Departamento: "Candelaria" },
    { MUNICIPIOS: "Caá Yarí", Departamento: "Leandro N. Alem" },
    { MUNICIPIOS: "Campo Grande", Departamento: "Cainguás" },
    { MUNICIPIOS: "Campo Ramón", Departamento: "Oberá" },
    { MUNICIPIOS: "Campo Viera", Departamento: "Oberá" },
    { MUNICIPIOS: "Candelaria", Departamento: "Candelaria" },
    { MUNICIPIOS: "Capioví", Departamento: "Libertador General San Martín" },
    { MUNICIPIOS: "Caraguatay", Departamento: "Montecarlo" },
    { MUNICIPIOS: "Cerro Azul", Departamento: "Leandro N. Alem" },
    { MUNICIPIOS: "Cerro Corá", Departamento: "Candelaria" },
    { MUNICIPIOS: "Colonia Alberdi", Departamento: "Oberá" },
    { MUNICIPIOS: "Colonia Aurora", Departamento: "25 de Mayo" },
    { MUNICIPIOS: "Colonia Delicia", Departamento: "Eldorado" },
    { MUNICIPIOS: "Colonia Polana", Departamento: "San Ignacio" },
    { MUNICIPIOS: "Colonia Victoria", Departamento: "Eldorado" },
    { MUNICIPIOS: "Colonia Wanda", Departamento: "Iguazú" },
    { MUNICIPIOS: "Comandante Andresito", Departamento: "General Manuel Belgrano" },
    { MUNICIPIOS: "Concepción de la Sierra", Departamento: "Concepción" },
    { MUNICIPIOS: "Corpus", Departamento: "San Ignacio" },
    { MUNICIPIOS: "Dos Arroyos", Departamento: "Leandro N. Alem" },
    { MUNICIPIOS: "Dos de Mayo", Departamento: "Cainguás" },
    { MUNICIPIOS: "El Alcázar", Departamento: "Libertador General San Martín" },
    { MUNICIPIOS: "El Soberbio", Departamento: "Guaraní" },
    { MUNICIPIOS: "Eldorado", Departamento: "Eldorado" },
    { MUNICIPIOS: "Fachinal", Departamento: "Capital" },
    { MUNICIPIOS: "Florentino Ameghino", Departamento: "San Javier" },
    { MUNICIPIOS: "Garuhapé", Departamento: "Libertador General San Martín" },
    { MUNICIPIOS: "Garupá", Departamento: "Capital" },
    { MUNICIPIOS: "General Alvear", Departamento: "Oberá" },
    { MUNICIPIOS: "General Urquiza", Departamento: "San Ignacio" },
    { MUNICIPIOS: "Gobernador López", Departamento: "Leandro N. Alem" },
    { MUNICIPIOS: "Gobernador Roca", Departamento: "San Ignacio" },
    { MUNICIPIOS: "Guaraní", Departamento: "Oberá" },
    { MUNICIPIOS: "Hipólito Yrigoyen", Departamento: "San Ignacio" },
    { MUNICIPIOS: "Itacaruaré", Departamento: "San Javier" },
    { MUNICIPIOS: "Jardín América", Departamento: "San Ignacio" },
    { MUNICIPIOS: "Leandro N. Alem", Departamento: "Leandro N. Alem" },
    { MUNICIPIOS: "Loreto", Departamento: "Candelaria" },
    { MUNICIPIOS: "Los Helechos", Departamento: "Oberá" },
    { MUNICIPIOS: "Mártires", Departamento: "Candelaria" },
    { MUNICIPIOS: "Mojón Grande", Departamento: "San Javier" },
    { MUNICIPIOS: "Montecarlo", Departamento: "Montecarlo" },
    { MUNICIPIOS: "Oberá", Departamento: "Oberá" },
    { MUNICIPIOS: "Olegario Víctor Andrade", Departamento: "Leandro N. Alem" },
    { MUNICIPIOS: "Panambí", Departamento: "Oberá" },
    { MUNICIPIOS: "Posadas", Departamento: "Capital" },
    { MUNICIPIOS: "Profundidad", Departamento: "Candelaria" },
    { MUNICIPIOS: "Puerto Esperanza", Departamento: "Iguazú" },
    { MUNICIPIOS: "Puerto Iguazú", Departamento: "Iguazú" },
    { MUNICIPIOS: "Puerto Leoni", Departamento: "Libertador General San Martín" },
    { MUNICIPIOS: "Puerto Libertad", Departamento: "Iguazú" },
    { MUNICIPIOS: "Puerto Piray", Departamento: "Montecarlo" },
    { MUNICIPIOS: "Puerto Rico", Departamento: "Libertador General San Martín" },
    { MUNICIPIOS: "Ruiz de Montoya", Departamento: "Libertador General San Martín" },
    { MUNICIPIOS: "San Antonio", Departamento: "General Manuel Belgrano" },
    { MUNICIPIOS: "San Ignacio", Departamento: "San Ignacio" },
    { MUNICIPIOS: "San Javier", Departamento: "San Javier" },
    { MUNICIPIOS: "San José", Departamento: "Apóstoles" },
    { MUNICIPIOS: "San Martín", Departamento: "Oberá" },
    { MUNICIPIOS: "San Pedro", Departamento: "San Pedro" },
    { MUNICIPIOS: "San Vicente", Departamento: "Guaraní" },
    { MUNICIPIOS: "Santa Ana", Departamento: "Candelaria" },
    { MUNICIPIOS: "Santa María", Departamento: "Concepción" },
    { MUNICIPIOS: "Santiago de Liniers", Departamento: "Eldorado" },
    { MUNICIPIOS: "Santo Pipó", Departamento: "San Ignacio" },
    { MUNICIPIOS: "Tres Capones", Departamento: "Apóstoles" },
]; // Colocá acá tu array completo de municipios
    const municipalitySelect = document.getElementById('municipality');
    municipalities.forEach(muni => {
        const option = document.createElement('option');
        option.value = muni.MUNICIPIOS;
        option.textContent = `${muni.MUNICIPIOS} (${muni.Departamento})`;
        municipalitySelect.appendChild(option);
    });

    const clientNumberInput = document.getElementById('clientNumber');
    clientNumberInput.addEventListener('input', validateClientNumber);

    // Evaluar validez total del formulario dinámicamente
    const inputs = clientForm.querySelectorAll('input, select');
    inputs.forEach(input => input.addEventListener('input', evaluarFormulario));
});

// Valida si el número de cliente ya existe
async function validateClientNumber() {
    const clientNumber = document.getElementById('clientNumber').value;

    if (!clientNumber) {
        validationMessage.style.color = 'red';
        validationMessage.textContent = 'Por favor, ingresa un número de cliente.';
        submitButton.disabled = true;
        return;
    }

    try {
        const response = await fetch(apiGetUrl);
        const clients = await response.json();

        const exists = clients.find(c => c.Numero_Cliente === clientNumber);
        if (exists) {
            validationMessage.style.color = 'red';
            validationMessage.textContent = `El número de cliente ${clientNumber} ya está registrado por: ${exists.Nombre} ${exists.Apellido}`;
            submitButton.disabled = true;
        } else {
            validationMessage.style.color = 'green';
            validationMessage.textContent = `El número de cliente ${clientNumber} está disponible.`;
            evaluarFormulario(); // solo habilita si el resto también está ok
        }
    } catch (error) {
        console.error('Error al validar el cliente:', error.message);
        validationMessage.textContent = 'Error de validación.';
        submitButton.disabled = true;
    }
}

// Evalúa si el formulario completo es válido
function evaluarFormulario() {
    const formValido = clientForm.checkValidity();
    const clientNumberOk = validationMessage.textContent.includes("disponible");
    submitButton.disabled = !(formValido && clientNumberOk);
}

// Envío del formulario
clientForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const clientData = {
        Numero_Cliente: document.getElementById('clientNumber').value,
        Nombre: document.getElementById('name').value,
        Apellido: document.getElementById('surname').value,
        Vendedor: document.getElementById('seller').value,
        Direccion: document.getElementById('address').value,
        Telefono: document.getElementById('phone').value,
        Municipio: document.getElementById('municipality').value
    };

    try {
        const res = await fetch(apiCreateUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData)
        });

        if (res.ok) {
            alert('Cliente registrado con éxito.');
            clientForm.reset();
            validationMessage.textContent = '';
            submitButton.disabled = true;
        } else {
            throw new Error('Error al registrar el cliente.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert('No se pudo registrar el cliente.');
    }
});

// Eliminar cliente
async function deleteClient(clientNumber) {
    try {
        const res = await fetch(apiDeleteUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Numero_Cliente: clientNumber })
        });

        if (res.ok) {
            alert('Cliente eliminado con éxito.');
            location.reload();
        } else {
            throw new Error('Error al eliminar.');
        }
    } catch (error) {
        alert('No se pudo eliminar.');
    }
}

// Actualizar cliente
document.getElementById('editClientForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        Numero_Cliente: document.getElementById('editClientNumber').value,
        Nombre: document.getElementById('editName').value,
        Apellido: document.getElementById('editSurname').value,
        Direccion: document.getElementById('editAddress').value,
        Telefono: document.getElementById('editPhone').value,
        Municipio: document.getElementById('editMunicipality').value
        // Podés agregar Vendedor si es editable también
    };

    try {
        const res = await fetch(apiUpdateUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert('Cliente actualizado.');
            const modal = bootstrap.Modal.getInstance(document.getElementById('editClientModal'));
            modal.hide();
            await loadClients();
        } else {
            throw new Error('Error al actualizar.');
        }
    } catch (error) {
        alert('No se pudo actualizar.');
    }
});
