import { MoreHorizontal, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import TypeIcon from "@/components/dashboard/TypeIcon";
import { getItemType } from "@/lib/item-types";
import type { Collection } from "@/lib/mock-data";

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const types = collection.typeIds
    .map(getItemType)
    .filter((type) => type !== undefined);
  const accentColor = types[0]?.color;

  return (
    <Card className="border-l-4" style={{ borderLeftColor: accentColor }}>
      <CardContent className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{collection.name}</h3>
              {collection.isFavorite && <Star className="size-4 fill-yellow-400 text-yellow-400" />}
            </div>
            <p className="text-sm text-muted-foreground">{collection.itemCount} items</p>
          </div>
          <button
            type="button"
            aria-label={`${collection.name} options`}
            className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground">{collection.description}</p>
        <div className="flex items-center gap-2">
          {types.map((type) => (
            <TypeIcon key={type.id} icon={type.icon} color={type.color} className="size-4" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
