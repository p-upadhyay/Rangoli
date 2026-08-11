"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Farmaish = {
  name: string;
  city: string;
  song: string;
  memory: string | null;
};

/**
 * The most recent farmaish the owner has marked published, drawn as a postcard.
 *
 * Row level security does the gatekeeping: the select policy only returns rows
 * where the sender consented AND the row was published by hand, so nothing can
 * put itself on the page. Until one exists, the card invites the first one
 * rather than inventing a sample.
 */
export default function PostcardFarmaish() {
  const [card, setCard] = useState<Farmaish | null>(null);

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    let cancelled = false;

    client
      .from("requests")
      .select("name, city, song, memory")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled && data) setCard(data as Farmaish);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <aside className={`letter-card ${card ? "" : "is-empty"}`}>
      <div className="stamp" aria-hidden="true">
        <span className="stamp-word">यादें</span>
        <span className="stamp-denom">₹ 1</span>
      </div>
      <div className="cancel" aria-hidden="true" />

      <span className="postmark">{card ? "इस हफ्ते की फरमाइश" : "पहली फरमाइश"}</span>

      {card ? (
        <>
          {card.memory && <blockquote>{card.memory}</blockquote>}
          <p className="letter-song">♪ {card.song}</p>
          <p className="letter-from">— {card.name}, {card.city}</p>
        </>
      ) : (
        <p className="letter-empty">
          अभी यहाँ कोई फरमाइश नहीं है. पहली आपकी हो सकती है — बाईं ओर भेजिए.
        </p>
      )}
    </aside>
  );
}
