export const shadows = {
  none: "none",
  sm: "0 1px 2px rgba(0, 0, 0, 0.4)",
  md: "0 4px 12px rgba(0, 0, 0, 0.5)",
  lg: "0 12px 40px rgba(0, 0, 0, 0.8)",
  glow: "0 0 15px rgba(245, 158, 11, 0.2)",
} as const;

export type ShadowToken = keyof typeof shadows;
