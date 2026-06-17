import { test, expect } from "../docs/fixtures";

test("user can login", async ({ loginPage }) => {
  await loginPage.page.goto("/login");
  await loginPage.username.fill("admin");
  await loginPage.password.fill("password");
  await loginPage.loginBtn.click();
  await expect(loginPage.loginError).toBeVisible();
});
