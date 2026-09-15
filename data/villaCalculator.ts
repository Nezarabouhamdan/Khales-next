// Villa construction cost pricing data, ported from Khales-next's
// VillaCalculatorClient.js. Kept framework/UI-agnostic — icons and copy
// live in dictionaries/components, not here.

export type FinishingLevel = "standard" | "medium" | "high";
export type LocationId =
  | "dubai"
  | "abu_dhabi"
  | "sharjah"
  | "ajman"
  | "umm_al_quwain"
  | "ras_al_khaimah"
  | "fujairah"
  | "al_ain";
export type ArchitecturalStyle = "modern" | "neoclassic" | "heritage";
export type RoomId = "bedroom" | "majlis" | "living" | "kitchen" | "dining" | "guest_bedroom";
export type OtherRoomId = "maid_room" | "staircase_room" | "storage_room" | "prep_kitchen" | "driver_room";
export type FixedAddonId = "pool" | "office" | "elevator" | "cinema" | "gym";

export const PRICING_DATA = {
  factors: { circulation_multiplier: 1.4, basement_multiplier: 1.35 },
  cost_breakdown_per_sqm: {
    standard: {
      preparatory: 84,
      excavation_substructure: 420,
      superstructure: 504,
      blockwork: 140,
      waterproofing: 84,
      main_finishing: 560,
      carpentry: 140,
      aluminum_glass: 168,
      electrical: 168,
      hvac: 196,
      plumbing: 168,
      external_works: 168,
      contingencies: 280,
      consultant_fees: 112,
    },
    medium: {
      preparatory: 94.5,
      excavation_substructure: 472.5,
      superstructure: 567,
      blockwork: 157.5,
      waterproofing: 94.5,
      main_finishing: 630,
      carpentry: 157.5,
      aluminum_glass: 189,
      electrical: 189,
      hvac: 220.5,
      plumbing: 189,
      external_works: 189,
      contingencies: 315,
      consultant_fees: 126,
    },
    high: {
      preparatory: 110.25,
      excavation_substructure: 551.25,
      superstructure: 661.5,
      blockwork: 183.75,
      waterproofing: 110.25,
      main_finishing: 735,
      carpentry: 183.75,
      aluminum_glass: 220.5,
      electrical: 220.5,
      hvac: 257.25,
      plumbing: 220.5,
      external_works: 220.5,
      contingencies: 367.5,
      consultant_fees: 147,
    },
  } satisfies Record<FinishingLevel, Record<string, number>>,
  area_addons: { bathroom: 6, dressing_room: 6 },
};

export type CostItemKey = keyof typeof PRICING_DATA.cost_breakdown_per_sqm.standard;

export const LOCATION_PRICING_FACTORS: Record<LocationId, number> = {
  dubai: 1.0,
  al_ain: 1.0,
  abu_dhabi: 1.1,
  sharjah: 0.95,
  ajman: 0.88,
  umm_al_quwain: 0.85,
  fujairah: 0.8,
  ras_al_khaimah: 0.8,
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

export type FixedAddonConfigEntry = { id: FixedAddonId; area: number; cost: number };

export const FIXED_COST_ADDONS_CONFIG: FixedAddonConfigEntry[] = [
  { id: "pool", area: 45, cost: 228000 },
  { id: "office", area: 20, cost: 38597 },
  { id: "elevator", area: 6, cost: 133380 },
  { id: "cinema", area: 20, cost: 78444 },
  { id: "gym", area: 20, cost: 56919 },
];

export const CHART_COLORS = [
  "#8DC63F",
  "#F9A825",
  "#29B6F6",
  "#7E57C2",
  "#EF5350",
  "#FF7043",
  "#66BB6A",
  "#FFEE58",
  "#42A5F5",
  "#AB47BC",
  "#EC407A",
  "#FFA726",
  "#26A69A",
  "#D4E157",
];

export const PARKING_OPTIONS = [0, 1, 2, 3, 4, 5, 6];
