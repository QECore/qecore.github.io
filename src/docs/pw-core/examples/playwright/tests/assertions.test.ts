import { test, expect } from "../docs/fixtures";

test("verify login visibility", async ({ loginPage }) => {
  await loginPage.page.goto("/login");
  await expect(loginPage.loginBtn).toBeVisible();
});
