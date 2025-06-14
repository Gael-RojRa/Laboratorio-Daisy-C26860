<script setup lang="ts">

import { useProjectsStore } from '@/stores/projects';
import { useRouter } from 'vue-router';

const router = useRouter();
const openProject = (projectId: string) => {
  console.log(`Opening project with ID: ${projectId}`);
  router.push({ name: 'Projects', params: { id: projectId } });
};

</script>

<template>

  <ul class="menu bg-base-200 rounded-box w-56">
    <li v-for="project in useProjectsStore().projects" :key="project.id">
      <details v-if="project.tasks.length > 0">
        <summary @click="openProject(project.id)">{{ project.name }}</summary>
        <ul>
          <li v-for="task in project.tasks" :key="task.id"> {{ task.name }}</li>
        </ul>
      </details>
      <li v-else @click="openProject(project.id)">{{ project.name }}</li>
    </li>
  </ul>


</template>