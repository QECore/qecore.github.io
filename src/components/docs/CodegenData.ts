export interface FeaturePill {
  label: string;
  iconName: "Tag" | "Shield" | "RefreshCw" | "BookOpen" | "FilePlus" | "PlayCircle";
}

export const FEATURE_PILLS: FeaturePill[] = [
  { label: "Descriptive locator keys", iconName: "Tag" },
  { label: "Prioritizes stable locators", iconName: "Shield" },
  { label: "Reuses existing locators", iconName: "RefreshCw" },
  { label: "Updates page registries", iconName: "BookOpen" },
  { label: "Automatically creates pages", iconName: "FilePlus" },
  { label: "Continues previous recordings", iconName: "PlayCircle" },
];

export interface OutputItem {
  label: string;
  iconName: "FileText" | "Layers" | "TestTube";
}

export const OUTPUT_ITEMS: OutputItem[] = [
  { label: "Page Registry", iconName: "FileText" },
  { label: "Page Objects", iconName: "Layers" },
  { label: "Tests", iconName: "TestTube" },
];
