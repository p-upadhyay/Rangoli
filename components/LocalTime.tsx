"use client";

import { useEffect, useState } from "react";

/**
 * The visitor's own clock, in their own timezone and locale.
 *
 * Deliberately empty on the server: the browser is the only place that knows
 * the visitor's timezone, so rendering a time during SSR would both be wrong
 * and cause a hydration mismatch.
 */
export default function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(tick);
  }, []);

  if (!now) {
    return (
      <div className="morning-time" aria-hidden="true">
        <span>☀</span>
        <strong>&nbsp;</strong>
        <small>&nbsp;</small>
      </div>
    );
  }

  const hour = now.getHours();
  const night = hour < 6 || hour >= 19;

  return (
    <div className="morning-time">
      <span>{night ? "☾" : "☀"}</span>
      <strong>{now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</strong>
      <small>{now.toLocaleDateString("hi-IN", { weekday: "long" })}</small>
    </div>
  );
}
