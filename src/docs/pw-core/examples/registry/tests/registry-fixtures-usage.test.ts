import { registry as test } from "../docs/registry";

test("login spec", async ({ loginPage }) => {
  await loginPage.fill("username", "admin");
  await loginPage.fill("password", "password");
  await loginPage.click("loginBtn");
});

// Or use a worker page
test.beforeAll(async ({ workerLoginPage }) => {
  // Worker Page Actions
})
// Reuse the same page
test("login spec", async ({ workerLoginPage }) => { });