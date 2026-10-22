import {
  Code,
  File,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

import { itemTypes, type ItemType } from "@/lib/mock-data";

const TYPE_ICONS: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link,
};

export function getTypeIcon(iconName: string): LucideIcon {
  return TYPE_ICONS[iconName] ?? File;
}

export function getItemType(typeId: string): ItemType | undefined {
  return itemTypes.find((type) => type.id === typeId);
}
