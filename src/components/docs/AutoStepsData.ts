export interface ReportStep {
  name: string;
  duration: string;
}

export const TRANSFORMATION = {
  panel1: {
    title: "Manual - Playwright's test.step()",
    code: `test.step("Login", async () => {
    ...
});

test.step("Open - transactions", async () => {
    ...
});

test.step("Toggle Logo - enable", async () => {
    ...
});`
  },
  panel2: {
    title: "Your Test",
    code: `await login.login();



await sidebar.open("transactions");



await settings.toggleLogo("enable");`
  },
  panel3: {
    title: "Generated HTML Report",
    steps: [
      { name: "Login", duration: "420ms" },
      { name: "Open - Transaction", duration: "180ms" },
      { name: "Toggle Logo - enable", duration: "110ms" },
    ] as ReportStep[]
  }
};

export const CHIPS = [
  "No wrappers",
  "Parameters included",
  "Always synchronized"
];
