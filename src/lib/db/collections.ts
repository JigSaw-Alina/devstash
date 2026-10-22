import { cacheLife, cacheTag } from "next/cache";

import { getSystemItemTypes } from "@/lib/db/item-types";
import { prisma } from "@/lib/prisma";
import type { CollectionStats, CollectionSummary } from "@/types/collection";
import type { ItemTypeOption } from "@/types/item-type";

export const COLLECTIONS_CACHE_TAG = "collections";

// Auth is not implemented yet, so collections are scoped to the seeded demo user
const DEMO_USER_EMAIL = "demo@devstash.io";

export async function getRecentCollections(limit: number): Promise<CollectionSummary[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(COLLECTIONS_CACHE_TAG);

  const [collections, itemTypes] = await Promise.all([
    prisma.collection.findMany({
      where: { user: { email: DEMO_USER_EMAIL } },
      orderBy: { updatedAt: "desc" },
      take: limit,
      select: {
        id: true,
        name: true,
        description: true,
        isFavorite: true,
        items: { select: { typeId: true } },
      },
    }),
    getSystemItemTypes(),
  ]);

  const typesById = new Map(itemTypes.map((type) => [type.id, type]));

  return collections.map(({ items, ...collection }) => ({
    ...collection,
    itemCount: items.length,
    types: rankTypesByUsage(
      items.map((item) => item.typeId),
      typesById,
    ),
  }));
}

export async function getCollectionStats(): Promise<CollectionStats> {
  "use cache";
  cacheLife("minutes");
  cacheTag(COLLECTIONS_CACHE_TAG);

  const where = { user: { email: DEMO_USER_EMAIL } };
  const [total, favorites] = await Promise.all([
    prisma.collection.count({ where }),
    prisma.collection.count({ where: { ...where, isFavorite: true } }),
  ]);

  return { total, favorites };
}

function rankTypesByUsage(typeIds: string[], typesById: Map<string, ItemTypeOption>) {
  const counts = new Map<string, number>();
  for (const typeId of typeIds) {
    counts.set(typeId, (counts.get(typeId) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([typeId]) => typesById.get(typeId))
    .filter((type): type is ItemTypeOption => type !== undefined);
}
