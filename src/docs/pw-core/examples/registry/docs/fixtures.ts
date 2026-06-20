import { registry } from "./registry";
import { LoginPage } from "../pages/login.page";

// Extend the registry runner with the overridden custom LoginPage class
export const test = registry.extend({
  loginPage: LoginPage,
});

// Note: We extend in separate file to avoid circular dependency issue 

export { expect } from "@playwright/test";
