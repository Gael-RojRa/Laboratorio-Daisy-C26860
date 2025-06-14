import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/Table.vue'),
        },

        {
          path: '/projects/:id',
          name: 'Projects',
          component: () => import('@/views/ProjectsView.vue'),
        }],
    },

  ],
})

export default router
