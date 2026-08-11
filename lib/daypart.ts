import { NIGHT_PLAYLIST_ID, PLAYLIST_ID } from "@/data/playlist";

export type DayPart = "morning" | "afternoon" | "evening" | "night";

/**
 * Bucketed from the visitor's own clock — call with new Date().getHours().
 *
 * The pre-dawn test comes first on purpose: hours 0–4 are night, and checking
 * morning first lets them fall through to the afternoon branch.
 */
export function dayPart(hour: number): DayPart {
  if (hour < 5) return "night";
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  if (hour < 21) return "evening";
  return "night";
}

export const GREETINGS: Record<DayPart, string> = {
  morning: "सुप्रभात",
  afternoon: "नमस्कार",
  evening: "शुभ संध्या",
  night: "शुभ रात्रि",
};

/** Morning and afternoon get the Rangoli list; evening and night get the ghazals. */
export function playlistFor(part: DayPart): string {
  return part === "evening" || part === "night" ? NIGHT_PLAYLIST_ID : PLAYLIST_ID;
}
