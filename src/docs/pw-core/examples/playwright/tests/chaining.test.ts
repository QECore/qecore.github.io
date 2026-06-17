import { test } from "../docs/fixtures";

test("chaining locators to interact with table rows", async ({ dashboardPage }) => {
  await dashboardPage.page.goto("/dashboard");
  await dashboardPage.projectsTable
    .locator(dashboardPage.title)
    .nth(1)
    .dblclick();
});
