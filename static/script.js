function obtenerProvincias() {
 
    fetch('/api/provincias')
    .then(response => response.json())
    .then(data => {
        data.sort((a, b) => a.name.localeCompare(b.name));
        const selectProvincia = document.getElementById('provincia');
        const hasOptions = selectProvincia.options.length > 0;

        if (hasOptions) {
            data.forEach(provincia => {
                const option = document.createElement('option');
                option.value = provincia.provincia_id;
                option.text = provincia.name;
                selectProvincia.appendChild(option);
        });
        } else {
            selectProvincia.innerHTML = '';
            data.forEach(provincia => {
                const option = document.createElement('option');
                option.value = provincia.provincia_id;
                option.text = provincia.name;
                selectProvincia.appendChild(option);
            });
        }
    })
    .catch(error => console.error('Error:', error));
}

function obtenerDepartamentos() {
    const provinciaSeleccionada = document.getElementById('provincia').value;
    if (!provinciaSeleccionada) return;
    fetch(`/api/departamentos?provincia_id=${provinciaSeleccionada}`)
    .then(response => response.json())
    .then(data => {
        data.sort((a, b) => a.name.localeCompare(b.name));

        const selectDepartamento = document.getElementById('departamento');
        selectDepartamento.innerHTML = '';
        data.forEach(departamento => {
            const option = document.createElement('option');
            option.value = departamento.departamento_id;
            option.text = departamento.name;
            selectDepartamento.appendChild(option);
        });
        if (data.length === 1) {
            selectMunicipio.value = data[0].municipio_id;
            obtenerMunicipios();
        }
    })
    .catch(error => console.error('Error:', error));
}

function obtenerMunicipios() {
    const departamentoSeleccionado = document.getElementById('departamento').value;
    if (!departamentoSeleccionado) return;
    fetch(`/api/municipios?departamento_id=${departamentoSeleccionado}`)
    .then(response => response.json())
    .then(data => {
        data.sort((a, b) => a.name.localeCompare(b.name));

        const selectMunicipio = document.getElementById('municipio');
        selectMunicipio.innerHTML = '';

        data.forEach(municipio => {
            const option = document.createElement('option');
            option.value = municipio.municipio_id;
            option.text = municipio.name;
            selectMunicipio.appendChild(option);
        });

    if (data.length === 1) {
        selectMunicipio.value = data[0].municipio_id;
        obtenerLocalidades();
    }
    })  
    .catch(error => console.error('Error:', error));
}

function obtenerLocalidades() {
    const municipioSeleccionado = document.getElementById('municipio').value;
    if (!municipioSeleccionado) return;
    fetch(`/api/localidades?municipio_id=${municipioSeleccionado}`)
    .then(response => response.json())
    .then(data => {
        const selectLocalidad = document.getElementById('localidad');

        // Obtener el valor de la localidad seleccionada previamente
        const localidadSeleccionadaAnterior = selectLocalidad.value;

        selectLocalidad.innerHTML = '';

        // Agregar las opciones de localidad
        data.forEach(localidad => {
            const option = document.createElement('option');
            option.value = localidad.localidad_id;
            option.text = localidad.name;
            selectLocalidad.appendChild(option);
        });

        // Si la localidad seleccionada previamente está en la lista, seleccionarla
        const optionExists = Array.from(selectLocalidad.options).some(option => option.value === localidadSeleccionadaAnterior);
        if (optionExists) {
            selectLocalidad.value = localidadSeleccionadaAnterior;
        }

        mostrarResultado();
        
    })  
    .catch(error => console.error('Error:', error));
}

function mostrarResultado() {
    const provinciaSeleccionada = document.getElementById('provincia').options[document.getElementById('provincia').selectedIndex].text;
    const departamentoSeleccionado = document.getElementById('departamento').options[document.getElementById('departamento').selectedIndex].text;
    const municipioSeleccionado = document.getElementById('municipio').options[document.getElementById('municipio').selectedIndex].text;
    const localidadSeleccionada = document.getElementById('localidad').options[document.getElementById('localidad').selectedIndex].text;

    const resultado = `${localidadSeleccionada}, ${municipioSeleccionado}, ${departamentoSeleccionado}, ${provinciaSeleccionada}`;
    document.getElementById('resultado').textContent = resultado;

}

document.addEventListener('DOMContentLoaded', () => {
    obtenerProvincias();

    document.getElementById('provincia').addEventListener('change', obtenerDepartamentos);
    document.getElementById('departamento').addEventListener('change', obtenerMunicipios);
    document.getElementById('municipio').addEventListener('change', obtenerLocalidades);
    document.getElementById('localidad').addEventListener('change', obtenerLocalidades);
});