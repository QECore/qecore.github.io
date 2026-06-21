import { test } from "../docs/fixtures";

test("login with custom methods on overridden registry page",
  async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login();
  });
