"use client";

import { FormEvent, useState } from "react";

export default function FarmaishForm() {
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form className="farmaish-card" onSubmit={submit}>
      <div className="section-kicker">💌 अपनी फरमाइश भेजिए</div>
      <input aria-label="नाम" required placeholder="नाम / Name" />
      <input aria-label="शहर" required placeholder="शहर / City" />
      <input aria-label="पसंदीदा गाना" required placeholder="आपका पसंदीदा गाना" />
      <textarea aria-label="याद" placeholder="इस गाने से जुड़ी आपकी याद…" rows={4} />
      <button className="primary-button" type="submit">{sent ? "फरमाइश मिल गई ✓" : "फरमाइश भेजें →"}</button>
      {sent && <p className="tiny-note">Demo mode: connect this form to Supabase before launch.</p>}
    </form>
  );
}
