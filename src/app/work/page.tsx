import type { Metadata } from "next";
import { projects } from "@/lib/content";
import { ProjectViewer } from "@/components/work/ProjectViewer";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <ProjectViewer projects={projects} />
    </main>
  );
}
