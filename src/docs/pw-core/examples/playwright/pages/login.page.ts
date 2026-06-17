import { Page, Locator } from "@playwright/test";

export class LoginPage {
  public page: Page;
  public username: Locator;
  public password: Locator;
  public loginBtn: Locator;
  public loginError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = this.page.getByTestId("username-input");
    this.password = this.page.getByTestId("password-input");
    this.loginBtn = this.page.getByTestId("login-button");
    this.loginError = this.page.getByTestId("login-error");
  }

  async login() {
    await this.username.fill("admin");
    await this.password.fill("password");
    await this.loginBtn.click();
  }
}
