import { createPageConfig } from "pw-core/page";

export const config = createPageConfig({
  url: "/transactions",
  testIds: {
    table: "transactions-table",
    next: "next-page",
    prev: "prev-page",
  },
  selectors: {
    pageTitle: "h1",
  },
});
