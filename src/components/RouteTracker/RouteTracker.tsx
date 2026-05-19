"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      const currentPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      
      // If there is a previous path and it's different from current, track the flow
      if (prevPathRef.current && prevPathRef.current !== currentPath) {
        (window as any).gtag("event", "page_flow", {
          from_page: prevPathRef.current,
          to_page: currentPath,
        });
      }

      // Update the previous path to current
      prevPathRef.current = currentPath;
    }
  }, [pathname, searchParams]);

  return null;
}
