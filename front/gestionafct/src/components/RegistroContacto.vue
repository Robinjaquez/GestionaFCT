<template>
    <form @submit.prevent="validarFormulario">
      <div>
        <label for="idContacto">Empresa Afiliada</label>
        <select v-model="form.empresa_id">
          <option value="">Selecciona</option>
          <option value="1">Empresa 1</option>
          <option value="2">Empresa 2</option>
          <option value="3">Empresa 3</option>
        </select>
      </div>
  
      <div>
        <label for="nombreCompleto">Nombre Completo</label>
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
        <label for="departamento">Departamento</label>
        <input type="text" v-model="form.departamento" required />
      </div>
  
      <div>
        <label for="correo">Correo Electrónico</label>
        <input type="email" v-model="form.correo" required />
      </div>
  
      <div>
        <label for="telefono">Número de Teléfono</label>
        <input type="text" v-model="form.telefono" required />
      </div>
  
      <div>
        <label for="direccion">Dirección de la Oficina</label>
        <input type="text" v-model="form.direccion_oficina" />
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
  
      <button type="submit">Registrar Persona de Contacto</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  
  const form = ref({
    empresa_id: "",
    nombre: "",
    cargo: "",
    departamento: "",
    correo: "",
    telefono: "",
    direccion_oficina: "",
    horario_trabajo: "",
    nivel_acceso: ""
  });
  
  
  const validarFormulario = async () => {
    if (!form.value.empresa_id.trim()) return alert("El ID de Persona de Contacto es obligatorio.");
    if (!form.value.nombre.trim()) return alert("El nombre completo es obligatorio.");
    if (form.value.correo && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.value.correo)) {
      return alert("El correo electrónico no es válido.");
    }
  
    try {
      const response = await axios.post("http://localhost:3000/app/contactos", form.value, {
        headers: { "Content-Type": "application/json" },
      });
  
      alert(`Persona de contacto registrada con éxito. ID: ${response.data.id}`);
      window.location.href = "/GestionarContactos"; 
      window.location.reload();
    } catch (error) {
      console.error("Error al registrar la persona de contacto:", error);
      alert("Error al registrar la persona de contacto: " + (error.response?.data?.error || "Error desconocido"));
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
  