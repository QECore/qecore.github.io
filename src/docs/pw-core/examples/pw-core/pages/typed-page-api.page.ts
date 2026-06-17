import { Page } from "@playwright/test";
import { TypedPage, createPageConfig } from "pw-core/page";

const config = createPageConfig({
  url: "/settings",
  testIds: {
    logoToggle: "logo-toggle",
  },
});

export class SettingsPage extends TypedPage<typeof config> {
  constructor(page: Page) {
    super(page, config);
  }

  async toggleLogo() {
    await this.click("logoToggle");
  }
}
