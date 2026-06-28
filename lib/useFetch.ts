"use client";

import { useEffect, useState } from "react";
import { activities, aidAwards, grades, money, notifications, schedules, user } from "@/lib/mockData";

const apiData: Record<string, unknown> = {
  "/api/user": user,
  "/api/notifications": notifications,
  "/api/courses": { schedules, activities },
  "/api/grades": grades,
  "/api/financial-aid": {
    awards: aidAwards,
    year: "July 2025 - June 2026",
    docs: ["Tax Transcript", "SAP Form"]
  },
  "/api/money": money,
  "/api/degree": {
    major: "Computer Science",
    school: "Newark College of Arts & Sciences",
    gpaLast: 3.8,
    gpaCumulative: 3.7,
    credits: 90
  }
};

export function useFetch<T>(url: string, enabled = true) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(enabled);

  useEffect(() => {
    if (!enabled) {
      setData(null);
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    const timeout = window.setTimeout(() => {
      if (!active) return;
      setData((apiData[url] ?? null) as T | null);
      setLoading(false);
    }, 150);

    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [url, enabled]);

  return { data, loading };
}
