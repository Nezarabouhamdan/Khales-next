import type { ReactNode } from "react";
import {
  FaBed,
  FaUsers,
  FaCouch,
  FaUtensils,
  FaConciergeBell,
  FaUserFriends,
  FaPlus,
  FaWarehouse,
  FaCar,
  FaSwimmingPool,
  FaBuilding,
  FaVideo,
  FaDumbbell,
  FaCarSide,
  FaLayerGroup,
  FaCity,
  FaLandmark,
  FaHome,
  FaStar,
  FaTree,
  FaHouseUser,
  FaMapMarkedAlt,
  FaFileSignature,
  FaSearchLocation,
} from "react-icons/fa";
import { FaStairs } from "react-icons/fa6";
import { GiElevator } from "react-icons/gi";
import type { RoomId, OtherRoomId, ExtraRoomId, ArchitecturalStyle } from "@/data/villaCalculator";
import type { FinishTier, LandStatus, SpecialItemId } from "@/lib/calculator/types";

const TIER_STAR_COUNT: Record<FinishTier, number> = { practical: 1, family: 2, premium: 3 };

export function FinishingStars({ tier }: { tier: FinishTier }) {
  const count = TIER_STAR_COUNT[tier];
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <FaStar key={i} className={i < count ? "" : "opacity-20"} size={13} />
      ))}
    </span>
  );
}

export const ROOM_ICONS: Record<RoomId, ReactNode> = {
  bedroom: <FaBed />,
  majlis: <FaUsers />,
  living: <FaCouch />,
  kitchen: <FaUtensils />,
  dining: <FaConciergeBell />,
  guest_bedroom: <FaUserFriends />,
};

export const OTHER_ROOM_ICONS: Record<OtherRoomId, ReactNode> = {
  maid_room: <FaPlus />,
  staircase_room: <FaStairs />,
  storage_room: <FaWarehouse />,
  prep_kitchen: <FaUtensils />,
  driver_room: <FaCar />,
};

export const EXTRA_ROOM_ICONS: Record<ExtraRoomId, ReactNode> = {
  office: <FaBuilding />,
  cinema: <FaVideo />,
  gym: <FaDumbbell />,
};

export const SPECIAL_ITEM_ICONS: Record<SpecialItemId, ReactNode> = {
  basement: <FaLayerGroup />,
  pool: <FaSwimmingPool />,
  elevator: <GiElevator />,
  annex: <FaHouseUser />,
  external_works: <FaTree />,
};

export const LAND_STATUS_ICONS: Record<LandStatus, ReactNode> = {
  owned: <FaMapMarkedAlt />,
  grant_or_allocation: <FaFileSignature />,
  no_land_yet: <FaSearchLocation />,
};

export const STYLE_ICONS: Record<ArchitecturalStyle, ReactNode> = {
  modern: <FaCity />,
  neoclassic: <FaLandmark />,
  heritage: <FaHome />,
};

export const ParkingIcon = FaCarSide;
