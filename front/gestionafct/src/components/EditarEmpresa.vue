<template>
    <form @submit.prevent="validarFormulario">
        <div>
            <label>Identificación Fiscal</label>
            <input type="text" v-model="form.identificacion_fiscal" required />
        </div>
        <div>
            <label>Nombre</label>
            <input type="text" v-model="form.nombre" required />
        </div>
        <div>
            <label>Razón Social</label>
            <input type="text" v-model="form.razon_social" required />
        </div>
        <div>
            <label>Tipo de Empresa</label>
            <input type="text" v-model="form.tipo_empresa" required />
        </div>
        <div>
            <label>Correo Electrónico</label>
            <input type="email" v-model="form.correo" required />
        </div>
        <div>
            <label>Teléfono</label>
            <input type="tel" v-model="form.telefono" required />
        </div>
        <div>
            <label>Dirección</label>
            <input type="text" v-model="form.direccion" required />
        </div>
        <div>
            <label>Ciudad</label>
            <input type="text" v-model="form.ciudad" required />
        </div>
        <div>
            <label>Código Postal</label>
            <input type="text" v-model="form.codigo_postal" required />
        </div>
        <div>
            <label>País</label>
            <input type="text" v-model="form.pais" required />
        </div>
        <div>
            <label>Fecha de Constitución</label>
            <input type="date" v-model="form.fecha_constitucion" required />
        </div>
        <div>
            <label>Sector</label>
            <input type="text" v-model="form.sector" required />
        </div>
        <div>
            <label>Número de Empleados</label>
            <input type="number" v-model="form.numero_empleados" required />
        </div>
        <div>
            <label>Sitio Web</label>
            <input type="text" v-model="form.sitio_web" />
        </div>
        <div>
            <label>Logo</label>
            <input type="file" @change="cargarLogo" />
        </div>
        <div>
            <label>Representante Legal</label>
            <input type="text" v-model="form.representante_legal" required />
        </div>
        <div>   
            <label>Estado de la Empresa</label>
            <select v-model="form.estado" required>
                <option value="">Selecciona</option>
                <option value="Sin contactar">Sin contactar</option>
                <option value="Contactado">Contactado</option>
                <option value="Admite Alumnos">Admite Alumnos</option>
                <option value="No Admite Alumnos">No Admite Alumnos</option>
            </select>
        </div>
        <div>
            <label>Fecha Alta</label>
            <input type="date" v-model="form.fecha_alta" />
        </div>
        <div>
            <label>Notas</label>
            <textarea v-model="form.notas"></textarea>
        </div>

        <button type="submit">Editar Empresa</button>
    </form>
</template>

<script>
import axios from "axios";

export default {
    props: {
        empresaSeleccionada: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            form: {
                id: 0,
                identificacion_fiscal: "",
                nombre: "",
                razon_social: "",
                tipo_empresa: "",
                correo: "",
                telefono: "",
                direccion: "",
                ciudad: "",
                codigo_postal: "",
                pais: "",
                fecha_constitucion: "",
                sector: "",
                numero_empleados: 0,
                sitio_web: "",
                logo: null,
                representante_legal: "",
                estado: "Activa",
                fecha_alta: "",
                notas: ""
            }
        };
    },
    watch: {
        empresaSeleccionada(newId) {
            if (newId) {
                this.cargarEmpresa();
            }
        }
    },
    mounted() {
        if (this.empresaSeleccionada) {
            this.cargarEmpresa();
        }
    },
    methods: {
        async cargarEmpresa() {
            try {
                const response = await axios.get(`http://localhost:3000/app/empresas/${this.empresaSeleccionada}`);
                const empresa = response.data;

                this.form = {
                    id: empresa.id || 0,
                    identificacion_fiscal: empresa.identificacion_fiscal || "",
                    nombre: empresa.nombre || "",
                    razon_social: empresa.razon_social || "",
                    tipo_empresa: empresa.tipo_empresa || "",
                    correo: empresa.correo || "",
                    telefono: empresa.telefono || "",
                    direccion: empresa.direccion || "",
                    ciudad: empresa.ciudad || "",
                    codigo_postal: empresa.codigo_postal || "",
                    pais: empresa.pais || "",
                    fecha_constitucion: this.formatearFecha(empresa.fecha_constitucion),
                    sector: empresa.sector || "",
                    numero_empleados: empresa.numero_empleados || 0,
                    sitio_web: empresa.sitio_web || "",
                    logo: empresa.logo || "",
                    representante_legal: empresa.representante_legal || "",
                    estado: empresa.estado || "Activa",
                    fecha_alta: this.formatearFecha(empresa.fecha_alta),
                    notas: empresa.notas || ""
                };
            } catch (error) {
                console.error("Error al cargar los datos de la empresa:", error);
            }
        },

        formatearFecha(fecha) {
            if (!fecha) return "";
            return fecha.split("T")[0];
        },

        cargarLogo(event) {
            const file = event.target.files[0];
            if (file) {
                this.form.logo = file;
            }else{
                this.form.logo = null;
            }
        },

        async validarFormulario() {
            if (!this.form.nombre.trim()) return alert("El nombre es obligatorio.");
            if (!this.form.razon_social.trim()) return alert("La razón social es obligatoria.");
            if (!this.form.fecha_constitucion) return alert("La fecha de constitución es obligatoria.");
            const id = this.form.id;
            try {
                const response = await axios.put(`http://localhost:3000/app/empresas/${id}`, this.form, {
                    headers: { "Content-Type": "application/json" },
                });

                alert(`Empresa actualizada con éxito. ID: ${response.data.id}`);
                window.location.href = "/GestionarEmpresas";
                window.location.reload();

            } catch (error) {
                console.error("Error al actualizar la empresa:", error);
                alert("Error al actualizar la empresa: " + (error.response?.data?.error));
            }
        }
    }
};
</script>
