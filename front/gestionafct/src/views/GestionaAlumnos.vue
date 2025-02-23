<template>
    <div>
        <div id="barraNavegacion">
            <div id="usuarioInfo">
                <span id="mensaje">{{ mensajeUsuario }}</span>
                <button class="logout" @click="logout">Cerrar Sesión</button>
            </div>
        </div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

        <main id="cajaAdmin" v-if="esTutor">
            <br />
            <h1>Gestión de Alumnos</h1>
            <!--  <input type="text" v-model="busqueda" placeholder="Buscar alumnos..." />-->
            <br />
            <button @click="mostrarFormulario = !mostrarFormulario; alumnoSeleccionado = 0">
                {{ mostrarFormulario ? "Volver a la Lista" : "Insertar Alumnos" }}
            </button>
            <button id="asignarFCT" @click="asignarPracticas">Asignar Alumnos a FCT</button>
            <router-link to="/"><button>Volver</button></router-link>
        </main>


        <div class="caja1">
            <EditarAlumno v-if="mostrarFormulario && alumnoSeleccionado != 0"
                :alumnoSeleccionado="alumnoSeleccionado" />
            <RegistroAlumno v-else-if="mostrarFormulario" />

        </div>

        <div id="tabla" v-if="!mostrarFormulario">
            <h1>Lista de Alumnos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Identificación</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Estado</th>
                        <th>Notas</th>
                        <th>Observaciones</th>
                        <th>Estado Practicas</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="alumno in alumnos" :key="alumno.id">
                        <td>{{ alumno.identificacion }}</td>
                        <td>{{ alumno.nombre }}</td>
                        <td>{{ alumno.correo || 'N/A' }}</td>
                        <td>{{ alumno.estado }}</td>
                        <td>{{ alumno.notas_academicas || 'N/A' }}</td>
                        <td>{{ alumno.observaciones || 'N/A' }}</td>
                        <td :class="estadoClase(alumno.estado_practicas)">
                            {{ alumno.estado_practicas }}
                        </td>
                        <td>
                            <button @click="eliminarAlumnos(alumno.id)">Eliminar Alumno</button>
                            <button @click="seleccionarAlumno(alumno.id)">Editar Alumno</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import RegistroAlumno from "@/components/RegistroAlumno.vue";
import EditarAlumno from "@/components/EditarAlumno.vue";

export default {
    components: { RegistroAlumno, EditarAlumno },
    data() {
        return {
            alumnos: [],
            mensajeUsuario: "",
            esTutor: false,
            mostrarFormulario: false,
            alumnoSeleccionado: 0,
        };
    },
    methods: {
        seleccionarAlumno(id) {
            this.alumnoSeleccionado = id;
            this.mostrarFormulario = true;
        },

        estadoClase(estado) {
            switch (estado) {
                case "NO REALIZA PRACTICAS":
                    return "bg-danger text-white";
                case "PENDIENTE ASIGNACION DE PRACTICAS":
                    return "bg-warning text-dark";
                case "ASIGNADO A EMPRESA":
                    return "bg-primary text-white";
                case "FINALIZADAS":
                    return "bg-success text-white";
                default:
                    return "";
            }
        },

        async cargarAlumnos() {
            try {
                const response = await axios.get("http://localhost:3000/app/alumnos");
                this.alumnos = response.data;
            } catch (error) {
                console.error("Error al cargar los alumnos:", error);
            }
        },
        logout() {
            sessionStorage.removeItem("UsuarioActivo");
            sessionStorage.removeItem("permiso");
            this.$router.push("/");
        },

        asignarPracticas() {
            alert("Todos los alumnos pasan a estar en: 'PENDIENTE ASIGNACIÓN DE PRÁCTICAS'");
        },

        async eliminarAlumnos(id) {
            try {
                const response = await axios.delete(`http://localhost:3000/app/alumnos/${id}`);
                if (response.status === 200) {
                    this.alumnos = this.alumnos.filter(alumno => alumno.id !== id);
                    alert("Alumno eliminado correctamente");
                    this.mostrarFormulario = false;
                }
            } catch (error) {
                console.error("Error al eliminar el alumno:", error);
                alert("Error al eliminar el alumno.");
            }
        },
    },

    mounted() {
        const UsuarioActivo = sessionStorage.getItem("UsuarioActivo");
        const permiso = sessionStorage.getItem("permiso");

        if (UsuarioActivo) {
            this.mensajeUsuario = `Hola, ${UsuarioActivo}`;
        }
        if (permiso === "tutor") {
            this.esTutor = true;
        }

        this.cargarAlumnos();
    }
};
</script>

<style scoped>
#barraNavegacion {
  background-color: #f1f1f1;
  padding: 10px;
}

#usuarioInfo {
  display: flex;
  justify-content: space-between;
}

.logout {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

#contenido {
  padding: 20px;
}

#cajaAdmin {
  margin-bottom: 20px;
  text-align: center;
}

#tabla {
  width: 80%;
  margin: 0 auto; 
  border-collapse: collapse;
  text-align: center;
}

#tabla th,
#tabla td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

#tabla th {
  background-color: #f4f4f4;
}

button {
  margin: 5px;
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
