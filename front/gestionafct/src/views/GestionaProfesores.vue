<template>
  <div>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <div id="barraNavegacion">
      <div id="usuarioInfo">
        <span id="mensaje">{{ mensajeUsuario }}</span>
        <button class="logout" @click="logout">Cerrar Sesión</button>
      </div>
    </div>

    <main id="cajaAdmin" v-if="esAdmin">
      <br /><br />
      <router-link to="/formulario-empresas"><button>Insertar Profesores</button></router-link>
      <button @click="eliminarAlumnos">Eliminar Profesores</button>
      <button @click="editarAlumnos">Editar Profesores</button>
      <router-link to="/"><button>Volver</button></router-link>
      <br /><br />
    </main>

    <div id="tablaContactos">
      <h1>Lista de Profesores</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Identificación</th>
            <th>Correo</th>
            <th>telefono</th>
            <th>Rol</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="profesor in profesores" :key="profesor.id">
            <td>{{ profesor.nombre }}</td>
            <td>{{ profesor.identificacion }}</td>
            <td>{{ profesor.correo }}</td>
            <td>{{ profesor.telefono }}</td>
            <td>{{ profesor.genero }}</td>
            <td>
              <button @click="eliminarContacto(contacto.id)">Eliminar</button>
              <button @click="editarContacto(contacto.id)">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      profesores: [],
      mensajeUsuario: "",
      esAdmin: false
    };
  },
  methods: {
    async cargarAlumnos() {
      try {
        const response = await axios.get("http://localhost:3000/app/profesores");
        this.profesores = response.data;
      } catch (error) {
        console.error("Error al cargar los profesores:", error);
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
    eliminarAlumnos() {
      alert("Función para eliminar alumnos (a implementar)");
    },
    editarAlumnos() {
      alert("Función para editar alumnos (a implementar)");
    }
  },
  mounted() {
    const UsuarioActivo = sessionStorage.getItem("UsuarioActivo");
    const permiso = sessionStorage.getItem("permiso");

    if (UsuarioActivo) {
      this.mensajeUsuario = `Hola, ${UsuarioActivo}`;
    }
    if (permiso === "administrador") {
      this.esAdmin = true;
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
