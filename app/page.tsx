"use client";

import { useEffect } from "react";
import { withBasePath } from "@/lib/routes";

export default function Home() {
  useEffect(() => {
    window.location.replace(withBasePath("/dashboard"));
  }, []);

  return <main className="min-h-screen bg-slate-100" />;
}
