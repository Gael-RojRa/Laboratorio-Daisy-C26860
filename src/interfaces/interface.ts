export interface Project {
  id: string;
  name: string;
  tasks: Task[];
  completedAt?: Date;
}

export interface Task {
  id: string;
  name: string;
  completedAt?: string;
}