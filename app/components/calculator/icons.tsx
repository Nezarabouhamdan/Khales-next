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
  FaMapMarkerAlt,
  FaCity,
  FaLandmark,
  FaHome,
  FaStar,
} from "react-icons/fa";
import { FaStairs } from "react-icons/fa6";
import { GiElevator } from "react-icons/gi";
import type {
  RoomId,
  OtherRoomId,
  FixedAddonId,
  LocationId,
  ArchitecturalStyle,
  FinishingLevel,
} from "@/data/villaCalculator";

const FINISHING_STAR_COUNT: Record<FinishingLevel, number> = { standard: 1, medium: 2, high: 3 };

export function FinishingStars({ level }: { level: FinishingLevel }) {
  const count = FINISHING_STAR_COUNT[level];
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <FaStar key={i} className={i < count ? "" : "opacity-20"} size={13} />
      ))}
    </span>
  );
}

export const ROOM_ICONS: Record<RoomId, React.ReactNode> = {
  bedroom: <FaBed />,
  majlis: <FaUsers />,
  living: <FaCouch />,
  kitchen: <FaUtensils />,
  dining: <FaConciergeBell />,
  guest_bedroom: <FaUserFriends />,
};

export const OTHER_ROOM_ICONS: Record<OtherRoomId, React.ReactNode> = {
  maid_room: <FaPlus />,
  staircase_room: <FaStairs />,
  storage_room: <FaWarehouse />,
  prep_kitchen: <FaUtensils />,
  driver_room: <FaCar />,
};

export const FIXED_ADDON_ICONS: Record<FixedAddonId, React.ReactNode> = {
  pool: <FaSwimmingPool />,
  office: <FaBuilding />,
  elevator: <GiElevator />,
  cinema: <FaVideo />,
  gym: <FaDumbbell />,
};

export const ParkingIcon = FaCarSide;
export const BasementIcon = FaLayerGroup;

export const LocationIcon = FaMapMarkerAlt;

export const STYLE_ICONS: Record<ArchitecturalStyle, React.ReactNode> = {
  modern: <FaCity />,
  neoclassic: <FaLandmark />,
  heritage: <FaHome />,
};

// A single consistent pin works fine for every emirate - kept as a lookup
// (rather than one shared constant) in case locations ever want distinct
// icons later.
export const LOCATION_ICONS: Record<LocationId, React.ReactNode> = {
  dubai: <FaMapMarkerAlt />,
  abu_dhabi: <FaMapMarkerAlt />,
  sharjah: <FaMapMarkerAlt />,
  ajman: <FaMapMarkerAlt />,
  umm_al_quwain: <FaMapMarkerAlt />,
  ras_al_khaimah: <FaMapMarkerAlt />,
  fujairah: <FaMapMarkerAlt />,
  al_ain: <FaMapMarkerAlt />,
};
