export interface CliOption {
  flag: string;
  description: string;
}

export interface CliCommand {
  command: string;
  icon: string;
  purpose: string;
  options?: CliOption[];
}

export const CLI_COMMANDS: CliCommand[] = [
  {
    command: "npx pw-core init",
    icon: "rocket",
    purpose: "Create a new PW-Core project with the recommended structure."
  },
  {
    command: "npx pw-core codegen",
    icon: "video",
    purpose: "Record browser interactions and generate registry entries and tests.",
    options: [
      {
        flag: "--safe",
        description: "Avoids over-writing locators in registry"
      },
      {
        flag: "--url <url>",
        description: "Start from a specific page"
      }
    ]
  },
  {
    command: "npx playwright test",
    icon: "play",
    purpose: "Run tests using the standard Playwright runner.",
    options: [
      {
        flag: "--headed",
        description: "Show browser"
      },
      {
        flag: "--project chromium",
        description: "Run Chromium only"
      },
      {
        flag: "--grep @smoke",
        description: "Run tagged tests"
      },
      {
        flag: "--ui",
        description: "Open UI mode"
      },
      {
        flag: "--debug",
        description: "Launch Playwright Inspector"
      }
    ]
  }
];
