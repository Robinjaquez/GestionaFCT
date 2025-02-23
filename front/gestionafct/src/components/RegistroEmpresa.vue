<template>
  <form @submit.prevent="validarFormulario">
    <div>
      <label>Nombre de la Empresa</label>
      <input type="text" v-model="form.nombre" maxlength="255" required />
    </div>

    <div>
      <label>Razón Social</label>
      <input type="text" v-model="form.razon_social" maxlength="255" />
    </div>

    <div>
      <label>Tipo de Empresa</label>
      <select v-model="form.tipo_empresa" required>
        <option value="">Selecciona</option>
        <option value="Sociedad Anónima">Sociedad Anónima</option>
        <option value="Sociedad Limitada">Sociedad Limitada</option>
        <option value="Autónomo">Autónomo</option>
      </select>
    </div>

    <div>
      <label>Identificación Fiscal (NIF/CIF)</label>
      <input type="text" v-model="form.identificacion_fiscal" maxlength="50" required />
    </div>

    <div>
      <label>Correo Electrónico</label>
      <input type="email" v-model="form.correo" required />
    </div>

    <div>
      <label>Número de Teléfono</label>
      <input type="tel" v-model="form.telefono" />
    </div>

    <div>
      <label>Dirección</label>
      <textarea v-model="form.direccion" rows="2" required></textarea>
    </div>

    <div>
      <label>Ciudad</label>
      <input type="text" v-model="form.ciudad" maxlength="100" required />
    </div>

    <div>
      <label>Código Postal</label>
      <input type="text" v-model="form.codigo_postal" maxlength="10" required />
    </div>

    <div>
      <label>País</label>
      <input type="text" v-model="form.pais" maxlength="100" required />
    </div>

    <div>
      <label>Fecha de Constitución</label>
      <input type="date" v-model="form.fecha_constitucion" />
    </div>

    <div>
      <label>Sector o Industria</label>
      <input type="text" v-model="form.sector" maxlength="100" />
    </div>

    <div>
      <label>Número de Empleados</label>
      <input type="number" v-model="form.numero_empleados" min="1" />
    </div>

    <div>
      <label>Sitio Web</label>
      <input type="text" v-model="form.sitio_web" />
    </div>

    <div>
      <label>Logo de la Empresa</label>
      <input type="file" @change="cargarLogo" />
    </div>

    <div>
      <label>Representante Legal</label>
      <input type="text" v-model="form.representante_legal" maxlength="255" />
    </div>

    <div>
      <label>Estado de la Empresa</label>
      <select v-model="form.estado" required>
        <option value="">Selecciona</option>
        <option value="Activa">Activa</option>
        <option value="Inactiva">Inactiva</option>
        <option value="En Liquidación">En Liquidación</option>
      </select>
    </div>

    <div>
      <label>Fecha de Alta</label>
      <input type="date" v-model="form.fecha_alta" />
    </div>

    <div>
      <label>Notas Adicionales</label>
      <textarea v-model="form.notas" rows="3" maxlength="255"></textarea>
    </div>

    <button type="submit">Registrar Empresa</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const form = ref({
  nombre: "",
  razon_social: "",
  tipo_empresa: "",
  identificacion_fiscal: "",
  correo: "",
  telefono: "",
  direccion: "",
  ciudad: "",
  codigo_postal: "",
  pais: "",
  fecha_constitucion: "",
  sector: "",
  numero_empleados: "",
  sitio_web: "",
  logo: null,
  representante_legal: "",
  estado: "",
  fecha_alta: "",
  notas: "",
});

const cargarLogo = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.logo = file;
  }
};

const validarFormulario = async () => {
  if (!form.value.nombre.trim()) return alert("El nombre de la empresa es obligatorio.");
  if (!form.value.identificacion_fiscal.trim()) return alert("La identificación fiscal es obligatoria.");
  if (!form.value.correo || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.value.correo)) {
    return alert("El correo electrónico no es válido.");
  }

  try {
    const response = await axios.post("http://localhost:3000/app/empresas", form.value, {
      headers: { "Content-Type": "application/json" },
    });

    alert(`Empresa registrada con éxito. ID: ${response.data.id}`);
    window.location.href = "/GestionarEmpresas";
    window.location.reload();
  } catch (error) {
    console.error("Error al registrar la empresa:", error);
    alert("Error al registrar la empresa: " + (error.response?.data?.error || "Error desconocido"));
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
