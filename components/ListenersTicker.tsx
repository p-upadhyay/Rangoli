"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

/**
 * How many browsers currently have the page open, via Supabase Realtime
 * presence. No table involved — presence lives in memory on the realtime
 * server and clears when a client disconnects.
 *
 * Hidden below two: announcing "1 person is listening" to the only person
 * there reads worse than saying nothing.
 */
export default function ListenersTicker() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Captured locally: the narrowing from this guard does not survive into
    // the cleanup closure below.
    const client = supabase;
    if (!client) return;

    const channel = client.channel("rangoli-listeners", {
      config: { presence: { key: crypto.randomUUID() } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        setCount(Object.keys(channel.presenceState()).length);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") channel.track({ joined_at: Date.now() });
      });

    return () => {
      client.removeChannel(channel);
    };
  }, []);

  if (count < 2) return null;

  return (
    <p className="listeners" aria-live="polite">
      ◉ अभी {count} लोग साथ में रंगोली सुन रहे हैं
    </p>
  );
}
