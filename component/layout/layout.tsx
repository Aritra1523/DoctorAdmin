"use client";

import Sidebar from "@/component/Sidebar/Sidebar";
import { usePathname } from "next/navigation";

const HIDDEN_ROUTES = ["/auth/login"];

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout = HIDDEN_ROUTES.includes(pathname);

  return (
    <div className="flex min-h-screen">
      {!hideLayout && <Sidebar />}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
