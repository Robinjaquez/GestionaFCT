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
      <h1>Gestión de Contactos</h1>
      <br />
      <button @click="mostrarFormulario = !mostrarFormulario; contactoSeleccionado = 0">
        {{ mostrarFormulario ? "Volver a la Lista" : "Insertar Contacto" }}
      </button>
      <router-link to="/"><button>Volver</button></router-link>
    </main>

    <div class="caja1">
      <EditarContacto v-if="mostrarFormulario && contactoSeleccionado != 0" :contactoSeleccionado="contactoSeleccionado" />
      <RegistroContacto v-else-if="mostrarFormulario" />
    </div>

    <div id="tabla" v-if="!mostrarFormulario">
      <h1>Lista de Contactos</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cargo</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Nivel de acceso</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contacto in contactos" :key="contacto.id">
            <td>{{ contacto.nombre }}</td>
            <td>{{ contacto.cargo }}</td>
            <td>{{ contacto.correo }}</td>
            <td>{{ contacto.telefono }}</td>
            <td>{{ contacto.nivel_acceso }}</td>
            <td>
              <button @click="eliminarContacto(contacto.id)">Eliminar</button>
              <button @click="seleccionarContacto(contacto.id)">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RegistroContacto from "@/components/RegistroContacto.vue";
import EditarContacto from "@/components/EditarContacto.vue";

export default {
  components: { RegistroContacto, EditarContacto },
  data() {
    return {
      contactos: [],
      mensajeUsuario: "",
      esTutor: false,
      mostrarFormulario: false,
      contactoSeleccionado: 0,
    };
  },
  methods: {
    seleccionarContacto(id) {
      this.contactoSeleccionado = id;
      this.mostrarFormulario = true;
    },

    async cargarContactos() {
      try {
        const response = await axios.get("http://localhost:3000/app/contactos");
        this.contactos = response.data;
      } catch (error) {
        console.error("Error al cargar los contactos:", error);
      }
    },

    async eliminarContacto(id) {
      try {
        const response = await axios.delete(`http://localhost:3000/app/contactos/${id}`);
        if (response.status === 200) {
          this.contactos = this.contactos.filter(contacto => contacto.id !== id);
          alert("Contacto eliminado correctamente");
          this.mostrarFormulario = false;
        }
      } catch (error) {
        console.error("Error al eliminar el contacto:", error);
        alert("Error al eliminar el contacto.");
      }
    },

    logout() {
      sessionStorage.removeItem("UsuarioActivo");
      sessionStorage.removeItem("permiso");
      this.$router.push("/");
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

    this.cargarContactos();
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