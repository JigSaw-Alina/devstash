import type { ItemTypeOption } from "@/types/item-type";

export interface ItemSummary {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: Date;
  tags: string[];
  type: ItemTypeOption | undefined;
}

export interface ItemStats {
  total: number;
  favorites: number;
}
