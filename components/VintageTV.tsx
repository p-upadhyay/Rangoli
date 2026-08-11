"use client";

import { useState } from "react";

export default function VintageTV() {
  const [on, setOn] = useState(false);

  return (
    <div className={`tv-shell ${on ? "tv-on" : ""}`}>
      <div className="tv-screen">
        <div className="screen-glow" />
        <div className="tv-copy">
          <span className="tv-flower">✺</span>
          <strong>रविवार</strong>
          <span>सुबह 8:00 बजे</span>
          <button onClick={() => setOn((v) => !v)}>{on ? "बंद करें" : "शुरू करें"}</button>
        </div>
      </div>
      <div className="tv-controls"><span /><span /></div>
      <div className="tv-brand">YAADON</div>
    </div>
  );
}
