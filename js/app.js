import {
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
} from "./auth.js";

import {
  addTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getTaskStats,
} from "./tasks.js";

import {
  saveTheme,
  getTheme,
} from "./storage.js";

/* =========================
   DOM ELEMENTS
========================= */

const loginScreen = document.getElementById("login-screen");
const appShell = document.getElementById("app-shell");

const loginForm = document.getElementById("login-form");
const nameInput = document.getElementById("login-name");
const emailInput = document.getElementById("login-email");

const logoutButton = document.getElementById("logout-button");

const welcomeMessage = document.getElementById("welcome-message");
const userAvatar = document.getElementById("user-avatar");

const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".app-section");

const themeToggle = document.getElementById("theme-toggle");
const settingsThemeToggle =
  document.getElementById("settings-theme-toggle");

const totalTasks = document.getElementById("total-tasks");
const pendingTasks = document.getElementById("pending-tasks");
const progressTasks = document.getElementById("progress-tasks");
const completedTasks = document.getElementById("completed-tasks");

const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");

const searchInput = document.getElementById("search-input");
const statusFilter = document.getElementById("status-filter");
const priorityFilter = document.getElementById("priority-filter");

const addTaskButton = document.getElementById("add-task-button");

const taskModal = document.getElementById("task-modal");
const taskModalTitle = document.getElementById("task-modal-title");
const taskForm = document.getElementById("task-form");

const taskIdInput = document.getElementById("task-id");
const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput =
  document.getElementById("task-description");
const taskStatusInput = document.getElementById("task-status");
const taskPriorityInput = document.getElementById("task-priority");

const closeModalButton = document.getElementById("close-modal");
const cancelTaskButton = document.getElementById("cancel-task");


/* =========================
   APP INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();

  if (isAuthenticated()) {
    showApp();
  } else {
    showLogin();
  }

  setupEventListeners();
});


/* =========================
   EVENT LISTENERS
========================= */

function setupEventListeners() {
  loginForm?.addEventListener("submit", handleLogin);

  logoutButton?.addEventListener("click", handleLogout);

  addTaskButton?.addEventListener("click", () => {
    openTaskModal();
  });

  closeModalButton?.addEventListener("click", closeTaskModal);

  cancelTaskButton?.addEventListener("click", closeTaskModal);

  taskForm?.addEventListener("submit", handleTaskSubmit);

  searchInput?.addEventListener("input", renderTasks);

  statusFilter?.addEventListener("change", renderTasks);

  priorityFilter?.addEventListener("change", renderTasks);

  themeToggle?.addEventListener("click", toggleTheme);

  settingsThemeToggle?.addEventListener(
    "click",
    toggleTheme
  );

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const target = item.dataset.section;

      if (target) {
        switchSection(target);
      }
    });
  });

  taskModal?.addEventListener("click", (event) => {
    if (event.target === taskModal) {
      closeTaskModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeTaskModal();
    }
  });
}


/* =========================
   AUTHENTICATION
========================= */

function handleLogin(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    return;
  }

  login(name, email);

  loginForm.reset();

  showApp();
}

function handleLogout() {
  logout();

  showLogin();
}

function showLogin() {
  loginScreen?.classList.remove("hidden");
  appShell?.classList.add("hidden");
}

function showApp() {
  loginScreen?.classList.add("hidden");
  appShell?.classList.remove("hidden");

  updateUserInterface();
  renderDashboard();
  renderTasks();
}

