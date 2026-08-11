"use client";

import { useEffect, useState } from "react";

const MESSAGE = "Yaadon Ki Rangoli — purane geet, nayi yaadein";

/**
 * Share targets are built on mount because the URL is only known in the
 * browser, which also means this works unchanged on any domain the site
 * later moves to.
 */
export default function ShareLinks() {
  const [links, setLinks] = useState<{ whatsapp: string; x: string } | null>(null);
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const url = window.location.origin;
    setLinks({
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${MESSAGE} ${url}`)}`,
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(MESSAGE)}&url=${encodeURIComponent(url)}`,
    });
    setCanShare(typeof navigator !== "undefined" && Boolean(navigator.share));
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked (insecure context or denied) — the visible links still work.
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title: "Yaadon Ki Rangoli", text: MESSAGE, url: window.location.origin });
    } catch {
      // Cancelled by the user; nothing to report.
    }
  }

  return (
    <div className="share">
      <span className="share-label">इसे किसी अपने के साथ बाँटिए</span>
      <div className="share-buttons">
        {canShare && (
          <button type="button" onClick={nativeShare}>भेजिए</button>
        )}
        <a href={links?.whatsapp ?? "#"} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a href={links?.x ?? "#"} target="_blank" rel="noopener noreferrer">X</a>
        <button type="button" onClick={copy}>{copied ? "लिंक कॉपी हो गया ✓" : "लिंक कॉपी कीजिए"}</button>
      </div>
    </div>
  );
}
