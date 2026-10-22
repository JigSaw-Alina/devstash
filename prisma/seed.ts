import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const DEMO_USER = {
  email: "demo@devstash.io",
  name: "Demo User",
  password: "12345678",
};

const SYSTEM_ITEM_TYPES = [
  { name: "snippet", icon: "Code", color: "#3b82f6" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", icon: "Terminal", color: "#f97316" },
  { name: "note", icon: "StickyNote", color: "#fde047" },
  { name: "file", icon: "File", color: "#6b7280" },
  { name: "image", icon: "Image", color: "#ec4899" },
  { name: "link", icon: "Link", color: "#10b981" },
];

interface SeedItem {
  type: "snippet" | "prompt" | "command" | "link";
  title: string;
  description: string;
  content?: string;
  url?: string;
  language?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
}

interface SeedCollection {
  name: string;
  description: string;
  isFavorite?: boolean;
  items: SeedItem[];
}

const COLLECTIONS: SeedCollection[] = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    isFavorite: true,
    items: [
      {
        type: "snippet",
        title: "useDebounce & useLocalStorage hooks",
        description: "Debounce a changing value and persist state to localStorage",
        language: "typescript",
        isPinned: true,
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
      },
      {
        type: "snippet",
        title: "Context provider & compound components",
        description: "Typed context provider with a compound Tabs component",
        language: "typescript",
        isFavorite: true,
        content: `import { createContext, useContext, useState, type ReactNode } from "react";

interface TabsContextValue {
  active: string;
  setActive: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used inside <Tabs>");
  return context;
}

export function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultTab);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

Tabs.Trigger = function TabsTrigger({ id, children }: { id: string; children: ReactNode }) {
  const { active, setActive } = useTabs();
  return (
    <button aria-selected={active === id} onClick={() => setActive(id)}>
      {children}
    </button>
  );
};

Tabs.Panel = function TabsPanel({ id, children }: { id: string; children: ReactNode }) {
  const { active } = useTabs();
  return active === id ? <div>{children}</div> : null;
};`,
      },
      {
        type: "snippet",
        title: "Utility functions",
        description: "cn class merger, sleep and formatBytes helpers",
        language: "typescript",
        content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return \`\${(bytes / 1024 ** index).toFixed(decimals)} \${units[index]}\`;
}`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    isFavorite: true,
    items: [
      {
        type: "prompt",
        title: "Code review prompt",
        description: "Thorough review focused on bugs, security and readability",
        isPinned: true,
        content: `You are a senior software engineer reviewing a pull request.

Review the code below and report:
1. Bugs and logic errors (with the failing input or state)
2. Security issues (auth, input validation, injection)
3. Performance problems
4. Readability and naming improvements

Rank findings by severity. For each, quote the line and suggest a fix.

\`\`\`
{{code}}
\`\`\``,
      },
      {
        type: "prompt",
        title: "Documentation generator",
        description: "Generate README-style docs for a module",
        content: `Write developer documentation for the following module.

Include:
- A one-paragraph overview of what it does
- Installation / setup steps
- A table of exported functions with parameters and return types
- Two short usage examples
- Known limitations

Use Markdown. Keep it concise.

\`\`\`
{{code}}
\`\`\``,
      },
      {
        type: "prompt",
        title: "Refactoring assistant",
        description: "Refactor code without changing behavior",
        isFavorite: true,
        content: `Refactor the code below to improve readability and maintainability.

Rules:
- Do not change external behavior or public APIs
- Prefer small, well-named functions
- Remove duplication
- Keep the existing style and conventions

Return the refactored code, then a bullet list explaining each change.

\`\`\`
{{code}}
\`\`\``,
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    items: [
      {
        type: "snippet",
        title: "GitHub Actions CI for Next.js",
        description: "Install, lint and build on every push and pull request",
        language: "yaml",
        content: `name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run build`,
      },
      {
        type: "command",
        title: "Deploy with migrations",
        description: "Apply Prisma migrations, then deploy to Vercel production",
        language: "bash",
        content: `npx prisma migrate deploy && npx vercel deploy --prod`,
      },
      {
        type: "link",
        title: "Docker documentation",
        description: "Official Docker docs and guides",
        url: "https://docs.docker.com/",
      },
      {
        type: "link",
        title: "GitHub Actions documentation",
        description: "Workflow syntax, runners and actions reference",
        url: "https://docs.github.com/en/actions",
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    items: [
      {
        type: "command",
        title: "Undo last commit (keep changes)",
        description: "Move HEAD back one commit and keep the changes staged",
        language: "bash",
        isPinned: true,
        content: `git reset --soft HEAD~1`,
      },
      {
        type: "command",
        title: "Clean up Docker",
        description: "Remove stopped containers, unused images, networks and build cache",
        language: "bash",
        content: `docker system prune -a`,
      },
      {
        type: "command",
        title: "Kill process on a port",
        description: "Find and kill whatever is listening on port 3000",
        language: "bash",
        isFavorite: true,
        content: `lsof -ti :3000 | xargs kill -9`,
      },
      {
        type: "command",
        title: "Check outdated packages",
        description: "List outdated npm dependencies",
        language: "bash",
        content: `npm outdated`,
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    items: [
      {
        type: "link",
        title: "Tailwind CSS docs",
        description: "Utility classes and v4 configuration reference",
        url: "https://tailwindcss.com/docs",
      },
      {
        type: "link",
        title: "shadcn/ui",
        description: "Accessible, copy-paste React components",
        url: "https://ui.shadcn.com/",
        isFavorite: true,
      },
      {
        type: "link",
        title: "Material Design 3",
        description: "Google's open-source design system",
        url: "https://m3.material.io/",
      },
      {
        type: "link",
        title: "Lucide icons",
        description: "Open-source icon library used across DevStash",
        url: "https://lucide.dev/icons/",
      },
    ],
  },
];

async function seedItemTypes() {
  const typeIds: Record<string, string> = {};

  for (const type of SYSTEM_ITEM_TYPES) {
    // System types have a null userId, so look them up by name rather than upserting on the unique key
    const existing = await prisma.itemType.findFirst({
      where: { name: type.name, isSystem: true, userId: null },
    });

    const saved = existing
      ? await prisma.itemType.update({ where: { id: existing.id }, data: type })
      : await prisma.itemType.create({ data: { ...type, isSystem: true } });

    typeIds[type.name] = saved.id;
  }

  return typeIds;
}

async function seedDemoUser() {
  const password = await bcrypt.hash(DEMO_USER.password, 12);
  const data = { name: DEMO_USER.name, password, isPro: false, emailVerified: new Date() };

  return prisma.user.upsert({
    where: { email: DEMO_USER.email },
    update: data,
    create: { email: DEMO_USER.email, ...data },
  });
}

async function seedCollections(userId: string, typeIds: Record<string, string>) {
  // Start from a clean slate so the seed can be re-run
  await prisma.item.deleteMany({ where: { userId } });
  await prisma.collection.deleteMany({ where: { userId } });

  for (const { items, ...collection } of COLLECTIONS) {
    await prisma.collection.create({
      data: {
        ...collection,
        userId,
        items: {
          create: items.map(({ type, ...item }) => ({
            ...item,
            contentType: "text",
            userId,
            typeId: typeIds[type],
          })),
        },
      },
    });
  }
}

async function main() {
  const typeIds = await seedItemTypes();
  const user = await seedDemoUser();
  await seedCollections(user.id, typeIds);

  const itemCount = COLLECTIONS.reduce((total, collection) => total + collection.items.length, 0);
  console.log(
    `Seeded ${SYSTEM_ITEM_TYPES.length} item types, user ${user.email}, ` +
      `${COLLECTIONS.length} collections and ${itemCount} items`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
