export interface HomeSection {
  id: string;
  label: string;
  category: string;
}

export const homeSections: HomeSection[] = [
  { id: "introduction", label: "INTRODUCTION", category: "INTRODUCTION" },
  { id: "problems", label: "THE PROBLEMS", category: "THE PROBLEMS" },
  { id: "solution", label: "THE SOLUTION", category: "THE SOLUTION" },
  { id: "beforeAfter", label: "BEFORE & AFTER", category: "BEFORE & AFTER" },
  { id: "scaling", label: "SCALING SIMULATOR", category: "SCALING SIMULATOR" },
];
