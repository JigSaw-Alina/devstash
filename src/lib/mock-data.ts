export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  itemCount: number;
  typeIds: string[];
}

export interface Item {
  id: string;
  title: string;
  description: string;
  contentType: "text" | "file";
  content: string | null;
  url: string | null;
  language: string | null;
  typeId: string;
  collectionId: string | null;
  tags: string[];
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: string;
}

export const currentUser: User = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  image: null,
  isPro: false,
};

export const collections: Collection[] = [
  {
    id: "react-patterns",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemCount: 12,
    typeIds: ["snippet", "note", "link"],
  },
  {
    id: "python-snippets",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 8,
    typeIds: ["snippet", "note"],
  },
  {
    id: "context-files",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    itemCount: 5,
    typeIds: ["file", "note"],
  },
  {
    id: "interview-prep",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    itemCount: 24,
    typeIds: ["note", "snippet", "link", "prompt"],
  },
  {
    id: "git-commands",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    itemCount: 15,
    typeIds: ["command", "note"],
  },
  {
    id: "ai-prompts",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    itemCount: 18,
    typeIds: ["prompt", "snippet", "note"],
  },
];

export const items: Item[] = [
  {
    id: "item_1",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "text",
    content: `export function useAuth() {\n  const { data: session, status } = useSession();\n  return { user: session?.user, isLoading: status === "loading" };\n}`,
    url: null,
    language: "typescript",
    typeId: "snippet",
    collectionId: "react-patterns",
    tags: ["react", "auth", "hooks"],
    isFavorite: true,
    isPinned: true,
    createdAt: "2026-01-15",
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "text",
    content: `async function fetchWithRetry(url: string, retries = 3) {\n  for (let i = 0; i < retries; i++) {\n    try {\n      return await fetch(url);\n    } catch {\n      await new Promise((r) => setTimeout(r, 2 ** i * 1000));\n    }\n  }\n  throw new Error("Request failed");\n}`,
    url: null,
    language: "typescript",
    typeId: "snippet",
    collectionId: "react-patterns",
    tags: ["api", "fetch", "error-handling"],
    isFavorite: false,
    isPinned: true,
    createdAt: "2026-01-12",
  },
  {
    id: "item_3",
    title: "Undo Last Commit",
    description: "Reset the last commit but keep changes staged",
    contentType: "text",
    content: "git reset --soft HEAD~1",
    url: null,
    language: "bash",
    typeId: "command",
    collectionId: "git-commands",
    tags: ["git"],
    isFavorite: true,
    isPinned: false,
    createdAt: "2026-01-10",
  },
  {
    id: "item_4",
    title: "Code Review Prompt",
    description: "Prompt for thorough AI code reviews",
    contentType: "text",
    content: "Review the following code for bugs, security issues and performance problems. Suggest concrete fixes.",
    url: null,
    language: null,
    typeId: "prompt",
    collectionId: "ai-prompts",
    tags: ["ai", "review"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-01-08",
  },
  {
    id: "item_5",
    title: "List Comprehension Examples",
    description: "Common Python list comprehension patterns",
    contentType: "text",
    content: "squares = [x ** 2 for x in range(10) if x % 2 == 0]",
    url: null,
    language: "python",
    typeId: "snippet",
    collectionId: "python-snippets",
    tags: ["python", "lists"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-01-06",
  },
  {
    id: "item_6",
    title: "Big O Cheat Sheet",
    description: "Time complexity notes for common algorithms",
    contentType: "text",
    content: "## Big O\n\n- Binary search: O(log n)\n- Merge sort: O(n log n)\n- Hash lookup: O(1)",
    url: null,
    language: null,
    typeId: "note",
    collectionId: "interview-prep",
    tags: ["algorithms", "interview"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-01-04",
  },
  {
    id: "item_7",
    title: "React Docs",
    description: "Official React documentation",
    contentType: "text",
    content: null,
    url: "https://react.dev",
    language: null,
    typeId: "link",
    collectionId: "react-patterns",
    tags: ["react", "docs"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-01-02",
  },
];
