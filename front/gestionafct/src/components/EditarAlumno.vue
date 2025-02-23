<template>
    <form @submit.prevent="validarFormulario">
        <div>
            <label>Identificación</label>
            <input type="text" v-model="form.identificacion" required />
        </div>

        <div>
            <label>Nombre Completo</label>
            <input type="text" v-model="form.nombre" required />
        </div>

        <div>
            <label>Fecha de Nacimiento</label>
            <input type="date" v-model="form.fecha_nacimiento" required />
        </div>

        <div>
            <label>Género</label>
            <select v-model="form.genero">
                <option value="">Selecciona</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
                <option value="Prefiero no decirlo">Prefiero no decirlo</option>
            </select>
        </div>

        <div>
            <label>Correo Electrónico</label>
            <input type="email" v-model="form.correo" />
        </div>

        <div>
            <label>Teléfono</label>
            <input type="tel" v-model="form.telefono" />
        </div>

        <div>
            <label>Dirección</label>
            <input type="text" v-model="form.direccion" />
        </div>

        <div>
            <label>Centro Educativo</label>
            <select v-model="form.centro" required>
                <option value="">Selecciona</option>
                <option value="Domenico Scarlatti">Domenico Scarlatti</option>
                <option value="Lope de Vega">Lope de Vega</option>
                <option value="Francisco de Goya">Francisco de Goya</option>
                <option value="Carlos Gomes">Carlos Gomes</option>
            </select>
        </div>

        <div>
            <label>Grado</label>
            <select v-model="form.grado" required>
                <option value="">Selecciona</option>
                <option value="1daw">1 DAW</option>
                <option value="1dam">1 DAM</option>
                <option value="2daw">2 DAW</option>
                <option value="2dam">2 DAM</option>
            </select>
        </div>

        <div>
            <label>Tutor</label>
            <input type="number" v-model="form.tutor_id" />
        </div>

        <div>
            <label>Estado del Alumno</label>
            <select v-model="form.estado" required>
                <option value="">Selecciona</option>
                <option value="Activo">Activo</option>
                <option value="Suspendido">Suspendido</option>
                <option value="Graduado">Graduado</option>
            </select>
        </div>

        <div>
            <label>Fecha de Inscripción</label>
            <input type="date" v-model="form.fecha_inscripcion" required />
        </div>

        <div>
            <label>Foto de Perfil</label>
            <input type="file" @change="cargarFoto" />
        </div>

        <div>
            <label>Notas Académicas</label>
            <input type="number" step="0.01" v-model="form.notas_academicas" />
        </div>

        <div>
            <label>Observaciones</label>
            <textarea v-model="form.observaciones"></textarea>
        </div>

        <div>
            <label>Estado de Prácticas</label>
            <select v-model="form.estado_practicas" required>
                <option value="">Selecciona</option>
                <option value="NO REALIZA PRACTICAS">NO REALIZA PRACTICAS</option>
                <option value="PENDIENTE ASIGNACION DE PRACTICAS">PENDIENTE ASIGNACION DE PRACTICAS</option>
                <option value="ASIGNADO A EMPRESA">ASIGNADO A EMPRESA</option>
                <option value="FINALIZADAS">FINALIZADAS</option>
            </select>
        </div>

        <button type="submit">Editar Alumno</button>
    </form>
</template>

<script>
import axios from "axios";

export default {
    props: {
        alumnoSeleccionado: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            form: {
                identificacion: "",
                nombre: "",
                fecha_nacimiento: "",
                genero: "",
                correo: "",
                telefono: "",
                direccion: "",
                centro: "",
                grado: "",
                tutor_id: "",
                estado: "",
                fecha_inscripcion: "",
                foto_perfil: null,
                notas_academicas: 0,
                observaciones: "",
                estado_practicas: ""
            }
        };
    },
    watch: {
        alumnoSeleccionado(newId) {
            if (newId) {
                this.cargarAlumnos();
            }
        }
    },
    mounted() {
        if (this.alumnoSeleccionado) {
            this.cargarAlumnos();
        }
    },
    methods: {
        async cargarAlumnos() {
            try {
                const response = await axios.get(`http://localhost:3000/app/alumnos/${this.alumnoSeleccionado}`);
                const alumno = response.data;

                this.form = {
                    id: alumno.id || 0,
                    identificacion: alumno.identificacion || "",
                    nombre: alumno.nombre || "",
                    fecha_nacimiento: this.formatearFecha(alumno.fecha_nacimiento),
                    genero: alumno.genero || "",
                    correo: alumno.correo || "",
                    telefono: alumno.telefono || "",
                    direccion: alumno.direccion || "",
                    centro: alumno.centro || "",
                    grado: alumno.grado || "",
                    tutor_id: alumno.tutor_id || "",
                    estado: alumno.estado || "",
                    fecha_inscripcion: this.formatearFecha(alumno.fecha_inscripcion),
                    foto_perfil: null, 
                    notas_academicas: alumno.notas_academicas || 0,
                    observaciones: alumno.observaciones || "",
                    estado_practicas: alumno.estado_practicas || ""
                };
            } catch (error) {
                console.error("Error al cargar los datos del alumno:", error);
            }
        },

        formatearFecha(fecha) {
            if (!fecha) return "";
            return fecha.split("T")[0];
        },

        cargarFoto(event) {
            const file = event.target.files[0];
            if (file) {
                this.form.foto_perfil = file;
            }
        },
        async validarFormulario() {
            if (!this.form.identificacion.trim()) return alert("La identificación es obligatoria.");
            if (!this.form.nombre.trim()) return alert("El nombre es obligatorio.");
            if (!this.form.fecha_nacimiento) return alert("La fecha de nacimiento es obligatoria.");
            const id = this.form.id;
            try {
                const response = await axios.put(`http://localhost:3000/app/alumnos/${id}`, this.form, {
                    headers: { "Content-Type": "application/json" },
                });

                alert(`Alumno registrado con éxito. ID: ${response.data.id}`);
                window.location.href = "/GestionarAlumnos";
                window.location.reload();

            } catch (error) {
                console.error("Error al registrar el alumno:", error);
                alert("Error al registrar el alumno: " + (error.response?.data?.error || "Error desconocido"));
            }
        }
    }
};
</script>
