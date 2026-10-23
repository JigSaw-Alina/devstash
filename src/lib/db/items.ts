import { cacheLife, cacheTag } from "next/cache";

import { getSystemItemTypes } from "@/lib/db/item-types";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import type { ItemStats, ItemSummary } from "@/types/item";

export const ITEMS_CACHE_TAG = "items";

// Auth is not implemented yet, so items are scoped to the seeded demo user
const DEMO_USER_EMAIL = "demo@devstash.io";

const ITEM_SUMMARY_SELECT = {
  id: true,
  title: true,
  description: true,
  isFavorite: true,
  isPinned: true,
  createdAt: true,
  typeId: true,
  tags: { select: { tag: { select: { name: true } } } },
} satisfies Prisma.ItemSelect;

export async function getPinnedItems(): Promise<ItemSummary[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(ITEMS_CACHE_TAG);

  return findItems({
    where: { user: { email: DEMO_USER_EMAIL }, isPinned: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getRecentItems(limit: number): Promise<ItemSummary[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(ITEMS_CACHE_TAG);

  return findItems({
    where: { user: { email: DEMO_USER_EMAIL } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getItemStats(): Promise<ItemStats> {
  "use cache";
  cacheLife("minutes");
  cacheTag(ITEMS_CACHE_TAG);

  const where = { user: { email: DEMO_USER_EMAIL } };
  const [total, favorites] = await Promise.all([
    prisma.item.count({ where }),
    prisma.item.count({ where: { ...where, isFavorite: true } }),
  ]);

  return { total, favorites };
}

async function findItems(args: Omit<Prisma.ItemFindManyArgs, "select">): Promise<ItemSummary[]> {
  const [items, itemTypes] = await Promise.all([
    prisma.item.findMany({ ...args, select: ITEM_SUMMARY_SELECT }),
    getSystemItemTypes(),
  ]);

  const typesById = new Map(itemTypes.map((type) => [type.id, type]));

  return items.map(({ typeId, tags, ...item }) => ({
    ...item,
    tags: tags.map(({ tag }) => tag.name),
    type: typesById.get(typeId),
  }));
}
