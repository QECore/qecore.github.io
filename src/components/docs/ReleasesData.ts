export interface ReleaseHighlight {
  title: string;
  description: string;
}

export interface TicketDetail {
  number?: string;
  title: string;
  type: "Feature" | "Bugfix" | "Enhancement" | "Refactor" | string;
  area: string;
  description: string;
  exampleCode?: string;
}

export interface ReleaseVersion {
  version: string;
  date: string;
  isLatest?: boolean;
  tagline: string;
  highlights: ReleaseHighlight[];
  tickets: TicketDetail[];
}

export const RELEASES_DATA: ReleaseVersion[] = [
  {
    version: "v1.3.0",
    date: "2026-07-06",
    isLatest: true,
    tagline: "Introduces PW-Core CODEGEN: Interactive browser recording, automatic page object generation, and expanded role selectors.",
    highlights: [
      {
        title: "Interactive Codegen CLI",
        description: "Launch an interactive browser session via `npx pw-core codegen` to record your actions and automatically generate test specs."
      },
      {
        title: "Smart Registry Reuse",
        description: "Reuses existing registry selectors instead of recreating locator structures, reducing test maintenance overhead."
      },
      {
        title: "Automatic Page Object Creation",
        description: "Dynamically tracks URL changes during recording, building and registering unique page objects automatically."
      },
      {
        title: "ARIA Role Native Support",
        description: "First-class support for semantic accessibility roles (e.g. text, button, checkbox, heading, link) in your locator registry."
      }
    ],
    tickets: [
      {
        number: "#17",
        title: "Interactive Playwright Codegen CLI",
        type: "Feature",
        area: "Codegen Engine",
        description: "Allows test authors to launch a browser recorder that updates configuration files and builds code on the fly.",
        exampleCode: "npx pw-core codegen\n# Launches recorder and monitors your click/type events"
      },
      {
        number: "#18",
        title: "Smart Registry Selector Matching",
        type: "Enhancement",
        area: "Locator Resolvers",
        description: "Codegen automatically looks up already existing selectors in the registry config to prevent duplicate locator keys."
      },
      {
        number: "#19",
        title: "Automated Screen Boundaries Detection",
        type: "Feature",
        area: "Router/Registry",
        description: "Detects domain transitions and dynamically creates page class representations in your local directories."
      }
    ]
  },
  {
    version: "v1.2.0",
    date: "2026-06-26",
    tagline: "Significant enhancements to test reporting, framework transparency, dynamic configuration support, and table validation features.",
    highlights: [
      {
        title: "IntelliSense Dynamic Selectors",
        description: "Generate multi-variable dynamic selectors on the fly while retaining full editor auto-complete suggestions."
      },
      {
        title: "Zero-Code Test Step Documentation",
        description: "Wraps and documents custom page methods automatically inside Playwright HTML reports through prototype reflection."
      },
      {
        title: "Stack-Trace Cleanups",
        description: "Filters framework file references from logs, pointing failure traces directly back to your E2E spec files."
      }
    ],
    tickets: [
      {
        number: "#14",
        title: "Create Flexible Dynamic Elements on the Fly with Auto-Complete Support",
        type: "Feature",
        area: "Page Configs",
        description: "Allows elements defined with dynamic variables (e.g., `{status}{id}Chart`) to fully resolve and auto-complete in your IDE.",
        exampleCode: `import { createPageConfig } from 'pw-core/page';\n\nexport const config = createPageConfig({\n  testIds: {\n    "{status}{id}Chart": {\n      status: ["active", "inactive"] as const,\n      id: ["Line", "Bar"] as const,\n      testId: "chart-{status}-{id}"\n    }\n  }\n});\n\n// IDE auto-completes: activeLineChart, activeBarChart, etc.\nawait page.verify("activeLineChart");`
      },
      {
        number: "#15",
        title: "Automatically Document Test Actions in HTML Reports",
        type: "Feature",
        area: "Reporting",
        description: "Intercepts page actions and wraps them in Playwright test step blocks without manual step statements.",
        exampleCode: `// Automatically shows as step: "login.login()"\nawait login.login();`
      },
      {
        number: "#16",
        title: "Filter Framework Internal Stack Traces",
        type: "Enhancement",
        area: "Logger",
        description: "Intercepts and cleanses system stack traces so you see exactly which line of your test spec file failed."
      }
    ]
  },
  {
    version: "v1.1.0",
    date: "2026-06-21",
    tagline: "The initial core package release of the pw-core framework including typed page registries, chained selectors, and tables.",
    highlights: [
      {
        title: "Zero-Boilerplate Auto-Fixtures",
        description: "Registers page objects automatically as test arguments, avoiding manual instantiation in test files."
      },
      {
        title: "Fluent Direct Verifications",
        description: "Perform assertions directly on page objects rather than wrapping element locators inside nested check calls."
      },
      {
        title: "Dot-Notation Element Chaining",
        description: "Easy targeting of nested elements inside containers by providing dot-paths like `modal.form.submit`."
      },
      {
        title: "HTML Table-to-Data Mapper",
        description: "Parse visual HTML table grid columns and rows into typed, easily searchable arrays of JavaScript objects."
      }
    ],
    tickets: [
      {
        number: "#7",
        title: "Standard Template to Build and Organize Screen Objects",
        type: "Feature",
        area: "Page Objects",
        description: "Provides the standard Screen Object pattern to separate selectors and test logic."
      },
      {
        number: "#8",
        title: "Automatically Inject Screens into Tests",
        type: "Feature",
        area: "Test Fixtures",
        description: "Integrates screen registry directly with Playwright test arguments."
      },
      {
        number: "#10",
        title: "Find Nested Elements Using Dot Notation",
        type: "Feature",
        area: "Element Locators",
        description: "Enables accessing child component locators using clean dot-path lookups."
      },
      {
        number: "#11",
        title: "Read Grid and Table Data as Structured Lists",
        type: "Feature",
        area: "Table Component",
        description: "Integrates clean mapping helper to read HTML table values instantly.",
        exampleCode: `// Map standard tables to structured records\nconst data = await usersTable.getRowsData();`
      }
    ]
  }
];
