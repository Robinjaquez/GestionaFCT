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
      <h1>Gestión de Empresas</h1>
      <br />
      <button @click="mostrarFormulario = !mostrarFormulario; empresaSeleccionada = 0">
        {{ mostrarFormulario ? "Volver a la Lista" : "Insertar Empresa" }}
      </button>
      <button id="asignarFCT" @click="asignarPracticas">Asignar Empresas a Alumnos</button>
      <br />
      <router-link to="/gestiona-contactos"><button>Gestionar Contactos de empresa</button></router-link>
      <router-link to="/"><button>Volver</button></router-link>
    </main>

    <div class="caja1">
      <EditarEmpresa v-if="mostrarFormulario && empresaSeleccionada != 0" :empresaSeleccionada="empresaSeleccionada" />
      <RegistroEmpresa v-else-if="mostrarFormulario" />
    </div>

    <div id="tabla" v-if="!mostrarFormulario">
      <h1>Lista de Empresas</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="empresa in empresas" :key="empresa.id">
            <td>{{ empresa.nombre }}</td>
            <td>{{ empresa.correo || 'N/A' }}</td>
            <td>{{ empresa.telefono || 'N/A' }}</td>
            <td>{{ empresa.direccion || 'N/A' }}</td>
            <td>{{ empresa.ciudad || 'N/A' }}</td>
            <td :class="estadoClase(empresa.estado)">
              {{ empresa.estado }}
            </td>
            <td>
              <button @click="eliminarEmpresa(empresa.id)">Eliminar Empresa</button>
              <button @click="seleccionarEmpresa(empresa.id)">Editar Empresa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RegistroEmpresa from "@/components/RegistroEmpresa.vue";
import EditarEmpresa from "@/components/EditarEmpresa.vue";

export default {
  components: { RegistroEmpresa, EditarEmpresa },
  data() {
    return {
      empresas: [],
      mensajeUsuario: "",
      esTutor: false,
      mostrarFormulario: false,
      empresaSeleccionada: 0,
    };
  },
  methods: {
    seleccionarEmpresa(id) {
      this.empresaSeleccionada = id;
      this.mostrarFormulario = true;
    },

    estadoClase(estado) {
            switch (estado) {
                case "Sin contactar":
                    return "bg-danger text-white";
                case "No admite Alumnos":
                    return "bg-warning text-dark";
                case "Admite Alumnos":
                    return "bg-primary text-white";
                case "Contactado":
                    return "bg-success text-white";
                default:
                    return "";
            }
        },

    async cargarEmpresas() {
      try {
        const response = await axios.get("http://localhost:3000/app/empresas");
        this.empresas = response.data;
      } catch (error) {
        console.error("Error al cargar las empresas:", error);
      }
    },
    logout() {
      sessionStorage.removeItem("UsuarioActivo");
      sessionStorage.removeItem("permiso");
      this.$router.push("/");
    },

    asignarPracticas() {
      alert("Todas las empresas pasan a estar en: 'PENDIENTE DE ASIGNACIÓN'");
    },

    async eliminarEmpresa(id) {
      try {
        const response = await axios.delete(`http://localhost:3000/app/empresas/${id}`);

        if (response.status === 200) {
          this.empresas = this.empresas.filter(empresa => empresa.id !== id);
          alert("Empresa eliminada correctamente");
          this.mostrarFormulario = false;
        }
      } catch (error) {
        console.error("Error al eliminar la empresa:", error);
        alert("Error al eliminar la empresa.");
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

    this.cargarEmpresas();
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

