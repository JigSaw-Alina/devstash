import DashboardShell from "@/components/dashboard/DashboardShell";
import { getSidebarCollections } from "@/lib/db/collections";
import { getItemCountsByType } from "@/lib/db/items";
import { getSystemItemTypes } from "@/lib/db/item-types";

const SIDEBAR_RECENT_COLLECTIONS_LIMIT = 5;

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const [itemTypes, itemCountsByType, collections] = await Promise.all([
    getSystemItemTypes(),
    getItemCountsByType(),
    getSidebarCollections(SIDEBAR_RECENT_COLLECTIONS_LIMIT),
  ]);

  return (
    <DashboardShell
      itemTypes={itemTypes}
      itemCountsByType={itemCountsByType}
      collections={collections}
    >
      {children}
    </DashboardShell>
  );
}
