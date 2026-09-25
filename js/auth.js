import {
  saveUser,
  getUser,
  clearUser,
} from "./storage.js";

export function login(name, email) {
  const user = {
    name: name.trim(),
    email: email.trim(),
    loggedInAt: new Date().toISOString(),
  };

  saveUser(user);

  return user;
}

export function logout() {
  clearUser();
}

export function getCurrentUser() {
  return getUser();
}

export function isAuthenticated() {
  return Boolean(getUser());
}