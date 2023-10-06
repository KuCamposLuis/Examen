function cambiarFormulario() {
    var figuraSeleccionada = document.getElementById("practica").value;
    document.getElementById("act11").style.display = "none";
    document.getElementById("act12").style.display = "none";
    document.getElementById("act13").style.display = "none";
    document.getElementById(figuraSeleccionada).style.display = "block";
}

class Paciente {
    constructor(nombre, edad, genero, telefono, diagnostico) {
        this.nombre = nombre;
        this.edad = edad;
        this.genero = genero;
        this.telefono = telefono;
        this.diagnostico = diagnostico;
    }
}

class RegistroPacientes {
    constructor() {
        this.pacientes = [];
    }

    agregarPaciente(paciente) {
        this.pacientes.push(paciente);
    }

    buscarPorNombre(nombre) {
        return this.pacientes.filter(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    }

    buscarPorDiagnostico(diagnostico) {
        return this.pacientes.filter(p => p.diagnostico.toLowerCase() === diagnostico.toLowerCase());
    }

    mostrarListaPacientes() {
        const patientList = document.getElementById("patientList");
        patientList.innerHTML = "";
        this.pacientes.forEach(p => {
            const li = document.createElement("li");
            li.textContent = `Nombre: ${p.nombre}, Edad: ${p.edad}, Género: ${p.genero}, Teléfono: ${p.telefono}, Diagnóstico: ${p.diagnostico}`;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.onclick = () => this.eliminarPaciente(p.nombre);
            li.appendChild(deleteButton);
            patientList.appendChild(li);
        });
    }

    eliminarPaciente(nombre) {
        this.pacientes = this.pacientes.filter(p => p.nombre.toLowerCase() !== nombre.toLowerCase());
    }

    calcularEstadisticas() {
        const totalPatients = this.pacientes.length;
        const sumAge = this.pacientes.reduce((sum, p) => sum + p.edad, 0);
        const averageAge = totalPatients === 0 ? 0 : sumAge / totalPatients;
        return { totalPatients, averageAge };
    }
}

const registro = new RegistroPacientes();

function addPatient() {
    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value;
    const diagnosis = document.getElementById("diagnosis").value;

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "Masculino";
    document.getElementById("phone").value = "";
    document.getElementById("diagnosis").value = "";

    const paciente = new Paciente(name, age, gender, phone, diagnosis);
    registro.agregarPaciente(paciente);
    updateUI();
}

function searchByName() {
    const name = document.getElementById("searchName").value;
    const result = registro.buscarPorNombre(name);
    displaySearchResult(result);
}

function searchByDiagnosis() {
    const diagnosis = document.getElementById("searchDiagnosis").value;
    const result = registro.buscarPorDiagnostico(diagnosis);
    displaySearchResult(result);
}

function displaySearchResult(result) {
    const patientList = document.getElementById("patientList");
    patientList.innerHTML = "";
    if (result.length === 0) {
        patientList.textContent = "No se encontraron pacientes.";
    } else {
        result.forEach(p => {
            const li = document.createElement("li");
            li.textContent = `Nombre: ${p.nombre}, Edad: ${p.edad}, Género: ${p.genero}, Teléfono: ${p.telefono}, Diagnóstico: ${p.diagnostico}`;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.onclick = () => deletePatient(p.nombre);
            li.appendChild(deleteButton);
            patientList.appendChild(li);
        });
    }
}

function deletePatient(name) {
    registro.eliminarPaciente(name);
    registro.mostrarListaPacientes(); // Actualizar la lista de pacientes
    updateUI();
}


function updateUI() {
    registro.mostrarListaPacientes();
    const { totalPatients, averageAge } = registro.calcularEstadisticas();
    document.getElementById("totalPatients").textContent = totalPatients;
    document.getElementById("averageAge").textContent = averageAge.toFixed(2);
}
