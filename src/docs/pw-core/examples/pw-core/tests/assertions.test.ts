import { test } from "../docs/fixtures";

test("verify login visibility", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.verify("loginBtn");
});
