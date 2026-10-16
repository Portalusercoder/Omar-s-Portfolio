import type { Metadata } from "next";
import { projects } from "@/lib/content";
import { WorkBoard } from "@/components/studio/WorkBoard";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <main className="flex-1 px-5 pb-8 md:px-8">
      <WorkBoard projects={projects} />
    </main>
  );
}
