import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const DEMO_EMAIL = "demo@devstash.io";
const DEMO_PASSWORD = "12345678";

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
    include: {
      collections: {
        orderBy: { name: "asc" },
        include: { items: { include: { type: true }, orderBy: { title: "asc" } } },
      },
    },
  });

  if (!user) throw new Error(`Demo user ${DEMO_EMAIL} not found — run "npx prisma db seed"`);

  const passwordOk = user.password ? await bcrypt.compare(DEMO_PASSWORD, user.password) : false;
  console.log(`User: ${user.name} <${user.email}>`);
  console.log(`  isPro: ${user.isPro} | emailVerified: ${user.emailVerified?.toISOString()}`);
  console.log(`  password check: ${passwordOk ? "OK" : "FAILED"}\n`);

  const types = await prisma.itemType.findMany({
    where: { isSystem: true },
    include: { _count: { select: { items: true } } },
    orderBy: { name: "asc" },
  });
  console.log("System item types:");
  console.table(
    types.map((t) => ({ name: t.name, icon: t.icon, color: t.color, items: t._count.items })),
  );

  for (const collection of user.collections) {
    const favorite = collection.isFavorite ? " ★" : "";
    console.log(`\n${collection.name}${favorite} — ${collection.description}`);
    for (const item of collection.items) {
      const flags = [item.isPinned && "pinned", item.isFavorite && "favorite"].filter(Boolean);
      const detail = item.url ?? item.language ?? "";
      console.log(
        `  [${item.type.name}] ${item.title}${detail ? ` (${detail})` : ""}` +
          `${flags.length ? ` {${flags.join(", ")}}` : ""}`,
      );
    }
  }

  const itemCount = user.collections.reduce((total, c) => total + c.items.length, 0);
  console.log(
    `\nTotals: ${types.length} system types, ${user.collections.length} collections, ${itemCount} items`,
  );

  if (!passwordOk) process.exitCode = 1;
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
