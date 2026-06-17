import { test } from "../docs/registry";

test("login spec", async ({ loginPage }) => {
  await loginPage.fill("username", "admin");
  await loginPage.fill("password", "password");
  await loginPage.click("loginBtn");
});
