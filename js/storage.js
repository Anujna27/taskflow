const STORAGE_KEYS = {
  user: "taskflow-user",
  tasks: "taskflow-tasks",
  theme: "taskflow-theme",
};

// Save data
export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Get data
export function getData(key, fallback = null) {
  const data = localStorage.getItem(key);

  if (!data) {
    return fallback;
  }

  try {
    return JSON.parse(data);
  } catch {
    return fallback;
  }
}

// Remove data
export function removeData(key) {
  localStorage.removeItem(key);
}

// User
export function saveUser(user) {
  saveData(STORAGE_KEYS.user, user);
}

export function getUser() {
  return getData(STORAGE_KEYS.user, null);
}

export function clearUser() {
  removeData(STORAGE_KEYS.user);
}

// Tasks
export function saveTasks(tasks) {
  saveData(STORAGE_KEYS.tasks, tasks);
}

export function getTasks() {
  return getData(STORAGE_KEYS.tasks, []);
}

// Theme
export function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.theme, theme);
}

export function getTheme() {
  return localStorage.getItem(STORAGE_KEYS.theme) || "light";
}

export { STORAGE_KEYS };