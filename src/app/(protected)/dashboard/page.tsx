import type { Metadata } from "next";
import { DashboardView } from "@/components/posts";

export const metadata: Metadata = {
  title: "Dashboard — Blog Post",
};

export default function DashboardPage() {
  return <DashboardView />;
}
