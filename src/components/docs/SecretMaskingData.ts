export interface BenefitCard {
  title: string;
  description: string;
}

export interface ReportStep {
  label: string;
  value: string;
  isSensitive?: boolean;
}

export const LOGIN_CODE = `await login.fill("username", user.username);

await login.fill(
  "password",
  process.env.DB_PASSWORD
);

await login.click("loginBtn");`;

export const REPORT_STATES = {
  without: [
    { label: "Fill username", value: "testuser" },
    { label: "Fill password", value: "MySecret123", isSensitive: true },
    { label: "Click loginBtn", value: "✓" }
  ] as ReportStep[],
  with: [
    { label: "Fill username", value: "testuser" },
    { label: "Fill password", value: "************", isSensitive: true },
    { label: "Click loginBtn", value: "✓" }
  ] as ReportStep[]
};
