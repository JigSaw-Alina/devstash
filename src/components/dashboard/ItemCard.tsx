import { Pin, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import TypeIcon from "@/components/dashboard/TypeIcon";
import { getItemType } from "@/lib/item-types";
import type { Item } from "@/lib/mock-data";

interface ItemCardProps {
  item: Item;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function ItemCard({ item }: ItemCardProps) {
  const type = getItemType(item.typeId);

  return (
    <Card className="border-l-4" style={{ borderLeftColor: type?.color }}>
      <CardContent className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
          <TypeIcon icon={type?.icon ?? "File"} color={type?.color} className="size-5" />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium">{item.title}</h3>
            {item.isPinned && <Pin className="size-3.5 shrink-0 text-muted-foreground" />}
            {item.isFavorite && <Star className="size-4 shrink-0 fill-yellow-400 text-yellow-400" />}
          </div>
          <p className="text-sm text-muted-foreground">{item.description}</p>
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">{formatDate(item.createdAt)}</span>
      </CardContent>
    </Card>
  );
}
