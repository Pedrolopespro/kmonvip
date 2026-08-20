"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionProvider, signOut } from "next-auth/react";
import { LayoutDashboard, Users, Activity, Settings, ToggleLeft, Newspaper, LogOut } from "lucide-react";

const NAV_ITEMS = [
  { href: "/crm", label: "Visão geral", icon: LayoutDashboard },
  { href: "/crm/leads", label: "Leads", icon: Users },
  { href: "/crm/interacoes", label: "Interações", icon: Activity },
  { href: "/crm/blog", label: "Blog", icon: Newspaper },
  { href: "/crm/funcoes", label: "Funções do site", icon: ToggleLeft },
  { href: "/crm/configuracoes", label: "Configurações", icon: Settings },
];

function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-ink-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-4">
        <Image
          src="/images/logos/logo SVG KMON preta.svg"
          alt="KMON VIP"
          width={100}
          height={34}
          className="h-6 w-auto object-contain shrink-0"
        />
        <nav className="flex items-center gap-1 overflow-x-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = href === "/crm" ? pathname === "/crm" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive ? "bg-ink-900 text-paper" : "text-ink-700 hover:bg-ink-50"
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: "/crm/login" })}
          className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-ink-700 hover:bg-ink-50 transition-colors shrink-0"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  );
}

export default function CrmShell({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NavBar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </SessionProvider>
  );
}
