import { test } from "../docs/fixtures";

test("chaining locators to interact with table rows", async ({ dashboardPage }) => {
  await dashboardPage.goto();
  await dashboardPage.dblclick("projectsTable.title", { nth: 1 });
});
