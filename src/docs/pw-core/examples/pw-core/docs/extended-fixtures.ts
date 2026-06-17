import { registry } from "./registry";
import { ExtendedLoginPage } from "../pages/extended-login.page";

// Extend the registry runner with the overridden custom LoginPage class
export const test = registry.extend({
  loginPage: ExtendedLoginPage,
});

/**
 * Note: We extend in separate file to avoid circular dependency issue 
 * between registry, pageObject
*/

export { expect } from "@playwright/test";
