import { test } from "../docs/extended-fixtures";

test("login with custom methods on extended registry page", async ({ loginPage }) => {
  await loginPage.goto();
  // Call the custom method added by the ExtendedLoginPage subclass
  await loginPage.login();
});
