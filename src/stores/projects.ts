import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';
import type { Project, Task } from "@/interfaces/interface"
import { useDateFormat } from "@vueuse/core";
import { useLocalStorage } from "@vueuse/core";



export const useProjectsStore = defineStore('projects', () => {

  const projects = useLocalStorage<Project[]>('projects', [

{
  id: uuidv4(),
  name: 'Project 1',
  tasks: [
    { id: '1', name: 'Task 1', completedAt: useDateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss').value },
    { id: '2', name: 'Task 2' }
  ],
},

{
  id: uuidv4(),
  name: 'Project 2',
  tasks: [
    { id: '1', name: 'Task 3' },
    { id: '2', name: 'Task 4' }
  ],
}

  ]);


function addProject(name: string) {
  projects.value.push(
    {
      id: uuidv4(),
      name: name,
      tasks: [],
    }
  )}

  function completeTask(projectId: string, taskId: string) {
    const project = projects.value.find(p => p.id === projectId);
    if (project) {
      const task = project.tasks.find(t => t.id === taskId);
      if (task) {
        task.completedAt  = useDateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss').value;
      }
    }
  }

  function addTask(projectId: string, taskName: string) {
    const project = projects.value.find(p => p.id === projectId);
    const newTaskId = project?.tasks.length ? (parseInt(project.tasks[project.tasks.length - 1].id) + 1).toString() : '1';
    if (project) {
      project.tasks.push({
        id: newTaskId,
        name: taskName,
      });
    }
  }

  return { projects, addProject, completeTask, addTask  };

})

