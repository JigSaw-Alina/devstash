import { cacheLife, cacheTag } from "next/cache";

import { prisma } from "@/lib/prisma";
import type { ItemTypeOption } from "@/types/item-type";

export const ITEM_TYPES_CACHE_TAG = "item-types";

const SYSTEM_TYPE_ORDER = ["snippet", "prompt", "command", "note", "file", "image", "link"];

function toPlural(name: string) {
  return `${name}s`;
}

function toLabel(name: string) {
  const plural = toPlural(name);
  return plural.charAt(0).toUpperCase() + plural.slice(1);
}

export async function getSystemItemTypes(): Promise<ItemTypeOption[]> {
  "use cache";
  cacheLife("days");
  cacheTag(ITEM_TYPES_CACHE_TAG);

  const types = await prisma.itemType.findMany({
    where: { isSystem: true, userId: null },
    select: { id: true, name: true, icon: true, color: true },
  });

  return types
    .sort((a, b) => SYSTEM_TYPE_ORDER.indexOf(a.name) - SYSTEM_TYPE_ORDER.indexOf(b.name))
    .map((type) => ({
      ...type,
      label: toLabel(type.name),
      slug: toPlural(type.name),
    }));
}
