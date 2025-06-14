let map, geocoder, marker, direccionCompleta;

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
  { MUNICIPIOS: "Tres Capones", Departamento: "Apóstoles" }
];
 // Podés completar con el array largo si querés

function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -27.3622, lng: -55.9000 },
    zoom: 14,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
        marker = new google.maps.Marker({ position: pos, map: map });
        geocodeLatLng(pos);
      },
      () => {
        document.getElementById("direccionDetectada").textContent =
          "⚠️ No se pudo obtener la ubicación.";
      }
    );
  }
}

function geocodeLatLng(latlng) {
  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === "OK" && results[0]) {
      direccionCompleta = results[0].formatted_address;
      document.getElementById("direccionDetectada").textContent = "📍 " + direccionCompleta;
    } else {
      document.getElementById("direccionDetectada").textContent = "❌ No se encontró dirección.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const usarBtn = document.getElementById("usarDireccion");
  if (usarBtn) {
    usarBtn.addEventListener("click", () => {
      if (direccionCompleta) {
        document.getElementById("address").value = direccionCompleta;
        const modal = bootstrap.Modal.getInstance(document.getElementById("mapModal"));
        modal.hide();
      }
    });
  }

  const direccion = localStorage.getItem("direccionDetectada");
  if (direccion) {
    document.getElementById("address").value = direccion;
    localStorage.removeItem("direccionDetectada");
  }

  const campos = ["clientNumber", "name", "surname", "seller", "phone", "municipality"];
  campos.forEach((id) => {
    const input = document.getElementById(id);
    const valor = localStorage.getItem("form_" + id);
    if (input && valor) input.value = valor;
    localStorage.removeItem("form_" + id);
  });

  const select = document.getElementById("municipality");
  if (select) {
    municipalities.forEach((muni) => {
      const option = document.createElement("option");
      option.value = muni.MUNICIPIOS;
      option.textContent = `${muni.MUNICIPIOS} (${muni.Departamento})`;
      select.appendChild(option);
    });
  }

  const form = document.getElementById("clientForm");
  const submitButton = document.getElementById("submitButton");

  form.addEventListener("input", () => {
    if (form.checkValidity()) {
      submitButton.disabled = false;
      document.getElementById("validationMessage").textContent = "";
    } else {
      submitButton.disabled = true;
    }
  });

  document.getElementById("clientNumber").addEventListener("blur", () => {
    const num = document.getElementById("clientNumber").value.trim();
    if (num) {
      fetch("https://prod-21.brazilsouth.logic.azure.com/workflows/a1f66a512b30401f837963fb67c270fb/triggers/manual/paths/invoke/obtener_registros?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wv5unUjOMZBO6-uen9yvRsJi-ao7WAkE_pB35q_0D7k")
        .then((res) => res.json())
        .then((data) => {
          const yaExiste = data.find((cliente) => cliente.Numero_Cliente == num);
          if (yaExiste) {
            document.getElementById("validationMessage").style.color = "red";
            document.getElementById("validationMessage").textContent =
              `El número de cliente ${num} ya está registrado por: ${yaExiste.Nombre} ${yaExiste.Apellido}`;
            document.getElementById("submitButton").disabled = true;
          } else {
            document.getElementById("validationMessage").style.color = "green";
            document.getElementById("validationMessage").textContent = `El número de cliente ${num} está disponible.`;
            if (form.checkValidity()) {
              document.getElementById("submitButton").disabled = false;
            }
          }
        })
        .catch((err) => {
          console.error("Error al validar número de cliente:", err);
          document.getElementById("validationMessage").textContent =
            "Hubo un error al validar el cliente. Intente nuevamente.";
          document.getElementById("submitButton").disabled = true;
        });
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const clientData = {
      Numero_Cliente: document.getElementById("clientNumber").value,
      Nombre: document.getElementById("name").value,
      Apellido: document.getElementById("surname").value,
      Telefono: document.getElementById("phone").value,
      Municipio: document.getElementById("municipality").value,
      Direccion: document.getElementById("address").value,
      Vendedor: document.getElementById("seller").value,
    };

    try {
      const response = await fetch("https://prod-02.brazilsouth.logic.azure.com/workflows/e0216dc0080c434f92f90ffda79fd4ff/triggers/manual/paths/invoke/crear_cliente?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lWqG4wSkg3jW3VK7Sl-5oRVdUsijaLZ3BzovP6e86ZA", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
        alert('Cliente registrado con éxito.');
        form.reset();
        document.getElementById("validationMessage").textContent = '';
        submitButton.disabled = true;
      } else {
        throw new Error('Error al registrar el cliente.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('No se pudo registrar el cliente.');
    }
  });
});

function guardarCampos() {
  const campos = ["clientNumber", "name", "surname", "seller", "phone", "municipality"];
  campos.forEach((id) => {
    const input = document.getElementById(id);
    if (input) localStorage.setItem("form_" + id, input.value);
  });
}
