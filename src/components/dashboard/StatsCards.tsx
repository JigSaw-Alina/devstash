import { Folder, FolderHeart, Layers, Star, type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { collections, items } from "@/lib/mock-data";

interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
}

export default function StatsCards() {
  const stats: Stat[] = [
    { label: "Items", value: items.length, icon: Layers },
    { label: "Collections", value: collections.length, icon: Folder },
    { label: "Favorite Items", value: items.filter((i) => i.isFavorite).length, icon: Star },
    {
      label: "Favorite Collections",
      value: collections.filter((c) => c.isFavorite).length,
      icon: FolderHeart,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label}>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-2xl font-semibold">{value}</p>
            </div>
            <Icon className="size-5 text-muted-foreground" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