function updateUserInterface() {
  const user = getCurrentUser();

  if (!user) {
    return;
  }

  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome back, ${user.name}`;
  }

  if (userAvatar) {
    userAvatar.textContent = getInitials(user.name);
  }
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}


/* =========================
   NAVIGATION
========================= */

function switchSection(sectionName) {
  navItems.forEach((item) => {
    item.classList.toggle(
      "active",
      item.dataset.section === sectionName
    );
  });

  sections.forEach((section) => {
    section.classList.toggle(
      "active",
      section.id === `${sectionName}-section`
    );
  });
}


/* =========================
   DASHBOARD
========================= */

function renderDashboard() {
  const stats = getTaskStats();

  if (totalTasks) {
    totalTasks.textContent = stats.total;
  }

  if (pendingTasks) {
    pendingTasks.textContent = stats.todo;
  }

  if (progressTasks) {
    progressTasks.textContent = stats.progress;
  }

  if (completedTasks) {
    completedTasks.textContent = stats.done;
  }
}


/* =========================
   TASK RENDERING
========================= */

function renderTasks() {
  if (!taskList) {
    return;
  }

  const tasks = getFilteredTasks();

  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyState?.classList.remove("hidden");
    return;
  }

  emptyState?.classList.add("hidden");

  tasks.forEach((task) => {
    const taskCard = createTaskCard(task);

    taskList.appendChild(taskCard);
  });
}

function getFilteredTasks() {
  let tasks = getAllTasks();

  const searchTerm =
    searchInput?.value.trim().toLowerCase() || "";

  const selectedStatus =
    statusFilter?.value || "all";

  const selectedPriority =
    priorityFilter?.value || "all";

  if (searchTerm) {
    tasks = tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm)
      );
    });
  }

  if (selectedStatus !== "all") {
    tasks = tasks.filter(
      (task) => task.status === selectedStatus
    );
  }

  if (selectedPriority !== "all") {
    tasks = tasks.filter(
      (task) => task.priority === selectedPriority
    );
  }

  return tasks;
}

function createTaskCard(task) {
  const article = document.createElement("article");

  article.className = "task-card";

  article.innerHTML = `
    <div class="task-card-content">
      <div class="task-card-top">
        <span class="task-status ${task.status}">
          ${formatStatus(task.status)}
        </span>

        <span class="task-priority ${task.priority}">
          ${formatPriority(task.priority)}
        </span>
      </div>

      <h3>${escapeHTML(task.title)}</h3>

      <p>${escapeHTML(
        task.description || "No description provided."
      )}</p>
    </div>

    <div class="task-card-actions">
      <button
        class="edit-task"
        data-id="${task.id}"
        type="button"
      >
        Edit
      </button>

      <button
        class="delete-task"
        data-id="${task.id}"
        type="button"
      >
        Delete
      </button>
    </div>
  `;

  const editButton =
    article.querySelector(".edit-task");

  const deleteButton =
    article.querySelector(".delete-task");

  editButton.addEventListener("click", () => {
    openTaskModal(task.id);
  });

  deleteButton.addEventListener("click", () => {
    handleDeleteTask(task.id);
  });

  return article;
}


/* =========================
   TASK MODAL
========================= */

function openTaskModal(taskId = null) {
  if (!taskModal || !taskForm) {
    return;
  }

  taskForm.reset();

  if (taskId) {
    const task = getTaskById(taskId);

    if (!task) {
      return;
    }

    taskModalTitle.textContent = "Edit Task";

    taskIdInput.value = task.id;
    taskTitleInput.value = task.title;
    taskDescriptionInput.value = task.description;
    taskStatusInput.value = task.status;
    taskPriorityInput.value = task.priority;
  } else {
    taskModalTitle.textContent = "Add New Task";

    taskIdInput.value = "";

    taskStatusInput.value = "todo";
    taskPriorityInput.value = "medium";
  }

  taskModal.classList.remove("hidden");

  setTimeout(() => {
    taskTitleInput?.focus();
  }, 50);
}

function closeTaskModal() {
  taskModal?.classList.add("hidden");
}


/* =========================
   CREATE / UPDATE
========================= */

function handleTaskSubmit(event) {
  event.preventDefault();

  const taskData = {
    title: taskTitleInput.value,
    description: taskDescriptionInput.value,
    status: taskStatusInput.value,
    priority: taskPriorityInput.value,
  };

  const taskId = taskIdInput.value;

  if (taskId) {
    updateTask(taskId, taskData);
  } else {
    addTask(taskData);
  }

  closeTaskModal();

  renderDashboard();
  renderTasks();
}


/* =========================
   DELETE
========================= */

function handleDeleteTask(taskId) {
  const task = getTaskById(taskId);

  if (!task) {
    return;
  }

  const confirmed = window.confirm(
    `Delete "${task.title}"?`
  );

  if (!confirmed) {
    return;
  }

  deleteTask(taskId);

  renderDashboard();
  renderTasks();
}


/* =========================
   THEME
========================= */

function initializeTheme() {
  const savedTheme = getTheme();

  document.documentElement.dataset.theme =
    savedTheme;

  updateThemeButtons(savedTheme);
}

function toggleTheme() {
  const currentTheme =
    document.documentElement.dataset.theme || "light";

  const newTheme =
    currentTheme === "light"
      ? "dark"
      : "light";

  document.documentElement.dataset.theme =
    newTheme;

  saveTheme(newTheme);

  updateThemeButtons(newTheme);
}

function updateThemeButtons(theme) {
  if (themeToggle) {
    themeToggle.textContent =
      theme === "light" ? "🌙" : "☀️";
  }

  if (settingsThemeToggle) {
    settingsThemeToggle.textContent =
      theme === "light"
        ? "Switch to Dark Mode"
        : "Switch to Light Mode";
  }
}


/* =========================
   FORMATTING HELPERS
========================= */

function formatStatus(status) {
  const labels = {
    todo: "Pending",
    progress: "In Progress",
    done: "Completed",
  };

  return labels[status] || status;
}

function formatPriority(priority) {
  const labels = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };

  return labels[priority] || priority;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
