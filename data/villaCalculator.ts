// Room program data for the calculator's "family home plan" path, ported
// from Khales-next's VillaCalculatorClient.js. Since calculator v2 this data
// never produces a cost - it only describes the family's program and an
// indicative built area for a design request. Building rates live in
// data/calculator-rates.v1.json. Icons and copy live in
// dictionaries/components, not here.

export type ArchitecturalStyle = "modern" | "neoclassic" | "heritage";
export type RoomId = "bedroom" | "majlis" | "living" | "kitchen" | "dining" | "guest_bedroom";
export type OtherRoomId = "maid_room" | "staircase_room" | "storage_room" | "prep_kitchen" | "driver_room";
// Rooms that count toward the program's area but always need their own
// pricing (fit-out varies too much for a per-m² rate).
export type ExtraRoomId = "office" | "cinema" | "gym";

export const ARCHITECTURAL_STYLES: ArchitecturalStyle[] = ["modern", "neoclassic", "heritage"];

export const PLAN_AREA_FACTORS = {
  // Walls, corridors and stairs on top of the rooms' net areas.
  circulation_multiplier: 1.4,
  bathroom_sqm: 6,
  dressing_room_sqm: 6,
};

export type RoomConfigEntry = {
  id: RoomId;
  counts: number[];
  default: number;
  hasBath: boolean;
  hasDressing: boolean;
  w: number;
  l: number;
};

export const ROOM_CONFIG: RoomConfigEntry[] = [
  { id: "bedroom", counts: [1, 2, 3, 4, 5, 6, 7, 8], default: 1, hasBath: true, hasDressing: true, w: 4, l: 5 },
  { id: "majlis", counts: [1, 2, 3], default: 1, hasBath: true, hasDressing: false, w: 6, l: 7 },
  { id: "living", counts: [1, 2, 3], default: 1, hasBath: false, hasDressing: false, w: 4, l: 7 },
  { id: "kitchen", counts: [1, 2], default: 1, hasBath: false, hasDressing: false, w: 5, l: 5 },
  { id: "dining", counts: [0, 1, 2, 3], default: 0, hasBath: false, hasDressing: false, w: 5, l: 5 },
  { id: "guest_bedroom", counts: [0, 1, 2], default: 0, hasBath: true, hasDressing: true, w: 4, l: 5 },
];

export type OtherRoomConfigEntry = { id: OtherRoomId; area: number };

export const OTHER_ROOMS_CONFIG: OtherRoomConfigEntry[] = [
  { id: "maid_room", area: 12 },
  { id: "staircase_room", area: 20 },
  { id: "storage_room", area: 5 },
  { id: "prep_kitchen", area: 20 },
  { id: "driver_room", area: 20 },
];

export type ExtraRoomConfigEntry = { id: ExtraRoomId; area: number };

export const EXTRA_ROOMS_CONFIG: ExtraRoomConfigEntry[] = [
  { id: "office", area: 20 },
  { id: "cinema", area: 20 },
  { id: "gym", area: 20 },
];

export const PARKING_OPTIONS = [0, 1, 2, 3, 4, 5, 6];

// Bounds for room dimensions entered in the plan (metres) - keeps a typo
// like 400 instead of 4 from producing a nonsense indicative area, and lets
// the request API reject tampered payloads.
export const ROOM_DIMENSION_LIMITS = { min: 1, max: 30 };
