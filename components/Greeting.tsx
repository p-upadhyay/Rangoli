"use client";

import { useEffect, useState } from "react";
import { dayPart, GREETINGS } from "@/lib/daypart";

/**
 * Greets by the visitor's own clock. Empty on the server for the same reason
 * as LocalTime — the timezone is only knowable in the browser — with a
 * non-breaking space holding the line height so nothing jumps on hydration.
 */
export default function Greeting() {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    setGreeting(GREETINGS[dayPart(new Date().getHours())]);
  }, []);

  return <h1>{greeting ?? " "}</h1>;
}
