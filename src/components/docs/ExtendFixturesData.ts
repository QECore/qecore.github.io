export interface CodeHighlight {
  id: string;
  text: string;
  explanation: string;
  lines: number[];
}

export interface SectionData {
  id: number;
  heading: string;
  subtitle: string;
  code: string;
  highlights: CodeHighlight[];
  conceptTitle: string;
  conceptSummary: string;
  bottomExplanations: string[];
}

export const SECTIONS: SectionData[] = [
  {
    id: 1,
    heading: "Generated Fixtures",
    subtitle: "PW-Core generates typed Playwright fixtures from your page registry.",
    code: `export const test = createPageRegistry(pageConfig);`,
    highlights: [
      {
        id: "create-registry",
        text: "createPageRegistry",
        explanation: "Converts your page configuration into a Playwright test object with generated fixtures.",
        lines: [1]
      }
    ],
    conceptTitle: "Automatic Fixture Generation",
    conceptSummary: "PW-Core compiles registry configuration into typed fixtures.",
    bottomExplanations: [
      "One fixture per configured page",
      "Fully typed",
      "Ready to extend"
    ]
  },
  {
    id: 2,
    heading: "Extend Generated Page",
    subtitle: "Add business logic by subclassing generated pages.",
    code: `class LoginPage extends registry.pages.loginPage {
  async login() {
    await this.fill("username", "admin");
    await this.fill("password", "password");
    await this.click("loginBtn");
  }
}`,
    highlights: [
      {
        id: "extends-keyword",
        text: "extends",
        explanation: "Your page inherits every generated locator and action automatically.",
        lines: [1]
      },
      {
        id: "login-method",
        text: "login()",
        explanation: "Business methods are built using generated actions.",
        lines: [2]
      },
      {
        id: "fill-action",
        text: "fill() / click()",
        explanation: "Uses pre-defined locators from the registry without repeating selectors.",
        lines: [3, 4, 5]
      }
    ],
    conceptTitle: "Subclass Generated Pages",
    conceptSummary: "Generated actions become reusable business methods.",
    bottomExplanations: [
      "Reuse generated methods",
      "Add business workflows",
      "No duplicated locators"
    ]
  },
  {
    id: 3,
    heading: "Override Generated Fixture",
    subtitle: "Replace the generated fixture.",
    code: `registry.extend({
  loginPage: LoginPage,
});`,
    highlights: [
      {
        id: "override-target",
        text: "loginPage:",
        explanation: "Replaces only the generated loginPage fixture. All other fixtures remain unchanged.",
        lines: [2]
      }
    ],
    conceptTitle: "Override Fixture",
    conceptSummary: "Replace only the generated fixture while preserving every other generated page.",
    bottomExplanations: [
      "Replace one fixture",
      "Everything else remains generated",
      "Minimal customization"
    ]
  },
  {
    id: 4,
    heading: "Multiple User Contexts",
    subtitle: "Create isolated authenticated fixtures.",
    code: `export const test = registry.extend({
  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: ".auth/admin.json",
    });
    await use(new AdminPage(await context.newPage()));
    await context.close();
  },

  customerPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: ".auth/customer.json",
    });
    await use(new CustomerPage(await context.newPage()));
    await context.close();
  },
});`,
    highlights: [
      {
        id: "browser-context",
        text: "browser.newContext()",
        explanation: "Creates a separate, isolated browser session.",
        lines: [3, 11]
      },
      {
        id: "storage-state-seed",
        text: "storageState",
        explanation: "Seeds cookies and local state to skip login pages.",
        lines: [4, 12]
      },
      {
        id: "await-use-call",
        text: "await use()",
        explanation: "Injects the authenticated page session into the test.",
        lines: [6, 14]
      }
    ],
    conceptTitle: "Multi-session Flows",
    conceptSummary: "Run multiple authenticated users inside one test.",
    bottomExplanations: [
      "Multiple users",
      "Independent browser contexts",
      "Ideal for approval/workflow scenarios"
    ]
  }
];
