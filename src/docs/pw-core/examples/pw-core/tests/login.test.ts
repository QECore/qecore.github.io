import { test } from "../docs/fixtures";

test("user can login", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.fill("username", "admin");
  await loginPage.fill("password", "password");
  await loginPage.click("loginBtn");
  await loginPage.verify("loginError");
});
