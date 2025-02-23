<template>
    <div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

        <div id="barraNavegacion" v-if="usuarioActivo">
            <div id="usuarioInfo">
                <span>{{ mensajeUsuario }}</span>
                <button class="logout" @click="logout">Cerrar Sesión</button>
            </div>
        </div>
        
        <div id="caja1" v-if="!usuarioActivo">
            <h1>Inicio de Sesión</h1>
            <input type="text" v-model="usuario" placeholder="Usuario" required />
            <input type="password" v-model="password" placeholder="Contraseña" required />
            <br /><br />
            <button @click="login">Iniciar Sesión</button>
        </div>

        <div id="cajaAdmin" v-if="esAdmin">
            <router-link to="/gestiona-profesores"><button>Gestionar Profesores</button></router-link>
            <br />
        </div>

        <!-- Panel de Profesor -->
        <div id="cajaProfesor" v-if="esProfesor">
            <router-link to="/gestiona-alumnos"><button>Gestionar Alumnos</button></router-link>
            <br />
            <router-link to="/gestiona-empresas"><button>Gestionar Empresas</button></router-link>
            <br />
            <router-link to="/gestiona-contactos"><button>Gestionar Contactos de empresa</button></router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            usuario: "",
            password: "",
            usuarioActivo: null,
            mensajeUsuario: "",
            esAdmin: false,
            esProfesor: false,
        };
    },
    methods: {
        async login() {
            if (!this.usuario.trim() || !this.password.trim()) {
                alert("Por favor, ingrese usuario y contraseña");
                return;
            }

            try {
                const response = await axios.get("http://localhost:3000/app/usuarios");
                const usuarios = response.data;
                const usuarioEncontrado = usuarios.find(
                    (u) => u.usuario === this.usuario && u.password === this.password
                );

                if (usuarioEncontrado) {
                    sessionStorage.setItem("UsuarioActivo", usuarioEncontrado.usuario);
                    sessionStorage.setItem("permiso", usuarioEncontrado.rol);

                    this.usuarioActivo = usuarioEncontrado.usuario;
                    this.mensajeUsuario = `Hola, ${usuarioEncontrado.usuario}`;
                    this.esAdmin = usuarioEncontrado.rol === "administrador";
                    this.esProfesor = usuarioEncontrado.rol === "tutor";
                } else {
                    alert("Usuario o contraseña incorrectos");
                }
            } catch (error) {
                console.error("Error al conectar con la API:", error);
                alert("Error: Usuario o contraseña incorrecto");
            }
        },
        logout() {
            sessionStorage.removeItem("UsuarioActivo");
            sessionStorage.removeItem("permiso");

            this.usuarioActivo = null;
            this.mensajeUsuario = "";
            this.esAdmin = false;
            this.esProfesor = false;
        },
    },
    mounted() {
        this.usuarioActivo = sessionStorage.getItem("UsuarioActivo");
        const permiso = sessionStorage.getItem("permiso");

        if (this.usuarioActivo) {
            this.mensajeUsuario = `Hola, ${this.usuarioActivo}`;
            this.esAdmin = permiso === "administrador";
            this.esProfesor = permiso === "tutor";
        }
    },
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
}

#tabla {
  width: 100%;
  border-collapse: collapse;
}

#tabla th,
#tabla td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
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