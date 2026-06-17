import { test } from "../docs/fixtures";

test("login with custom method", async ({ loginPage }) => {
  await loginPage.page.goto("/login");

  await loginPage.login();
});
