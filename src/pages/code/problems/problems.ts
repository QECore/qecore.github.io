import {
  BrainCircuit,
  Boxes,
  FileCode2,
  Component,
  Tag,
  Puzzle,
  Import
} from "lucide-react";

export const ENGINEERING_PROBLEMS = [
  {
    id: 1,
    title: "AI Context Explosion",
    icon: BrainCircuit,
    description:
      "AI reads framework code before it reaches your business logic.",
    illustration: `tests/
pages/
fixtures/
helpers/
components/
utils/`,
    tags: ["Large Context", "More Tokens", "Slower AI"]
  },

  {
    id: 2,
    title: "Scattered Architecture",
    icon: Boxes,
    description:
      "One feature is spread across multiple framework layers.",
    illustration: `login.test.ts
login.page.ts
fixtures.ts
base.ts
helpers.ts
constants.ts`,
    tags: ["Many Files", "Context Switching", "Navigation"]
  },

  {
    id: 3,
    title: "Growing Page Objects",
    icon: FileCode2,
    description:
      "Page Objects become huge as applications grow.",
    illustration: `class DashboardPage
120 locators
35 methods
18 sections
2,400 lines
...`,
    tags: ["Large Classes", "Maintenance", "Bloat"]
  },

  {
    id: 4,
    title: "Framework Plumbing",
    icon: Component,
    description:
      "Framework setup grows faster than test logic.",
    illustration: `create page
create fixture
extend base
export test
import page
write test`,
    tags: ["Boilerplate", "Framework Work", "Slow"]
  },

  {
    id: 5,
    title: "Locator Duplication",
    icon: Tag,
    description:
      "The same element definitions live in multiple places.",
    illustration: `"save-btn"
"save-btn"
"save-btn"
"save-btn"
"save-btn"
...`,
    tags: ["Repeated", "Magic Strings", "Fragile"]
  },

  {
    id: 6,
    title: "Custom Helper APIs",
    icon: Puzzle,
    description:
      "Similar components create endless helper methods.",
    illustration: `getMenu()
getTab()
getCard()
getChip()
getToast()
...`,
    tags: ["API Growth", "Helpers", "Maintenance"]
  },

  {
    id: 7,
    title: "Framework Imports",
    icon: Import,
    description:
      "Tests begin by importing framework pieces instead of testing.",
    illustration: `LoginPage
UsersPage
OrdersPage
DashboardPage
ApiHelper
Fixtures`,
    tags: ["Imports", "Noise", "Dependencies"]
  }
];