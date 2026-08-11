"use client";

import { useEffect, useState } from "react";
import { dayPart, GREETINGS, LEDE_WHEN, type DayPart } from "@/lib/daypart";

/**
 * Greeting and lede, both keyed off the visitor's own clock. Kept in one
 * component so they read a single dayPart and can never disagree.
 *
 * Empty on the server for the same reason as LocalTime — the timezone is only
 * knowable in the browser — with non-breaking spaces holding both line heights
 * so nothing jumps on hydration.
 */
export default function Greeting() {
  const [part, setPart] = useState<DayPart | null>(null);

  useEffect(() => {
    setPart(dayPart(new Date().getHours()));
  }, []);

  return (
    <>
      <h1>{part ? GREETINGS[part] : " "}</h1>
      <p className="lede">
        {part ? (
          <>
            {LEDE_WHEN[part]}, kuch purani<br />yaadon ke naam…
          </>
        ) : (
          <>
            &nbsp;<br />&nbsp;
          </>
        )}
      </p>
    </>
  );
}
