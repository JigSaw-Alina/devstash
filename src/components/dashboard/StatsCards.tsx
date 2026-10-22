import { Folder, FolderHeart, Layers, Star, type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { items } from "@/lib/mock-data";
import type { CollectionStats } from "@/types/collection";

interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
}

interface StatsCardsProps {
  collectionStats: CollectionStats;
}

export default function StatsCards({ collectionStats }: StatsCardsProps) {
  const stats: Stat[] = [
    { label: "Items", value: items.length, icon: Layers },
    { label: "Collections", value: collectionStats.total, icon: Folder },
    { label: "Favorite Items", value: items.filter((i) => i.isFavorite).length, icon: Star },
    { label: "Favorite Collections", value: collectionStats.favorites, icon: FolderHeart },
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
