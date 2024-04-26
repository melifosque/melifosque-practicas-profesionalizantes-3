function obtenerProvincias() {
    fetch('/api/provincias')
    .then(response => response.json())
    .then(data => {
        const selectProvincia = document.getElementById('provincia');
        selectProvincia.innerHTML = '';
        data.forEach(provincia => {
            const option = document.createElement('option');
            option.value = provincia.provincia_id;
            option.text = provincia.name;
            selectProvincia.appendChild(option);
        });
    })
    .catch(error => console.error('Error:', error));
}

function obtenerDepartamentos() {
    const provinciaSeleccionada = document.getElementById('provincia').value;
    if (!provinciaSeleccionada) return; // Evitar solicitud si no hay provincia seleccionada
    fetch(`/api/departamentos?provincia_id=${provinciaSeleccionada}`)
    .then(response => response.json())
    .then(data => {
        const selectDepartamento = document.getElementById('departamento');
        selectDepartamento.innerHTML = '';
        data.forEach(departamento => {
            const option = document.createElement('option');
            option.value = departamento.departamento_id;
            option.text = departamento.name;
            selectDepartamento.appendChild(option);
        });
    })
    .catch(error => console.error('Error:', error));
}

function obtenerMunicipios() {
    const departamentoSeleccionado = document.getElementById('departamento').value;
    if (!departamentoSeleccionado) return; // Evitar solicitud si no hay departamento seleccionado
    fetch(`/api/municipios?departamento_id=${departamentoSeleccionado}`)
    .then(response => response.json())
    .then(data => {
        const selectMunicipio = document.getElementById('municipio');
        selectMunicipio.innerHTML = '';
        data.forEach(municipio => {
            const option = document.createElement('option');
            option.value = municipio.municipio_id;
            option.text = municipio.name;
            selectMunicipio.appendChild(option);
        });
    })
    .catch(error => console.error('Error:', error));
}

function obtenerLocalidades() {
    const municipioSeleccionado = document.getElementById('municipio').value;
    if (!municipioSeleccionado) return; // Evitar solicitud si no hay municipio seleccionado
    fetch(`/api/localidades?municipio_id=${municipioSeleccionado}`)
    .then(response => response.json())
    .then(data => {
        const selectLocalidad = document.getElementById('localidad');
        selectLocalidad.innerHTML = '';
        data.forEach(localidad => {
            const option = document.createElement('option');
            option.value = localidad.localidad_id;
            option.text = localidad.name;
            selectLocalidad.appendChild(option);
        });
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    obtenerProvincias();

    document.getElementById('provincia').addEventListener('change', obtenerDepartamentos);
    document.getElementById('departamento').addEventListener('change', obtenerMunicipios);
    document.getElementById('municipio').addEventListener('change', obtenerLocalidades);
});
