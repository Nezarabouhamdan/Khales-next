import {
  PRICING_DATA,
  LOCATION_PRICING_FACTORS,
  ROOM_CONFIG,
  OTHER_ROOMS_CONFIG,
  FIXED_COST_ADDONS_CONFIG,
  type CostItemKey,
  type FinishingLevel,
  type LocationId,
  type RoomId,
  type OtherRoomId,
  type FixedAddonId,
} from "@/data/villaCalculator";
import type { CalculatorDict } from "@/dictionaries/types";

export type RoomDetail = { w: number; l: number; bath: boolean; dressing: boolean };
export type RoomSelection = { count: number; details: RoomDetail[] };

export type DetailedSelections = {
  location: LocationId;
  designStyle: string;
  finishing: FinishingLevel;
  parking: number;
  basement: boolean;
  rooms: Record<RoomId, RoomSelection>;
  otherRooms: Record<OtherRoomId, boolean>;
  fixedAddons: Record<FixedAddonId, boolean>;
};

export type QuickSelections = {
  bua: number;
  location: LocationId;
  finishing: FinishingLevel;
  unit: "m2" | "sqft";
};

export type CalculationMode = "detailed" | "quick";

// Applied on top of the raw per-sqm/addon rates in data/villaCalculator.ts
// so every estimate (detailed and quick, every breakdown line) comes out
// 10% higher than the underlying cost data, without touching that data.
const PRICE_MARKUP = 1.1;

export function initializeRoomsState(): Record<RoomId, RoomSelection> {
  const state = {} as Record<RoomId, RoomSelection>;
  ROOM_CONFIG.forEach((room) => {
    const maxCount = Math.max(...room.counts, 0);
    state[room.id] = {
      count: room.default,
      details: Array.from({ length: maxCount + 1 }, () => ({
        w: room.w,
        l: room.l,
        bath: false,
        dressing: false,
      })),
    };
  });
  return state;
}

export function getInitialDetailedSelections(): DetailedSelections {
  return {
    location: "dubai",
    designStyle: "modern",
    finishing: "standard",
    parking: 2,
    basement: false,
    rooms: initializeRoomsState(),
    otherRooms: OTHER_ROOMS_CONFIG.reduce(
      (acc, room) => ({ ...acc, [room.id]: false }),
      {} as Record<OtherRoomId, boolean>,
    ),
    fixedAddons: FIXED_COST_ADDONS_CONFIG.reduce(
      (acc, addon) => ({ ...acc, [addon.id]: false }),
      {} as Record<FixedAddonId, boolean>,
    ),
  };
}

export function getInitialQuickSelections(): QuickSelections {
  return { bua: 500, location: "dubai", finishing: "standard", unit: "m2" };
}

export type BreakdownItem = { name: string; cost: number };

export type CalculationResult = {
  totalBUA: number;
  totalPrice: number;
  breakdownDetails: BreakdownItem[];
};

export function calculateCost(args: {
  mode: CalculationMode;
  selections: DetailedSelections;
  quickSelections: QuickSelections;
  extraArea: number;
  itemTranslations: CalculatorDict["itemTranslations"];
}): CalculationResult {
  const { mode, selections, quickSelections, extraArea, itemTranslations } = args;

  let finalTotalBUA: number;
  let totalFixedAddonCost = 0;

  if (mode === "quick") {
    finalTotalBUA =
      quickSelections.unit === "sqft" ? (quickSelections.bua || 0) / 10.764 : quickSelections.bua || 0;
  } else {
    let totalCoreArea = 0;

    (Object.keys(selections.rooms) as RoomId[]).forEach((id) => {
      const room = selections.rooms[id];
      for (let i = 0; i < room.count; i++) {
        const detail = room.details[i];
        if (!detail) continue;
        totalCoreArea += (detail.w || 0) * (detail.l || 0);
        if (detail.bath) totalCoreArea += PRICING_DATA.area_addons.bathroom;
        if (detail.dressing) totalCoreArea += PRICING_DATA.area_addons.dressing_room;
      }
    });

    OTHER_ROOMS_CONFIG.forEach((room) => {
      if (selections.otherRooms[room.id]) totalCoreArea += room.area;
    });

    FIXED_COST_ADDONS_CONFIG.forEach((addon) => {
      if (selections.fixedAddons[addon.id]) {
        totalCoreArea += addon.area;
        totalFixedAddonCost += addon.cost * PRICE_MARKUP;
      }
    });

    if (selections.basement) totalCoreArea *= PRICING_DATA.factors.basement_multiplier;

    const buaBeforeBuffer = totalCoreArea * PRICING_DATA.factors.circulation_multiplier;
    finalTotalBUA = buaBeforeBuffer + extraArea;
  }

  const finishing = mode === "quick" ? quickSelections.finishing : selections.finishing;
  const location = mode === "quick" ? quickSelections.location : selections.location;

  const costs = PRICING_DATA.cost_breakdown_per_sqm[finishing];
  const locationMultiplier = LOCATION_PRICING_FACTORS[location] || 1.0;

  const adjustedBreakdownDetails: BreakdownItem[] = (Object.keys(costs) as CostItemKey[]).map((key) => ({
    name: itemTranslations[key],
    cost: costs[key] * finalTotalBUA * locationMultiplier * PRICE_MARKUP,
  }));

  const adjustedConstructionCost = adjustedBreakdownDetails.reduce((sum, item) => sum + item.cost, 0);

  const breakdownDetails = [...adjustedBreakdownDetails];
  if (totalFixedAddonCost > 0) {
    breakdownDetails.push({ name: itemTranslations.fixed_addons_cost, cost: totalFixedAddonCost });
  }

  return {
    totalBUA: finalTotalBUA,
    totalPrice: adjustedConstructionCost + totalFixedAddonCost,
    breakdownDetails,
  };
}
