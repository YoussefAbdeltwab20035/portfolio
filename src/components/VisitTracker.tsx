"use client";

import { useEffect } from "react";

export default function VisitTracker() {
  useEffect(() => {
    const storageKey = "portfolio_visit_notified_v1";
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(storageKey)) return;

    sessionStorage.setItem(storageKey, "1");

    const payload = JSON.stringify({
      path: window.location.pathname || "/",
      referrer: document.referrer || "Direct",
      isMobile: window.innerWidth < 768,
    });

    fetch("/api/notify-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}