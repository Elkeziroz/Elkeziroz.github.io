"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function RealtimeSyncProvider({
  children,
  initialTimestamp,
}: {
  children: React.ReactNode;
  initialTimestamp?: number;
}) {
  const router = useRouter();
  const lastTimestampRef = useRef<number>(initialTimestamp || Date.now());

  useEffect(() => {
    let isMounted = true;

    const checkSyncState = async () => {
      try {
        const res = await fetch(`/api/sync-state?_t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
          },
        });

        if (!res.ok) return;

        const data = await res.json();
        const serverTimestamp = data.lastUpdate || 0;

        if (serverTimestamp > lastTimestampRef.current) {
          lastTimestampRef.current = serverTimestamp;
          if (isMounted) {
            router.refresh();
          }
        }
      } catch (err) {
        // Silent error for poll
      }
    };

    // Poll every 1200ms for fast real-time responsiveness
    const interval = setInterval(checkSyncState, 1200);

    const onFocus = () => {
      checkSyncState();
    };

    window.addEventListener("focus", onFocus);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [router]);

  return <>{children}</>;
}
