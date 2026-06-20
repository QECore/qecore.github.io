import { createPageRegistry } from "pw-core/page";

// Centralized page configuration &
// Default test runner with automatic fixtures
export const registry = createPageRegistry({
  loginPage: {
    url: "/login",
    testIds: {
      username: "username-input",
      password: "password-input",
      loginBtn: "login-button",
    },
  },
});

