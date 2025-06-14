<script setup lang="ts">

import { useProjectsStore } from '@/stores/projects';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();
const id = ref(route.params.id as string);

const tasksByProject = ref(
  useProjectsStore().projects.find(project => project.id === id.value)?.tasks
);


const handleCompleteTask = (projectId: string, taskId: string) => {
  useProjectsStore().completeTask(projectId ,taskId);
};

const newTaskName = ref('');
const handleAddTask = () => {
  useProjectsStore().addTask(id.value , newTaskName.value);
    newTaskName.value = '';
};

watch(
  () => route.params.id,
  (newId) => {
    id.value = newId as string;
    tasksByProject.value = useProjectsStore().projects.find(project => project.id === id.value)?.tasks;
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
                        <td>{{ task.name }}</td>
                        <td>{{ task.completedAt }}</td>
                        <td>
                            <button v-if="task.completedAt == null" @click="handleCompleteTask(id, task.id)" class="btn btn-success">Complete</button>
                        </td>
                    </tr>
                    <tr> <td colspan="4"><input type="text" placeholder="Add task" class="w-full" @keyup.enter="handleAddTask" v-model="newTaskName"  ></td></tr>
                </tbody>
            </table>
        </div>
    </div>

</template>