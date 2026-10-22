import Link from "next/link";
import { Folder, Layers, Settings, Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TypeIcon from "@/components/dashboard/TypeIcon";
import { collections, currentUser, items } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { ItemTypeOption } from "@/types/item-type";

const RECENT_COLLECTIONS_LIMIT = 5;

interface SidebarProps {
  itemTypes: ItemTypeOption[];
  collapsed?: boolean;
  onNavigate?: () => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function countItemsByType(typeName: string) {
  return items.filter((item) => item.typeId === typeName).length;
}

export default function Sidebar({ itemTypes, collapsed = false, onNavigate }: SidebarProps) {
  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const recentCollections = collections
    .filter((c) => !c.isFavorite)
    .slice(0, RECENT_COLLECTIONS_LIMIT);

  return (
    <div className="flex h-full flex-col">
      <div className={cn("flex h-16 shrink-0 items-center gap-2", collapsed ? "justify-center" : "px-4")}>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white">
          <Layers className="size-4" />
        </div>
        {!collapsed && <span className="text-lg font-semibold">DevStash</span>}
      </div>

      <nav className="flex-1 overflow-x-hidden overflow-y-auto px-2 pb-4">
        <section>
          {!collapsed && <SectionLabel>Types</SectionLabel>}
          <ul className="space-y-0.5">
            {itemTypes.map((type) => (
              <li key={type.id}>
                <NavLink
                  href={`/items/${type.slug}`}
                  label={type.label}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                  icon={<TypeIcon icon={type.icon} color={type.color} className="size-4 shrink-0" />}
                >
                  <span className="text-xs text-muted-foreground">{countItemsByType(type.name)}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>

        <div className="my-4 border-t border-border" />

        <section>
          {!collapsed && <SectionLabel>Collections</SectionLabel>}
          <div className={cn(!collapsed && "ml-2 border-l border-border pl-2")}>
            {!collapsed && <SubLabel>Favorites</SubLabel>}
            <ul className="space-y-0.5">
              {favoriteCollections.map((collection) => (
                <li key={collection.id}>
                  <CollectionLink name={collection.name} collapsed={collapsed} onNavigate={onNavigate}>
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                  </CollectionLink>
                </li>
              ))}
            </ul>

            {collapsed ? (
              <div className="my-2 border-t border-border" />
            ) : (
              <SubLabel>Recent</SubLabel>
            )}
            <ul className="space-y-0.5">
              {recentCollections.map((collection) => (
                <li key={collection.id}>
                  <CollectionLink name={collection.name} collapsed={collapsed} onNavigate={onNavigate}>
                    <span className="text-xs text-muted-foreground">{collection.itemCount}</span>
                  </CollectionLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </nav>

      <div
        className={cn(
          "flex shrink-0 items-center gap-3 border-t border-border",
          collapsed ? "justify-center py-4" : "p-4",
        )}
      >
        <Avatar className="size-9" title={collapsed ? currentUser.name : undefined}>
          {currentUser.image && <AvatarImage src={currentUser.image} alt={currentUser.name} />}
          <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{currentUser.name}</p>
              <p className="truncate text-xs text-muted-foreground">{currentUser.email}</p>
            </div>
            <button
              type="button"
              aria-label="Settings"
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <Settings className="size-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="px-2 pt-2 pb-1 text-xs font-medium text-muted-foreground">{children}</h3>;
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-2 pt-3 pb-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
      {children}
    </p>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  collapsed: boolean;
  onNavigate?: () => void;
  children?: React.ReactNode;
}

function NavLink({ href, label, icon, collapsed, onNavigate, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      aria-label={collapsed ? label : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md py-1.5 text-sm hover:bg-accent",
        collapsed ? "justify-center px-0 py-2" : "px-2",
      )}
    >
      {icon}
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {children}
        </>
      )}
    </Link>
  );
}

interface CollectionLinkProps {
  name: string;
  collapsed: boolean;
  onNavigate?: () => void;
  children: React.ReactNode;
}

function CollectionLink({ name, collapsed, onNavigate, children }: CollectionLinkProps) {
  return (
    <NavLink
      href="/dashboard"
      label={name}
      collapsed={collapsed}
      onNavigate={onNavigate}
      icon={<Folder className="size-4 shrink-0 text-muted-foreground" />}
    >
      {children}
    </NavLink>
  );
}
