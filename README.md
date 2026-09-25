# TaskFlow — Smart Task Management Dashboard

TaskFlow is a responsive task management dashboard built with HTML, CSS, and JavaScript.

It provides a simple workspace for managing tasks through a simulated login system, CRUD operations, filtering, search, theme switching, and persistent browser storage.

## Live Demo

https://taskflow-eciyj1xib-anujna-ks-projects.vercel.app

## GitHub

https://github.com/Anujna27/taskflow

## Features

- Simulated user authentication
- Dashboard with task statistics
- Create new tasks
- Edit existing tasks
- Delete tasks
- Task status management
- Task priority management
- Search tasks in real time
- Filter by status
- Filter by priority
- Light and dark themes
- Persistent data using localStorage
- Responsive layout
- Empty-state handling
- Modular JavaScript architecture

## Tech Stack

- HTML5
- CSS3
- JavaScript ES6
- JavaScript ES Modules
- Browser localStorage
- Vercel

## Project Structure

```text
taskflow/
├── index.html
├── style.css
├── README.md
├── docs/
│   └── architecture.png
└── js/
    ├── app.js
    ├── auth.js
    ├── tasks.js
    └── storage.js
Architecture

TaskFlow follows a modular client-side architecture.

Application Flow
User
  ↓
TaskFlow UI
  ↓
app.js
  ↓
 ┌──────────┬──────────┬────────────┐
 ↓          ↓          ↓
auth.js   tasks.js   storage.js
                       ↓
                 localStorage
Module Responsibilities
app.js

Acts as the main application controller.

Handles:

UI interactions
Navigation
Rendering
Forms
Search and filters
Theme switching
Communication between modules
auth.js

Handles the simulated authentication flow.

Includes:

Login
Logout
Current user state
tasks.js

Handles task management operations.

Includes:

Create
Read
Update
Delete
Task statistics
storage.js

Provides a reusable localStorage layer for:

User data
Task data
Theme preference
Authentication

TaskFlow uses a simulated client-side authentication system for demonstration purposes.

User information is stored locally in the browser and does not connect to a real authentication server.

Data Persistence

Task data and user preferences are stored using browser localStorage.

The following storage keys are used:

taskflow-user
taskflow-tasks
taskflow-theme

This allows task information and theme preferences to remain available after refreshing the page.

CRUD Operations

TaskFlow implements the complete CRUD workflow:

Operation	Function
Create	Add a new task
Read	Display saved tasks
Update	Edit task details
Delete	Remove a task
Responsive Design

The interface is designed to work across:

Desktop
Tablet
Mobile

The layout adapts using responsive CSS breakpoints, CSS Grid, and Flexbox.

Deployment

The application is deployed using Vercel.

Live application:

https://taskflow-eciyj1xib-anujna-ks-projects.vercel.app

Testing

The application was tested for:

Login flow
Dashboard rendering
Task creation
Task editing
Task deletion
Search
Status filtering
Priority filtering
LocalStorage persistence
Page refresh persistence
Light/dark theme switching
Responsive layout
Production deployment
Implementation Note

Built a responsive task management dashboard using modular JavaScript and browser-based persistent storage.

Implemented simulated authentication, dynamic CRUD operations, task filtering, search, dashboard statistics, theme persistence, responsive UI, and a modular client-side architecture.

Live Demo: https://taskflow-eciyj1xib-anujna-ks-projects.vercel.app

GitHub: https://github.com/Anujna27/taskflow

## Screenshots

### Dashboard

![TaskFlow Dashboard]

### CRUD Operations

![TaskFlow CRUD]

### Persistent State

![TaskFlow Persistence]