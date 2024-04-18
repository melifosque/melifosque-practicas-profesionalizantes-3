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
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
}

window.onload = obtenerProvincias;

function obtenerDepartamentos() {
    const provinciaSeleccionada = document.getElementById('provincia').value;
    fetch('/api/departamentos?provincia_id=' + provinciaSeleccionada)
    .then(response => response.json())
    .then(data => {
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = '';
        data.forEach(departamento => {
            const p = document.createElement('p');
            p.textContent = `ID: ${departamento.departamento_id}, Nombre: ${departamento.name}`;
            resultadoDiv.appendChild(p);
        });
    })
    .catch(error => console.error('Error:', error));
}

window.onload = obtenerProvincias;
