<script setup lang="ts">

import { useProjectsStore } from '@/stores/projects';
import type { Project, Task } from '@/interfaces/interface';
import { ref } from 'vue';

const store = useProjectsStore();

const percentage = (tasks: Task[]) => {
  if (tasks.length === 0) return 0;
  const completedTasks = tasks.filter(task => task.completedAt).length;
  return Math.round((completedTasks / tasks.length) * 100);
};

const editingProjectId = ref<string | null>(null);
const editingProjectName = ref('');

const startEditProject = (project: Project) => {
  editingProjectId.value = project.id;
  editingProjectName.value = project.name;
};

const saveProjectName = () => {
  if (editingProjectId.value && editingProjectName.value.trim()) {
    store.editProjectName(editingProjectId.value, editingProjectName.value.trim());
  }
  editingProjectId.value = null;
  editingProjectName.value = '';
};

const cancelEditProject = () => {
  editingProjectId.value = null;
  editingProjectName.value = '';
};

const handleDeleteProject = (projectId: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
    store.deleteProject(projectId);
  }
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
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="project, index in store.projects" :key="project.id">
        <td>{{ index + 1 }}</td>
        <td>
          <div v-if="editingProjectId === project.id" class="flex items-center gap-2">
            <input
              type="text"
              v-model="editingProjectName"
              @keyup.enter="saveProjectName"
              @keyup.esc="cancelEditProject"
              @blur="saveProjectName"
              class="input input-bordered input-sm w-48"
              ref="editInput"
              autofocus
            />
          </div>
          <span 
            v-else 
            @dblclick="startEditProject(project)"
            class="cursor-pointer hover:bg-blue-800 px-2 py-1 rounded transition-colors"
          >
            {{ project.name }}
          </span>
        </td>
        <td>{{ project.tasks.length }}</td>
        <td>{{ percentage(project.tasks) }}%</td>
        <td>
          <button 
            @click="handleDeleteProject(project.id)" 
            class="btn btn-error btn-sm"
            title="Eliminar proyecto"
          >
            🗑️
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>