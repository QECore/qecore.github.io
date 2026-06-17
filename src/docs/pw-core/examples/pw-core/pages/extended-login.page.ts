import { Page } from "@playwright/test";
import { registry } from "../docs/registry";

// Extending the dynamically generated registry page class to add custom methods
export class ExtendedLoginPage extends registry.classes.loginPage {
  constructor(page: Page) {
    super(page);
  }

  async login() {
    await this.fill("username", "admin");
    await this.fill("password", "password");
    await this.click("loginBtn");
  }
}
