import { Page, Locator } from "@playwright/test";


// Define different interfaces matching the table components
// NOTE: These interfaces are identical to the ones in pw-core's dashboard.page.ts
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

/**
 * ---------------------------------
 * 
 * 
 * PAGE CLASS BELOW
 * 
 * 
 * ---------------------------------
 */

export class DashboardPage {
  page: Page;
  projectsTable: Locator;
  tasksTable: Locator;
  title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectsTable = this.page.getByTestId("projects-table");
    this.tasksTable = this.page.getByTestId("tasks-table");
    this.title = this.page.getByTestId("project-title");
  }

  // Same functionality as pw-core, using traditional Playwright selectors/parsing
  async getActiveProjects(): Promise<Project[]> {
    const rows = this.projectsTable.locator("tbody tr");
    const count = await rows.count();
    const result: Project[] = [];
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const cells = row.locator("td");
      result.push({
        id: await cells.nth(0).innerText(),
        title: await cells.nth(1).innerText(),
        status: (await cells.nth(2).innerText()) as Project["status"],
        priority: (await cells.nth(3).innerText()) as Project["priority"],
        progress: await cells.nth(4).innerText(),
        dueDate: await cells.nth(5).innerText(),
        tags: await cells.nth(6).innerText(),
      });
    }
    return result.filter((p) => p.status === "Active");
  }

  async getCriticalTasks(): Promise<Task[]> {
    const rows = this.tasksTable.locator("tbody tr");
    const count = await rows.count();
    const result: Task[] = [];
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const cells = row.locator("td");
      result.push({
        id: await cells.nth(0).innerText(),
        title: await cells.nth(1).innerText(),
        project: await cells.nth(2).innerText(),
        status: (await cells.nth(3).innerText()) as Task["status"],
        priority: (await cells.nth(4).innerText()) as Task["priority"],
        assignee: await cells.nth(5).innerText(),
        dueDate: await cells.nth(6).innerText(),
        description: await cells.nth(7).innerText(),
      });
    }
    return result.filter((t) => t.priority === "Critical");
  }

  async getProjectByName(title: string): Promise<Project | undefined> {
    const rows = this.projectsTable.locator("tbody tr");
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const cells = row.locator("td");
      const currentTitle = await cells.nth(1).innerText();
      if (currentTitle === title) {
        return {
          id: await cells.nth(0).innerText(),
          title: currentTitle,
          status: (await cells.nth(2).innerText()) as Project["status"],
          priority: (await cells.nth(3).innerText()) as Project["priority"],
          progress: await cells.nth(4).innerText(),
          dueDate: await cells.nth(5).innerText(),
          tags: await cells.nth(6).innerText(),
        };
      }
    }
    return undefined;
  }
}
