import type { ReactNode } from "react";

export interface EventItem {
  id: string;
  title: string;
  description: string;
  image: string | null;
  date: Date;
  active: boolean;
  featured: boolean;
  discordUrl: string | null;
  rewards: string | null;
  publishAt: Date | null;
  endAt: Date | null;
  createdAt: Date;
}

export interface SidebarItem {
  name: string;
  href: string;
  icon: ReactNode;
}
