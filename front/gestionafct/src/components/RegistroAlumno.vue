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

    <button type="submit">Registrar Alumno</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";



const form = ref({
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
  notas_academicas: "",
  observaciones: "",
  estado_practicas: "",
});

const cargarFoto = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.foto_perfil = file;
  }
};

const validarFormulario = async () => {
  if (!form.value.identificacion.trim()) return alert("La identificación del alumno es obligatoria.");
  if (!form.value.nombre.trim()) return alert("El nombre del alumno es obligatorio.");
  if (!form.value.fecha_nacimiento) return alert("La fecha de nacimiento es obligatoria.");
  if (form.value.correo && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.value.correo)) {
    return alert("El correo electrónico no es válido.");
  }

  try {
    const response = await axios.post("http://localhost:3000/app/alumnos", form.value, {
      headers: { "Content-Type": "application/json" },
    });

    alert(`Alumno registrado con éxito. ID: ${response.data.id}`);
    window.location.href = "/GestionarAlumnos";
    window.location.reload();

  } catch (error) {
    console.error("Error al registrar el alumno:", error);
    alert("Error al registrar el alumno: " + (error.response?.data?.error || "Error desconocido"));
  }
};
</script>


<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea {
  width: 100%;
  height: 80px;
  resize: none;
}
</style>