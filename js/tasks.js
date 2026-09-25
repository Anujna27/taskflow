import {
  getTasks,
  saveTasks,
} from "./storage.js";

function createId() {
  return Date.now().toString();
}

export function getAllTasks() {
  return getTasks();
}

export function addTask(taskData) {
  const tasks = getTasks();

  const newTask = {
    id: createId(),
    title: taskData.title.trim(),
    description: taskData.description.trim(),
    status: taskData.status,
    priority: taskData.priority,
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(newTask);
  saveTasks(tasks);

  return newTask;
}

export function updateTask(taskId, taskData) {
  const tasks = getTasks();

  const updatedTasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      status: taskData.status,
      priority: taskData.priority,
      updatedAt: new Date().toISOString(),
    };
  });

  saveTasks(updatedTasks);

  return updatedTasks.find((task) => task.id === taskId);
}

export function deleteTask(taskId) {
  const tasks = getTasks();

  const updatedTasks = tasks.filter(
    (task) => task.id !== taskId
  );

  saveTasks(updatedTasks);

  return updatedTasks;
}

export function getTaskById(taskId) {
  const tasks = getTasks();

  return tasks.find((task) => task.id === taskId);
}

export function getTaskStats() {
  const tasks = getTasks();

  return {
    total: tasks.length,

    todo: tasks.filter(
      (task) => task.status === "todo"
    ).length,

    progress: tasks.filter(
      (task) => task.status === "progress"
    ).length,

    done: tasks.filter(
      (task) => task.status === "done"
    ).length,
  };
}