"use client";

import { useState, type FormEvent } from "react";
import { supabase, supabaseReady } from "@/lib/supabase";

type Status = "idle" | "sending" | "sent" | "error";

export default function FarmaishForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: a field hidden from people but not from naive bots.
    if (data.get("website")) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    setError("");

    const { error: insertError } = await supabase.from("requests").insert({
      name: String(data.get("name") ?? "").trim(),
      city: String(data.get("city") ?? "").trim(),
      song: String(data.get("song") ?? "").trim(),
      memory: String(data.get("memory") ?? "").trim() || null,
      consent_to_publish: data.get("consent") === "on",
    });

    if (insertError) {
      setStatus("error");
      setError(insertError.message);
      return;
    }

    setStatus("sent");
    form.reset();
  }

  if (!supabaseReady) {
    return (
      <div className="farmaish-card">
        <div className="section-kicker">💌 अपनी फरमाइश भेजिए</div>
        <p className="tiny-note">
          फरमाइश अभी बंद है — the request box is not connected yet. Set
          NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to switch it on.
        </p>
      </div>
    );
  }

  return (
    <form className="farmaish-card" onSubmit={submit}>
      <div className="section-kicker">💌 अपनी फरमाइश भेजिए</div>

      <input name="name" aria-label="नाम" required maxLength={80} placeholder="नाम / Name" />
      <input name="city" aria-label="शहर" required maxLength={80} placeholder="शहर / City" />
      <input name="song" aria-label="पसंदीदा गाना" required maxLength={160} placeholder="आपका पसंदीदा गाना" />
      <textarea
        name="memory"
        aria-label="याद"
        rows={4}
        maxLength={2000}
        placeholder="इस गाने से जुड़ी आपकी याद…"
      />

      <label className="consent">
        <input type="checkbox" name="consent" />
        <span>मेरी याद साइट पर दिखाई जा सकती है · You may publish this on the site</span>
      </label>

      {/* Honeypot. Off-screen rather than display:none, which some bots skip. */}
      <input
        className="trap"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <button className="primary-button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "भेज रहे हैं…" : status === "sent" ? "फरमाइश मिल गई ✓" : "फरमाइश भेजें →"}
      </button>

      {status === "sent" && (
        <p className="tiny-note">शुक्रिया — आपकी फरमाइश हम तक पहुँच गई.</p>
      )}
      {status === "error" && (
        <p className="tiny-note form-error">भेजी नहीं जा सकी — {error}</p>
      )}
    </form>
  );
}
