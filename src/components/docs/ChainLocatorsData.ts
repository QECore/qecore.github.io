// ── Registry code (remain exactly as it is) ──────────────────────────────────
export const REGISTRY_CODE = `const config = createPageConfig({
  dashboard: {
    selectors: {
      container: ".container",
      badge: "#badge",
      "{item}{status}": {
        item: ["chart", "table"],
        status: ["active", "inactive"],
        selector: ".component-status-item",
      },
    },
    textArea: ['Enter your text here']
  },
});`;

// ── Existing nested chain() code example (remain exactly as it is) ───────────
// We highlight the chain string itself inside the code blocks.
export const NESTED_CHAIN_CODE = `dashboard.chain("container.chartActive").isEnabled()


dashboard.chain("tableActive.badge").verify()


dashboard.chain("container.chartInactive.badge").click()`;
