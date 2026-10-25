// What the calculator keeps in sessionStorage so a reload doesn't lose the
// visitor's place: their inputs, the screen, the estimate reference. Never
// contact details - the request form's fields aren't persisted at all.
// Everything read back is checked field by field, so a stale or hand-edited
// entry falls back to defaults instead of crashing a screen.

import { cityBelongsTo, isCityId, type CityId } from "@/data/calculatorMarkets";
import {
  ROOM_CONFIG,
  OTHER_ROOMS_CONFIG,
  EXTRA_ROOMS_CONFIG,
  ARCHITECTURAL_STYLES,
  PARKING_OPTIONS,
} from "@/data/villaCalculator";
import {
  getInitialEstimateInputs,
  getInitialFamilyPlan,
  INITIAL_READINESS,
  type EstimateInputs,
  type FamilyPlanSelections,
  type ReadinessAnswers,
  type RoomSelection,
} from "./engine";
import { isValidReference } from "./reference";
import {
  COUNTRY_CODES,
  FINISH_TIERS,
  FLOORS_OPTIONS,
  INPUT_MODES,
  LAND_STATUSES,
  SPECIAL_ITEMS,
  type CountryCode,
  type InputMode,
} from "./types";

export const SESSION_KEY = "khalesCalcV2";
// Left behind by calculator v1; removed on first load.
export const LEGACY_SESSION_KEY = "khalesVillaCalc";

// The request form isn't a stored screen: a reload returns to the result
// (or family plan) the request was opened from.
export type CalculatorScreen = "intro" | "form" | "result" | "family" | "family_summary";
const SCREENS: readonly CalculatorScreen[] = ["intro", "form", "result", "family", "family_summary"];

export type CalculatorSession = {
  screen: CalculatorScreen;
  inputMode: InputMode | null;
  estimate: EstimateInputs;
  familyPlan: FamilyPlanSelections;
  reference: string | null;
  estimateDate: string | null;
  readiness: ReadinessAnswers;
};

type Loose = Record<string, unknown>;

function isObject(value: unknown): value is Loose {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function oneOf<T extends string>(list: readonly T[], value: unknown): value is T {
  return typeof value === "string" && (list as readonly string[]).includes(value);
}

function finiteOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function booleanOrNull(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function restoreCity(value: unknown, country: CountryCode): CityId | null {
  return isCityId(value) && cityBelongsTo(value, country) ? value : null;
}

function restoreSpecialItems(value: unknown): EstimateInputs["specialItems"] {
  return Array.isArray(value) ? SPECIAL_ITEMS.filter((item) => value.includes(item)) : [];
}

function restoreEstimate(value: unknown): EstimateInputs {
  const fallback = getInitialEstimateInputs();
  if (!isObject(value) || !oneOf(COUNTRY_CODES, value.country)) return fallback;
  return {
    country: value.country,
    city: restoreCity(value.city, value.country),
    landStatus: oneOf(LAND_STATUSES, value.landStatus) ? value.landStatus : null,
    tier: oneOf(FINISH_TIERS, value.tier) ? value.tier : fallback.tier,
    unit: value.unit === "sqft" ? "sqft" : "m2",
    area: finiteOrNull(value.area),
    budget: finiteOrNull(value.budget),
    floors: oneOf(FLOORS_OPTIONS, value.floors) ? value.floors : null,
    specialItems: restoreSpecialItems(value.specialItems),
  };
}

function restoreRoom(value: unknown, fallback: RoomSelection, counts: number[]): RoomSelection {
  if (!isObject(value) || !counts.includes(value.count as number) || !Array.isArray(value.details)) return fallback;
  const saved = value.details;
  return {
    count: value.count as number,
    details: fallback.details.map((initial, index) => {
      const detail = saved[index];
      if (!isObject(detail)) return initial;
      return {
        w: finiteOrNull(detail.w) ?? initial.w,
        l: finiteOrNull(detail.l) ?? initial.l,
        bath: detail.bath === true,
        dressing: detail.dressing === true,
      };
    }),
  };
}

function restoreFamilyPlan(value: unknown): FamilyPlanSelections {
  const fallback = getInitialFamilyPlan();
  if (!isObject(value) || !oneOf(COUNTRY_CODES, value.country)) return fallback;
  const rooms = isObject(value.rooms) ? value.rooms : {};
  const otherRooms = isObject(value.otherRooms) ? value.otherRooms : {};
  const extraRooms = isObject(value.extraRooms) ? value.extraRooms : {};
  return {
    country: value.country,
    city: restoreCity(value.city, value.country),
    landStatus: oneOf(LAND_STATUSES, value.landStatus) ? value.landStatus : null,
    style: oneOf(ARCHITECTURAL_STYLES, value.style) ? value.style : fallback.style,
    tier: oneOf(FINISH_TIERS, value.tier) ? value.tier : fallback.tier,
    rooms: ROOM_CONFIG.reduce(
      (acc, room) => ({ ...acc, [room.id]: restoreRoom(rooms[room.id], fallback.rooms[room.id], room.counts) }),
      {} as FamilyPlanSelections["rooms"],
    ),
    otherRooms: OTHER_ROOMS_CONFIG.reduce(
      (acc, room) => ({ ...acc, [room.id]: otherRooms[room.id] === true }),
      {} as FamilyPlanSelections["otherRooms"],
    ),
    extraRooms: EXTRA_ROOMS_CONFIG.reduce(
      (acc, room) => ({ ...acc, [room.id]: extraRooms[room.id] === true }),
      {} as FamilyPlanSelections["extraRooms"],
    ),
    specialItems: restoreSpecialItems(value.specialItems),
    floors: oneOf(FLOORS_OPTIONS, value.floors) ? value.floors : null,
    parking: PARKING_OPTIONS.includes(value.parking as number) ? (value.parking as number) : fallback.parking,
  };
}

/** Parses a stored session; null when there is nothing usable. */
export function restoreSession(raw: string | null): CalculatorSession | null {
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isObject(parsed)) return null;

  const inputMode = oneOf(INPUT_MODES, parsed.inputMode) ? parsed.inputMode : null;
  const readiness = isObject(parsed.readiness)
    ? {
        designWithin6Months: booleanOrNull(parsed.readiness.designWithin6Months),
        hasContractorQuote: booleanOrNull(parsed.readiness.hasContractorQuote),
      }
    : INITIAL_READINESS;
  const estimateDate =
    typeof parsed.estimateDate === "string" && !Number.isNaN(Date.parse(parsed.estimateDate))
      ? parsed.estimateDate
      : null;

  return {
    screen: inputMode && oneOf(SCREENS, parsed.screen) ? parsed.screen : "intro",
    inputMode,
    estimate: restoreEstimate(parsed.estimate),
    familyPlan: restoreFamilyPlan(parsed.familyPlan),
    reference: isValidReference(parsed.reference) ? parsed.reference : null,
    estimateDate,
    readiness,
  };
}
