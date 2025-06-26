<script setup lang="ts">

import { useProjectsStore } from '@/stores/projects';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import type { Task } from '@/interfaces/interface';

const route = useRoute();
const id = ref(route.params.id as string);
const store = useProjectsStore();

const tasksByProject = ref(
  store.projects.find(project => project.id === id.value)?.tasks
);

const handleCompleteTask = (projectId: string, taskId: string) => {
  store.completeTask(projectId ,taskId);
};

const newTaskName = ref('');
const handleAddTask = () => {
  store.addTask(id.value , newTaskName.value);
  newTaskName.value = '';
  tasksByProject.value = store.projects.find(project => project.id === id.value)?.tasks;
};

const editingTaskId = ref<string | null>(null);
const editingTaskName = ref('');

const startEditTask = (task: Task) => {
  editingTaskId.value = task.id;
  editingTaskName.value = task.name;
};

const saveTaskName = () => {
  if (editingTaskId.value && editingTaskName.value.trim()) {
    store.editTaskName(id.value, editingTaskId.value, editingTaskName.value.trim());
  }
  editingTaskId.value = null;
  editingTaskName.value = '';
};

const cancelEditTask = () => {
  editingTaskId.value = null;
  editingTaskName.value = '';
};

const handleDeleteTask = (taskId: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
    store.deleteTask(id.value, taskId);
    tasksByProject.value = store.projects.find(project => project.id === id.value)?.tasks;
  }
};

watch(
  () => route.params.id,
  (newId) => {
    id.value = newId as string;
    tasksByProject.value = store.projects.find(project => project.id === id.value)?.tasks;
  }
);

</script>

<template>

    <div>
        <h1 class="text-3xl font-bold mb-4">Projects</h1>
        <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>completedAt</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="task in tasksByProject" :key="task.id">
                        <td>{{ task.id }}</td>
                        <td>
                            <!-- Campo editable para el nombre de la tarea -->
                            <div v-if="editingTaskId === task.id" class="flex items-center gap-2">
                                <input
                                    type="text"
                                    v-model="editingTaskName"
                                    @keyup.enter="saveTaskName"
                                    @keyup.esc="cancelEditTask"
                                    @blur="saveTaskName"
                                    class="input input-bordered input-sm w-48"
                                    autofocus
                                />
                            </div>
                            <span 
                                v-else 
                                @dblclick="startEditTask(task)"
                                class="cursor-pointer hover:bg-blue-800 px-2 py-1 rounded transition-colors"
                            >
                                {{ task.name }}
                            </span>
                        </td>
                        <td>{{ task.completedAt }}</td>
                        <td class="flex gap-2">
                            <button 
                                v-if="task.completedAt == null" 
                                @click="handleCompleteTask(id, task.id)" 
                                class="btn btn-success btn-sm"
                            >
                                Complete
                            </button>
                            <button 
                                @click="handleDeleteTask(task.id)" 
                                class="btn btn-error btn-sm"
                                title="Eliminar tarea"
                            >
                                🗑️
                            </button>
                        </td>
                    </tr>
                    <tr> 
                        <td colspan="4">
                            <input 
                                type="text" 
                                placeholder="Add task" 
                                class="w-full input input-bordered" 
                                @keyup.enter="handleAddTask" 
                                v-model="newTaskName"
                            >
                        </td> 
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>