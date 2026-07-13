import { Outlet } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Header } from "@/components/navigation/Header";

export default function AppLayout() {
  return (
    <PageLayout>
      <Header />
      <main className="flex-1 min-h-0">
        <Outlet />
      </main>
    </PageLayout>
  );
}
