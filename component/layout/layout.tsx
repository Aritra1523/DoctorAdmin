

"use client";

import Sidebar from "@/component/Sidebar/Sidebar";
import { usePathname } from "next/navigation";


const ADMIN_ROUTE_PREFIXES = [
  "/dashbord",
  "/doctors",
  "/appointments",
  "/deperatments",
];

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoute = ADMIN_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  return (
    <div className="flex min-h-screen">
      {isAdminRoute && <Sidebar />}
      <main className={isAdminRoute ? "flex-1 p-4" : "flex-1"}>
        {children}
      </main>
    </div>
  );
}