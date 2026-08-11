// Paste the id from your YouTube Music playlist URL:
//   https://music.youtube.com/playlist?list=PLxxxxxxxxxxxxxxxx
//                                           ^^^^^^^^^^^^^^^^^^
// The playlist must be one you created, set to Public or Unlisted.
//
// These cannot be embedded, and the TV will stay dark if you use one:
//   LM              — your Liked Music
//   RDCLAK5uy_...   — YT Music's auto-generated mood/genre mixes
//   RDAMVM...       — radio started from a song
//   "My Supermix" and other Made-for-you playlists
//
// If your URL shows a VL prefix (VLPLxxxx), drop the VL and keep the rest.
// Annotated as `string` so the empty-value guard in VintageTV stays a legal
// comparison — without it TS narrows to a literal type and rejects the check.
export const PLAYLIST_ID: string = "PLEvO8ItK00Ko";

// What the TV loads for evening and night arrivals. Also the playlist behind
// the "Dost, Maggi aur Jagjit" mood — defined here so the id lives in one place.
export const NIGHT_PLAYLIST_ID = "PLF3rANb3ZomM";
