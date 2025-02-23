//Rutas de Páginas Principales
import { createRouter, createWebHistory } from 'vue-router';
import PaginaInicio from '../views/PaginaInicio.vue'; 
import GestionaAlumnos from '../views/GestionaAlumnos.vue';
import GestionaProfesores from '../views/GestionaProfesores.vue';
import GestionaEmpresas from '../views/GestionaEmpresas.vue';
import GestionaContactos from '../views/GestionaContactos.vue';

// Rutas de Formularios

const routes = [
  { path: '/', component: PaginaInicio },
  { path: '/gestiona-alumnos', component: GestionaAlumnos },
  { path: '/gestiona-profesores', component: GestionaProfesores },
  { path: '/gestiona-empresas', component: GestionaEmpresas },
  { path: '/gestiona-contactos', component: GestionaContactos },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
