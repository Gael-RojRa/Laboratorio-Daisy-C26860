<script setup lang="ts">

import { useProjectsStore } from '@/stores/projects';
import type { Project, Task } from '@/interfaces/interface';

const percentage = (tasks: Task[]) => {
  if (tasks.length === 0) return 0;
  const completedTasks = tasks.filter(task => task.completedAt).length;
  return Math.round((completedTasks / tasks.length) * 100);
};

</script>

<template>

  <h1 class="text-3xl font-bold mb-4">My Projects</h1>

  <table class="table w-fit h-fit">
    <!-- head -->
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Tareas</th>
        <th>Completado</th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="project, index in useProjectsStore().projects" :key="project.id">
        <td>{{ index + 1 }}</td>
        <td>{{ project.name }}</td>
        <td>{{ project.tasks.length }}</td>

      </tr>
    </tbody>
  </table>
</template>