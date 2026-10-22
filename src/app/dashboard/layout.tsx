import DashboardShell from "@/components/dashboard/DashboardShell";
import { getSystemItemTypes } from "@/lib/db/item-types";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const itemTypes = await getSystemItemTypes();

  return <DashboardShell itemTypes={itemTypes}>{children}</DashboardShell>;
}
