<template>
    <form @submit.prevent="validarFormulario">
        <div>
            <label>Identificación Fiscal:</label>
            <select v-model="form.empresa_id">
                <option value="">Selecciona</option>
                <option value="1">Empresa 1</option>
                <option value="2">Empresa 2</option>
                <option value="3">Empresa 3</option>
            </select>
        </div>

        <div>
            <label>Nombre Completo:</label>
            <input type="text" v-model="form.nombre" required />
        </div>

        <div>
            <label for="cargoPuesto">Cargo o Puesto</label>
            <select v-model="form.cargo">
                <option value="">Selecciona</option>
                <option value="Desarrollador">Desarrollador</option>
                <option value="Director">Director</option>
                <option value="RRHH">RRHH</option>
            </select>
        </div>

        <div>
            <label>Departamento:</label>
            <input type="text" v-model="form.departamento" required />
        </div>

        <div>
            <label>Correo Electrónico:</label>
            <input type="email" v-model="form.correo" required />
        </div>

        <div>
            <label>Teléfono:</label>
            <input type="tel" v-model="form.telefono" required />
        </div>

        <div>
            <label>Direccion De Oficina:</label>
            <input type="text" v-model="form.direccion_oficina" required />
        </div>

        <div>
        <label for="horarioTrabajo">Horario de Trabajo</label>
        <select v-model="form.horario_trabajo">
          <option value="">Selecciona</option>
          <option value="Dia">Dia</option>
          <option value="Tarde">Tarde</option>
        </select>
      </div>

      <div>
        <label for="nivelAcceso">Nivel de Acceso</label>
        <select v-model="form.nivel_acceso">
          <option value="">Selecciona</option>
          <option value="Básico">Básico</option>
          <option value="Medio">Medio</option>
          <option value="Administrador">Administrador</option>
        </select>
      </div>

        <button type="submit">Editar Contacto</button>
    </form>
</template>

<script>
import axios from "axios";

export default {
    props: {
        contactoSeleccionado: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            form: {
                empresa_id: "",
                nombre: "",
                cargo: "",
                departamento: "",
                correo: "",
                telefono: "",
                direccion_oficina: "",
                horario_trabajo: "",
                nivel_acceso: ""
            }
        };
    },
    watch: {
        contactoSeleccionado(newId) {
            if (newId) {
                this.cargarContacto();
            }
        }
    },
    mounted() {
        if (this.contactoSeleccionado) {
            this.cargarContacto();
        }
    },
    methods: {
        async cargarContacto() {
            try {
                const response = await axios.get(`http://localhost:3000/app/contactos/${this.contactoSeleccionado}`);
                const contacto = response.data;

                this.form = {
                    id: contacto.id || 0,
                    empresa_id: contacto.empresa_id || "",
                    nombre: contacto.nombre || "",
                    correo: contacto.correo || "",
                    telefono: contacto.telefono || "",
                    departamento: contacto.departamento || "",
                    cargo: contacto.cargo || "",
                    direccion_oficina: contacto.direccion_oficina || "",
                    horario_trabajo: contacto.horario_trabajo || "",
                    nivel_acceso: contacto.nivel_acceso || "",
                };
            } catch (error) {
                console.error("Error al cargar los datos del contacto:", error);
            }
        },

        formatearFecha(fecha) {
            if (!fecha) return "";
            return fecha.split("T")[0];
        },

        async validarFormulario() {
            if (!this.form.nombre.trim()) return alert("El nombre es obligatorio.");
            if (!this.form.correo.trim()) return alert("El correo es obligatorio.");
            if (!this.form.telefono.trim()) return alert("El teléfono es obligatorio.");
            const id = this.form.id;
            try {
                const response = await axios.put(`http://localhost:3000/app/contactos/${id}`, this.form, {
                    headers: { "Content-Type": "application/json" },
                });

                alert(`Contacto actualizado con éxito. ID: ${response.data.id}`);
                window.location.href = "/GestionarContactos";
                window.location.reload();

            } catch (error) {
                console.error("Error al actualizar el contacto:", error);
                alert("Error al actualizar el contacto: " + (error.response?.data?.error || "Error desconocido"));
            }
        }
    }
};
</script>
