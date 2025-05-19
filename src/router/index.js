import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/HomePage.vue'
import DisciplinasView from '@/views/DisciplinasView.vue'
import PeriodoView from '@/views/PeriodoView.vue'
import TurmasView from '@/views/TurmasView.vue'
import UsuariosView from '@/views/UsuariosView.vue'
import VinculosView from '@/views/VinculosView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', // ou 'hash' se preferir
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/disciplinas',
      name: 'disciplinas',
      component: DisciplinasView
    },
    {
      path: '/periodo',
      name: 'periodo',
      component: PeriodoView
    },
    {
      path: '/turmas',
      name: 'turmas',
      component: TurmasView
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsuariosView
    },
    {
      path: '/vinculos',
      name: 'vinculos',
      component: VinculosView
    },
  ]
})
