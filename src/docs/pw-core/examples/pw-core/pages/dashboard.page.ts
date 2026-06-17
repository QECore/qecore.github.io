import { Page } from "@playwright/test";
import { TypedPage, createPageConfig } from "pw-core/page";
import { Table } from "pw-core/component/table";

// Define different interfaces matching the table components
export interface Project {
  id: string;
  title: string;
  status: "Active" | "Paused" | "Deleted";
  priority: "High" | "Medium" | "Low";
  progress: string;
  dueDate: string;
  tags: string;
}

export interface Task {
  id: string;
  title: string;
  project: string;
  status: "In Progress" | "To Do" | "Done";
  priority: "Critical" | "High" | "Medium" | "Low";
  assignee: string;
  dueDate: string;
  description: string;
}

// Page configuration with multiple table test IDs
const config = createPageConfig({
  url: "/dashboard",
  testIds: {
    projectsTable: "projects-table",
    tasksTable: "tasks-table",
    title: "project-title",
  },
});

export class DashboardPage extends TypedPage<typeof config> {
  // Define strongly-typed Table components
  projects = new Table<Project>(this.locator("projectsTable"));
  tasks = new Table<Task>(this.locator("tasksTable"));

  constructor(page: Page) {
    super(page, config);
  }

  // Showcase custom methods leveraging the inbuilt table helpers
  async getActiveProjects() {
    const projectsCollection = await this.projects.get();
    // Type-safe retrieval of all rows matching a specific criteria
    return projectsCollection.getAll("status", "Active");
  }

  async getCriticalTasks() {
    const tasksCollection = await this.tasks.get();
    return tasksCollection.getAll("priority", "Critical");
  }

  async getProjectByName(title: string) {
    const projectsCollection = await this.projects.get();
    // Type-safe finder for a single row
    return projectsCollection.get("title", title);
  }
}
