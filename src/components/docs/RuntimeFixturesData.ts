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
    heading: "Returned Test",
    subtitle: "createPageRegistry returns a Playwright-compatible test object.",
    code: `const home: PageConfig = {url: '/home', testId, selector}
const login: PageConfig = {url: '/login', textbox:['User'], button: ['Submit']}
export const test = createPageRegistry({ home, login });`,
    highlights: [
      {
        id: "create-registry",
        text: "createPageRegistry",
        explanation: "Returns a Playwright-compatible test object.",
        lines: [3]
      }
    ],
    conceptTitle: "Playwright-Compatible Test",
    conceptSummary: "Returns a Playwright-compatible test object.",
    bottomExplanations: [
      "Same Playwright API",
      "Fully typed",
      "Ready to use"
    ]
  },
  {
    id: 2,
    heading: "Write Tests",
    subtitle: "Write Playwright tests using the returned test object.",
    code: `test("Login", async ({ login }) => {
  await login.fill('User', 'name');
  await login.click('Submit');
});`,
    highlights: [
      {
        id: "use-fixtures",
        text: "login",
        explanation: "Use typed page fixtures directly in your Playwright test.",
        lines: [2, 3]
      }
    ],
    conceptTitle: "Typed Fixtures",
    conceptSummary: "Requested fixtures are available directly in the test function.",
    bottomExplanations: [
      "Keep tests focused",
      "Full type safety",
      "Standard Playwright syntax"
    ]
  }
];
