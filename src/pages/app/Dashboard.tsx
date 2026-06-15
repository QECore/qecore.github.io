import * as React from "react";
import { useState, useEffect } from "react";
import { client } from "@/api/client";
import { BarChart3, FolderKanban, ListChecks, FileText, Clock } from "lucide-react";
import SkeuCard from "../../components/shared/SkueCard";
import StatusBadge from "../../components/shared/StatusBadge";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      client.entities.Project.list(),
      client.entities.Task.list(),
      client.entities.Activity.list("-created_date", 5),
      client.entities.Document.list(),
    ]).then(([p, t, a, d]) => {
      setProjects(p);
      setTasks(t);
      setActivities(a);
      setDocuments(d);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-muted border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  const kpis = [
    { label: "Projects", value: projects.length, icon: FolderKanban, color: "text-blue-500" },
    { label: "Tasks", value: tasks.length, icon: ListChecks, color: "text-emerald-500" },
    { label: "Documents", value: documents.length, icon: FileText, color: "text-violet-500" },
    { label: "Active", value: projects.filter(p => p.status === "active").length, icon: BarChart3, color: "text-amber-500" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your workspace</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <SkeuCard key={kpi.label}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">{kpi.label}</p>
                <p className="font-heading font-bold text-2xl mt-1">{kpi.value}</p>
              </div>
              <div className="skeu-inset w-14 h-14 flex items-center justify-center">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>
          </SkeuCard>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div>
          <h2 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            Recent Activity
          </h2>
          <SkeuCard className="p-0 divide-y divide-border">
            {activities.length === 0 ? (
              <p className="text-sm text-muted-foreground p-4 text-center">No recent activity</p>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="px-4 py-3 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{act.action} — {act.entity_name || act.entity_type}</p>
                    {act.details && <p className="text-xs text-muted-foreground mt-0.5">{act.details}</p>}
                  </div>
                </div>
              ))
            )}
          </SkeuCard>
        </div>

        {/* Recent Tasks */}
        <div>
          <h2 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-muted-foreground" />
            Tasks
          </h2>
          <SkeuCard className="p-0 divide-y divide-border">
            {tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground p-4 text-center">No tasks yet</p>
            ) : (
              tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="px-4 py-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-medium truncate">{task.title}</p>
                  <StatusBadge status={task.status} />
                </div>
              ))
            )}
            {tasks.length > 5 && (
              <Link to="/app/tasks" className="block px-4 py-2.5 text-xs text-accent font-medium hover:bg-muted/30 transition-colors text-center">
                View all tasks →
              </Link>
            )}
          </SkeuCard>
        </div>
      </div>
    </div>
  );
}