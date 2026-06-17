import { Page } from "@playwright/test";
import { TypedPage, createPageConfig } from "pw-core/page";

const config = createPageConfig({
  url: "/login",
  testIds: {
    username: "username-input",
    password: "password-input",
    loginBtn: "login-button",
    loginError: "login-error",
  },
});

export class LoginPage extends TypedPage<typeof config> {
  constructor(page: Page) {
    super(page, config);
  }
}
