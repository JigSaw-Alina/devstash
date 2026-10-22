import type { ItemTypeOption } from "@/types/item-type";

export interface CollectionSummary {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  // Types present in the collection, most-used first
  types: ItemTypeOption[];
}

export interface CollectionStats {
  total: number;
  favorites: number;
}
