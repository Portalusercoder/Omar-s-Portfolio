"use client";

import { MenuProvider } from "@/components/nav/MenuContext";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MenuProvider>
      <SmoothScroll>{children}</SmoothScroll>
    </MenuProvider>
  );
}
