import { projects } from "@/lib/content";
import { ProjectViewer } from "@/components/work/ProjectViewer";

export default function Home() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <ProjectViewer projects={projects} />
    </main>
  );
}
