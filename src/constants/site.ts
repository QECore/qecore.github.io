export const HEADERS = ["pw-core", "k6-core"] as const;

export type HeaderType = (typeof HEADERS)[number];

export const SITE = {
  name: "QECore",
  products: {
    "pw-core": {
      label: "PW-Core",
      accent: "amber" as const,
      docsPath: "/pw-core/docs",
      homePath: "/pw-core",
    },
    "k6-core": {
      label: "K6-Core",
      accent: "indigo" as const,
      docsPath: "/k6-core/docs",
      homePath: "/k6-core",
    },
  },
} as const;

export const WORKSPACES = [
  { label: "QA Workspace", path: "/workspace" },
  { label: "App", path: "/app" },
  { label: "Playground", path: "/playground" },
  { label: "Swagger", path: "/swagger" },
] as const;
