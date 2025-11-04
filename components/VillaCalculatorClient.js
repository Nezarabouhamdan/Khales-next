"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  FaMapMarkerAlt,
  FaPalette,
  FaStar,
  FaBed,
  FaUsers,
  FaRestroom,
  FaConciergeBell,
  FaUtensils,
  FaUserFriends,
  FaWarehouse,
  FaCar,
  FaSwimmingPool,
  FaBuilding,
  FaVideo,
  FaDumbbell,
  FaPlus,
  FaMinus,
  FaExpandArrowsAlt,
  FaRulerCombined,
  FaTshirt,
  FaRuler,
  FaDraftingCompass,
} from "react-icons/fa";
import { FaStairs } from "react-icons/fa6";
import { GiElevator } from "react-icons/gi";
import { jsPDF, GState } from "jspdf";
import html2canvas from "html2canvas";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// --- CONFIGURATION DATA (Constants) ---
const PRICING_DATA = {
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
  },
  area_addons: { bathroom: 6, dressing_room: 6 },
};
const LOCATION_PRICING_FACTORS = {
  dubai: 1.0,
  al_ain: 1.0,
  abu_dhabi: 1.1,
  sharjah: 0.95,
  ajman: 0.88,
  umm_al_quwain: 0.85,
  fujairah: 0.8,
  ras_al_khaimah: 0.8,
};
const ROOM_CONFIG = [
  {
    id: "bedroom",
    counts: [1, 2, 3, 4, 5, 6, 7, 8],
    default: 1,
    has_bath: true,
    has_dressing: true,
    w: 4,
    l: 5,
    icon: <FaBed />,
  },
  {
    id: "majlis",
    counts: [1, 2, 3],
    default: 1,
    has_bath: true,
    has_dressing: false,
    w: 6,
    l: 7,
    icon: <FaUsers />,
  },
  {
    id: "living",
    counts: [1, 2, 3],
    default: 1,
    has_bath: false,
    has_dressing: false,
    w: 4,
    l: 7,
    icon: <FaRestroom />,
  },
  {
    id: "kitchen",
    counts: [1, 2],
    default: 1,
    has_bath: false,
    has_dressing: false,
    w: 5,
    l: 5,
    icon: <FaUtensils />,
  },
  {
    id: "dining",
    counts: [0, 1, 2, 3],
    default: 0,
    has_bath: false,
    has_dressing: false,
    w: 5,
    l: 5,
    icon: <FaConciergeBell />,
  },
  {
    id: "guest_bedroom",
    counts: [0, 1, 2],
    default: 0,
    has_bath: true,
    has_dressing: true,
    w: 4,
    l: 5,
    icon: <FaUserFriends />,
  },
];
const OTHER_ROOMS_CONFIG = [
  { id: "maid_room", area: 12, icon: <FaPlus /> },
  { id: "staircase_room", area: 20, icon: <FaStairs /> },
  { id: "storage_room", area: 5, icon: <FaWarehouse /> },
  { id: "prep_kitchen", area: 20, icon: <FaUtensils /> },
  { id: "driver_room", area: 20, icon: <FaCar /> },
];
const FIXED_COST_ADDONS_CONFIG = [
  { id: "pool", area: 45, cost: 228000, icon: <FaSwimmingPool /> },
  { id: "office", area: 20, cost: 38597, icon: <FaBuilding /> },
  { id: "elevator", area: 6, cost: 133380, icon: <GiElevator /> },
  { id: "cinema", area: 20, cost: 78444, icon: <FaVideo /> },
  { id: "gym", area: 20, cost: 56919, icon: <FaDumbbell /> },
];
const CHART_COLORS = [
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

// --- STYLED COMPONENTS ---
const fadeIn = keyframes`from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); }`;

const S_CalculatorWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap");
  --primary-color: #66a109;
  --primary-darker: #7ab430;
  --text-dark: #111827;
  --text-light: #6b7280;
  --bg-light: #f9fafb;
  --bg-white: #ffffff;
  --border-color: #e5e7eb;
  font-family: "Tajawal", sans-serif;
  background-color: var(--bg-light);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 50px 16px;
  direction: ${(props) => (props.isRTL ? "rtl" : "ltr")};
  @media (min-width: 768px) {
    align-items: center;
    padding: 100px 20px;
  }
`;
const S_WizardLayout = styled.div`
  width: 100%;
  max-width: 1400px;
  background: var(--bg-white);
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  @media (min-width: 768px) {
    padding: 24px;
  }
  @media (min-width: 1200px) {
    padding: 40px;
  }
`;
const S_StepContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out forwards;
`;
const S_StepContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px 0;
`;
const S_StepHeader = styled.div`
  text-align: ${(props) => (props.isRTL ? "right" : "left")};
  margin-bottom: 32px;
  h1 {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--text-dark);
    margin: 0 0 8px 0;
  }
  p {
    font-size: 1rem;
    color: var(--text-light);
    margin: 0;
    max-width: 600px;
  }
  @media (min-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.1rem;
    }
  }
`;
const S_SubSectionHeader = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-dark);
  text-align: ${(props) => (props.isRTL ? "right" : "left")};
  margin-top: 32px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--primary-color);
  &:first-of-type {
    margin-top: 10px;
  }
`;
const S_ChoiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }
`;
const S_ChoiceCard = styled.div`
  padding: 12px;
  border: 2px solid
    ${(props) =>
      props.active ? "var(--primary-color)" : "var(--border-color)"};
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) =>
    props.active ? "var(--bg-light)" : "transparent"};
  h3 {
    margin: 6px 0 0 0;
    font-size: 0.9rem;
    font-weight: 700;
  }
  svg {
    font-size: 1.8rem;
    color: ${(props) =>
      props.active ? "var(--primary-color)" : "var(--text-light)"};
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px -3px rgba(0, 0, 0, 0.05);
    border-color: var(--primary-color);
    svg {
      color: var(--primary-color);
    }
  }
  @media (min-width: 768px) {
    padding: 20px;
    h3 {
      font-size: 1rem;
    }
    svg {
      font-size: 2.2rem;
    }
  }
`;

const S_Navigation = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);
  @media (min-width: 768px) {
    flex-direction: row-reverse;
  }
`;
const S_Button = styled.button`
  padding: 14px 24px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  &.next {
    background-color: var(--primary-color);
    color: white;
    &:hover {
      background-color: var(--primary-darker);
    }
  }
  &.back {
    background-color: transparent;
    color: var(--text-light);
    &:hover {
      background-color: var(--bg-light);
    }
  }
  @media (min-width: 768px) {
    width: auto;
  }
`;
const S_RoomSection = styled.div`
  margin-bottom: 24px;
`;
const S_RoomHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  width: fit-content;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background-color: var(--bg-light);
  h3 {
    margin: 0;
    font-size: 1.2rem;
    text-align: ${(props) => (props.isRTL ? "right" : "left")};
    display: flex;
    align-items: center;
    gap: 10px;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 16px 20px;
  }
`;
const S_CountSelector = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`;
const S_CountButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  font-weight: 700;
  border: 1px solid
    ${(props) =>
      props.active ? "var(--primary-color)" : "var(--border-color)"};
  background-color: ${(props) =>
    props.active ? "var(--primary-color)" : "var(--bg-white)"};
  color: ${(props) => (props.active ? "white" : "var(--text-dark)")};
  cursor: pointer;
  transition: all 0.2s ease;
`;
const S_RoomDetailsGrid = styled.div`
  padding-top: 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
`;
const S_RoomDetailCard = styled.div`
  background-color: var(--bg-light);
  border: 1px solid #f3f4f6;
  border-radius: 16px;
  padding: 24px;
  h4 {
    font-weight: 800;
    font-size: 1.2rem;
    margin: 0 0 24px 0;
    text-align: ${(props) => (props.isRTL ? "right" : "left")};
  }
`;
const S_InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const S_InputGroup = styled.div`
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-dark);
    margin-bottom: 8px;
    text-align: ${(props) => (props.isRTL ? "right" : "left")};
  }
  input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    background-color: var(--bg-white);
    text-align: ${(props) => (props.isRTL ? "right" : "left")};
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.2s ease;
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(141, 198, 63, 0.2);
    }
  }
`;
const S_ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 0;
  border-top: 1px solid var(--border-color);
  span {
    font-weight: 500;
    font-size: 1.05rem;
    color: var(--text-dark);
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
const S_ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 46px;
  height: 26px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 26px;
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: ${(props) => (props.isRTL ? "auto" : "4px")};
      right: ${(props) => (props.isRTL ? "4px" : "auto")};
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
  input:checked + .slider {
    background-color: var(--primary-color);
  }
  input:checked + .slider:before {
    transform: ${(props) =>
      props.isRTL ? "translateX(-20px)" : "translateX(20px)"};
  }
`;
const S_ResultsPageWrapper = styled.div`
  animation: ${fadeIn} 0.6s ease-out forwards;
  text-align: center;
`;
const S_ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin: 24px 0;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin: 30px 0;
  }
`;
const S_ResultBox = styled.div`
  background: var(--bg-light);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  span {
    font-size: 1rem;
    color: var(--text-light);
    display: block;
    margin-bottom: 8px;
  }
  h2 {
    font-size: 2.1rem;
    font-weight: 800;
    margin: 0;
    color: var(--text-dark);
    direction: ltr;
  }
  &.primary {
    border-color: var(--primary-color);
    h2 {
      color: var(--primary-color);
    }
  }
  @media (min-width: 768px) {
    padding: 24px;
    span {
      font-size: 1.1rem;
    }
    h2 {
      font-size: 2.5rem;
    }
  }
`;
const S_ExtraAreaSection = styled.div`
  background: var(--bg-light);
  border-radius: 16px;
  padding: 24px;
  margin: 32px auto;
  text-align: ${(props) => (props.isRTL ? "right" : "left")};
  max-width: 400px;
  border: 1px solid var(--border-color);
  h4 {
    margin: 0 0 16px 0;
    font-size: 1.2rem;
    font-weight: 700;
  }
`;
const S_ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin-top: 40px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;
const S_BreakdownSection = styled.div`
  background: var(--bg-light);
  border-radius: 16px;
  padding: 16px;
  margin-top: 32px;
  text-align: ${(props) => (props.isRTL ? "right" : "left")};
  @media (min-width: 768px) {
    padding: 32px;
    margin-top: 40px;
  }
`;
const S_BreakdownLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 24px;
  @media (min-width: 992px) {
    grid-template-columns: 320px 1fr;
    gap: 30px;
    align-items: flex-start;
  }
`;
const S_ChartContainer = styled.div`
  position: relative;
  padding: 16px;
  border-radius: 16px;
  background-color: var(--bg-white);
  border: 1px solid var(--border-color);
  @media (min-width: 992px) {
    position: sticky;
    top: 20px;
    padding: 24px;
  }
`;
const S_TotalInChart = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  h2 {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--text-dark);
  }
  span {
    color: var(--text-light);
  }
  @media (min-width: 768px) {
    h2 {
      font-size: 2rem;
    }
  }
`;
const S_BreakdownList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  @media (min-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
`;
const S_BreakdownItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 12px;
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px -4px rgba(0, 0, 0, 0.08);
  }
  .label-group {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    text-align: ${(props) => (props.isRTL ? "right" : "left")};
  }
  .label-group span {
    font-weight: 500;
    color: var(--text-dark);
  }
  .cost {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-dark);
    direction: ltr;
    text-align: ${(props) => (props.isRTL ? "right" : "left")};
    margin-top: auto;
    padding-top: 10px;
    border-top: 1px solid var(--border-color);
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;
const S_ColorDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${(props) => props.color};
`;
const S_IntroLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  animation: ${fadeIn} 0.6s ease-out forwards;
  min-height: 60vh;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const S_IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: ${(props) => (props.isRTL ? "right" : "left")};
  padding: 2rem;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--bg-light) 0%, #ffffff 100%);
  @media (max-width: 991px) {
    text-align: center;
    align-items: center;
  }
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--text-dark);
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.1rem;
    color: var(--text-light);
    line-height: 1.7;
    margin-bottom: 2rem;
    max-width: 500px;
  }
`;
const S_LogoPlaceholder = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  object-fit: contain;
`;
const S_ModeSelectionArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
`;
const S_ModeChoiceCard = styled.div`
  padding: 2rem;
  border: 2px solid var(--border-color);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: transparent;
  text-align: ${(props) => (props.isRTL ? "right" : "left")};
  .icon-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  svg {
    font-size: 2.5rem;
    color: var(--primary-color);
    transition: all 0.2s ease-in-out;
  }
  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-dark);
  }
  p {
    margin: 0;
    font-size: 1rem;
    color: var(--text-light);
    line-height: 1.6;
  }
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.07);
    border-color: var(--primary-color);
  }
`;

// --- Reusable Components ---
const CostPieChart = ({ breakdownDetails, isRTL }) => {
  const data = {
    labels: breakdownDetails.map((item) => item.name),
    datasets: [
      {
        data: breakdownDetails.map((item) => item.cost),
        backgroundColor: CHART_COLORS,
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };
  const options = {
    responsive: true,
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: {
        rtl: isRTL,
        textDirection: isRTL ? "rtl" : "ltr",
        callbacks: {
          label: (context) =>
            `${context.label || ""}: ${Math.round(
              context.parsed || 0
            ).toLocaleString()} ${isRTL ? "د.إ" : "AED"}`,
        },
      },
    },
    animation: { animateRotate: true, animateScale: true, duration: 1200 },
  };
  return <Doughnut data={data} options={options} />;
};

const getInitialState = () => ({
  location: "dubai",
  designStyle: "modern",
  finishing: "standard",
  parking: 2,
  basement: false,
  rooms: initializeRoomsState(),
  otherRooms: OTHER_ROOMS_CONFIG.reduce(
    (acc, room) => ({ ...acc, [room.id]: false }),
    {}
  ),
  fixedAddons: FIXED_COST_ADDONS_CONFIG.reduce(
    (acc, addon) => ({ ...acc, [addon.id]: false }),
    {}
  ),
});
const initializeRoomsState = () => {
  const state = {};
  ROOM_CONFIG.forEach((room) => {
    state[room.id] = {
      count: room.default,
      details: Array.from({ length: Math.max(...room.counts, 0) + 1 }, () => ({
        w: room.w,
        l: room.l,
        bath: false,
        dressing: false,
      })),
    };
  });
  return state;
};

// --- Client Component ---
export default function VillaCalculatorClient({ lang, dictionary }) {
  const isRTL = lang === "ar";
  const [calculationMode, setCalculationMode] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [selections, setSelections] = useState(getInitialState());
  const [quickSelections, setQuickSelections] = useState({
    bua: 500,
    location: "dubai",
    finishing: "standard",
  });
  const [extraArea, setExtraArea] = useState(0);

  const calculationResult = useMemo(() => {
    let finalTotalBUA,
      totalFixedAddonCost = 0;

    if (calculationMode === "quick") {
      finalTotalBUA = quickSelections.bua || 0;
    } else {
      let totalCoreArea = 0;
      Object.keys(selections.rooms).forEach((id) => {
        const room = selections.rooms[id];
        for (let i = 0; i < room.count; i++) {
          const d = room.details[i];
          totalCoreArea += (d.w || 0) * (d.l || 0);
          if (d.bath) totalCoreArea += PRICING_DATA.area_addons.bathroom;
          if (d.dressing)
            totalCoreArea += PRICING_DATA.area_addons.dressing_room;
        }
      });
      OTHER_ROOMS_CONFIG.forEach(
        (r) => selections.otherRooms[r.id] && (totalCoreArea += r.area)
      );
      FIXED_COST_ADDONS_CONFIG.forEach(
        (a) =>
          selections.fixedAddons[a.id] &&
          ((totalCoreArea += a.area), (totalFixedAddonCost += a.cost))
      );
      if (selections.basement)
        totalCoreArea *= PRICING_DATA.factors.basement_multiplier;

      const bua_before_buffer =
        totalCoreArea * PRICING_DATA.factors.circulation_multiplier;
      finalTotalBUA = bua_before_buffer + extraArea;
    }

    const finishing =
      calculationMode === "quick"
        ? quickSelections.finishing
        : selections.finishing;
    const location =
      calculationMode === "quick"
        ? quickSelections.location
        : selections.location;

    const costs = PRICING_DATA.cost_breakdown_per_sqm[finishing];
    const baseBreakdownDetails = Object.keys(costs).map((key) => ({
      name: dictionary.itemTranslations[key],
      cost: costs[key] * finalTotalBUA,
    }));
    const locationMultiplier = LOCATION_PRICING_FACTORS[location] || 1.0;
    const adjustedBreakdownDetails = baseBreakdownDetails.map((item) => ({
      ...item,
      cost: item.cost * locationMultiplier,
    }));
    const adjustedConstructionCost = adjustedBreakdownDetails.reduce(
      (sum, item) => sum + item.cost,
      0
    );
    const finalBreakdownForDisplay = [...adjustedBreakdownDetails];
    if (totalFixedAddonCost > 0)
      finalBreakdownForDisplay.push({
        name: dictionary.itemTranslations.fixed_addons_cost,
        cost: totalFixedAddonCost,
      });
    const finalTotalPrice = adjustedConstructionCost + totalFixedAddonCost;

    return {
      totalBUA: finalTotalBUA,
      totalPrice: finalTotalPrice,
      breakdownDetails: finalBreakdownForDisplay,
    };
  }, [selections, quickSelections, calculationMode, extraArea, dictionary]);

  const handleReset = () => {
    setShowResults(false);
    setSelections(getInitialState());
    setQuickSelections({ bua: 500, location: "dubai", finishing: "standard" });
    setCalculationMode(null);
    setExtraArea(0);
  };

  const handleShowResult = () => setShowResults(true);
  const handleExtraAreaChange = (e) =>
    setExtraArea(parseFloat(e.target.value) || 0);

  const handleDownloadPdf = async () => {
    const element = document.getElementById("pdf-content");
    if (!element) {
      console.error("PDF content element not found.");
      return;
    }

    const elementsToHide = element.querySelectorAll(".pdf-exclude");
    elementsToHide.forEach((el) => (el.style.display = "none"));

    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      logging: true,
      allowTaint: true,
      letterRendering: true,
    });

    elementsToHide.forEach((el) => (el.style.display = ""));

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    const logoUrl = "/assets/Khales Logo K - favicon.png";
    const img = new Image();
    img.src = logoUrl;

    img.onload = () => {
      const totalPages = pdf.internal.getNumberOfPages();
      const watermarkGState = new GState({
        opacity: 0.1,
        "stroke-opacity": 0.1,
      });

      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.saveGraphicsState();
        pdf.setGState(watermarkGState);

        const imgWidth = 80;
        const imgHeight = (img.height * imgWidth) / img.width;
        const x = (pdfWidth - imgWidth) / 2;
        const y = (pdfHeight - imgHeight) / 2;

        pdf.addImage(img, "PNG", x, y, imgWidth, imgHeight);

        pdf.restoreGraphicsState();
      }
      pdf.save(
        `Villa_Calculation_Results_${new Date().toISOString().slice(0, 10)}.pdf`
      );
    };

    img.onerror = () => {
      console.error("Failed to load logo image for watermark.");
      pdf.save(
        `Villa_Calculation_Results_${new Date().toISOString().slice(0, 10)}.pdf`
      );
    };
  };

  // --- Render Functions ---

  const renderModeSelector = () => (
    <S_IntroLayout>
      <S_IntroContent isRTL={isRTL}>
        <S_LogoPlaceholder src="https://i.ibb.co/S71HLHbn/download.png" />
        <h1>{dictionary.introTitle}</h1>
        <p>{dictionary.introDescription}</p>
      </S_IntroContent>
      <S_ModeSelectionArea>
        <S_ModeChoiceCard
          isRTL={isRTL}
          onClick={() => setCalculationMode("detailed")}
        >
          <div className="icon-title">
            <FaDraftingCompass />
            <h3>{dictionary.detailedModeTitle}</h3>
          </div>
          <p>{dictionary.detailedModeDescription}</p>
        </S_ModeChoiceCard>
        <S_ModeChoiceCard
          isRTL={isRTL}
          onClick={() => setCalculationMode("quick")}
        >
          <div className="icon-title">
            <FaRuler />
            <h3>{dictionary.quickModeTitle}</h3>
          </div>
          <p>{dictionary.quickModeDescription}</p>
        </S_ModeChoiceCard>
      </S_ModeSelectionArea>
    </S_IntroLayout>
  );

  const renderQuickCalculator = () => (
    <S_StepContainer>
      <S_StepHeader isRTL={isRTL}>
        <h1>{dictionary.quickTitle}</h1>
        <p>{dictionary.quickDescription}</p>
      </S_StepHeader>
      <S_StepContent>
        <S_SubSectionHeader isRTL={isRTL}>
          {dictionary.projectDetails}
        </S_SubSectionHeader>
        <S_InputGroup
          isRTL={isRTL}
          style={{ maxWidth: "400px", margin: "0 auto 30px" }}
        >
          <label>{dictionary.totalBUA}</label>
          <input
            type="number"
            value={quickSelections.bua}
            onChange={(e) =>
              setQuickSelections((s) => ({
                ...s,
                bua: parseFloat(e.target.value) || 0,
              }))
            }
          />
        </S_InputGroup>

        <S_SubSectionHeader isRTL={isRTL}>
          {dictionary.location}
        </S_SubSectionHeader>
        <S_ChoiceGrid>
          {Object.keys(LOCATION_PRICING_FACTORS).map((locId) => (
            <S_ChoiceCard
              key={locId}
              active={quickSelections.location === locId}
              onClick={() =>
                setQuickSelections((s) => ({ ...s, location: locId }))
              }
            >
              <FaMapMarkerAlt />
              <h3>{dictionary.locations[locId]}</h3>
            </S_ChoiceCard>
          ))}
        </S_ChoiceGrid>

        <S_SubSectionHeader isRTL={isRTL}>
          {dictionary.finishingLevel}
        </S_SubSectionHeader>
        <S_ChoiceGrid>
          {Object.keys(PRICING_DATA.cost_breakdown_per_sqm).map((finId) => (
            <S_ChoiceCard
              key={finId}
              active={quickSelections.finishing === finId}
              onClick={() =>
                setQuickSelections((s) => ({ ...s, finishing: finId }))
              }
            >
              <FaStar />
              <h3>{dictionary.finishings[finId]}</h3>
            </S_ChoiceCard>
          ))}
        </S_ChoiceGrid>
      </S_StepContent>
      <S_Navigation>
        <S_Button className="back" onClick={() => setCalculationMode(null)}>
          {dictionary.back}
        </S_Button>
        <S_Button className="next" onClick={handleShowResult}>
          {dictionary.showResult}
        </S_Button>
      </S_Navigation>
    </S_StepContainer>
  );

  const renderDetailedCalculator = () => (
    <S_StepContainer>
      <S_StepHeader isRTL={isRTL}>
        <h1>{dictionary.detailedTitle}</h1>
        <p>{dictionary.detailedDescription}</p>
      </S_StepHeader>
      <S_StepContent>
        {/* --- Section 1: Basic Properties --- */}
        <S_SubSectionHeader isRTL={isRTL}>
          {dictionary.basicProperties}
        </S_SubSectionHeader>
        <S_ChoiceGrid>
          {Object.keys(LOCATION_PRICING_FACTORS).map((locId) => (
            <S_ChoiceCard
              key={locId}
              active={selections.location === locId}
              onClick={() => setSelections((s) => ({ ...s, location: locId }))}
            >
              <FaMapMarkerAlt />
              <h3>{dictionary.locations[locId]}</h3>
            </S_ChoiceCard>
          ))}
        </S_ChoiceGrid>
        <S_SubSectionHeader isRTL={isRTL}>
          {dictionary.architecturalStyle}
        </S_SubSectionHeader>
        <S_ChoiceGrid>
          {Object.keys(dictionary.styles).map((styleId) => (
            <S_ChoiceCard
              key={styleId}
              active={selections.designStyle === styleId}
              onClick={() =>
                setSelections((s) => ({ ...s, designStyle: styleId }))
              }
            >
              <FaPalette /> <h3>{dictionary.styles[styleId]}</h3>
            </S_ChoiceCard>
          ))}
        </S_ChoiceGrid>
        <S_SubSectionHeader isRTL={isRTL}>
          {dictionary.finishingLevel}
        </S_SubSectionHeader>
        <S_ChoiceGrid>
          {Object.keys(dictionary.finishings).map((finId) => (
            <S_ChoiceCard
              key={finId}
              active={selections.finishing === finId}
              onClick={() => setSelections((s) => ({ ...s, finishing: finId }))}
            >
              <FaStar /> <h3>{dictionary.finishings[finId]}</h3>
            </S_ChoiceCard>
          ))}
        </S_ChoiceGrid>

        {/* --- Section 2: Rooms and Spaces --- */}
        <S_SubSectionHeader isRTL={isRTL}>
          {dictionary.roomsAndSpaces}
        </S_SubSectionHeader>
        {ROOM_CONFIG.map((room) => (
          <S_RoomSection key={room.id}>
            <S_RoomHeader isRTL={isRTL}>
              <h3>
                {room.icon} {dictionary.roomNames[room.id]}
              </h3>
              <S_CountSelector>
                {room.counts.map((c) => (
                  <S_CountButton
                    key={c}
                    active={selections.rooms[room.id].count === c}
                    onClick={() =>
                      setSelections((s) => ({
                        ...s,
                        rooms: {
                          ...s.rooms,
                          [room.id]: { ...s.rooms[room.id], count: c },
                        },
                      }))
                    }
                  >
                    {c}
                  </S_CountButton>
                ))}
              </S_CountSelector>
            </S_RoomHeader>
            {selections.rooms[room.id].count > 0 && (
              <S_RoomDetailsGrid>
                {Array.from({ length: selections.rooms[room.id].count }).map(
                  (_, i) => (
                    <S_RoomDetailCard key={i} isRTL={isRTL}>
                      <h4>
                        {dictionary.roomNames[room.id]} {i + 1}
                      </h4>
                      <S_InputGrid>
                        <S_InputGroup isRTL={isRTL}>
                          <label>
                            <FaExpandArrowsAlt /> {dictionary.widthLabel}
                          </label>
                          <input
                            type="number"
                            value={selections.rooms[room.id].details[i].w}
                            onChange={(e) => {
                              const newDetails = [
                                ...selections.rooms[room.id].details,
                              ];
                              newDetails[i].w = parseFloat(e.target.value) || 0;
                              setSelections((s) => ({
                                ...s,
                                rooms: {
                                  ...s.rooms,
                                  [room.id]: {
                                    ...s.rooms[room.id],
                                    details: newDetails,
                                  },
                                },
                              }));
                            }}
                          />
                        </S_InputGroup>
                        <S_InputGroup isRTL={isRTL}>
                          <label>
                            <FaRulerCombined /> {dictionary.lengthLabel}
                          </label>
                          <input
                            type="number"
                            value={selections.rooms[room.id].details[i].l}
                            onChange={(e) => {
                              const newDetails = [
                                ...selections.rooms[room.id].details,
                              ];
                              newDetails[i].l = parseFloat(e.target.value) || 0;
                              setSelections((s) => ({
                                ...s,
                                rooms: {
                                  ...s.rooms,
                                  [room.id]: {
                                    ...s.rooms[room.id],
                                    details: newDetails,
                                  },
                                },
                              }));
                            }}
                          />
                        </S_InputGroup>
                      </S_InputGrid>
                      {room.has_bath && (
                        <S_ToggleRow>
                          <span>
                            <FaRestroom /> {dictionary.addBathroom}
                          </span>
                          <S_ToggleSwitch isRTL={isRTL}>
                            <input
                              type="checkbox"
                              checked={
                                selections.rooms[room.id].details[i].bath
                              }
                              onChange={() => {
                                const newDetails = [
                                  ...selections.rooms[room.id].details,
                                ];
                                newDetails[i].bath = !newDetails[i].bath;
                                setSelections((s) => ({
                                  ...s,
                                  rooms: {
                                    ...s.rooms,
                                    [room.id]: {
                                      ...s.rooms[room.id],
                                      details: newDetails,
                                    },
                                  },
                                }));
                              }}
                            />
                            <span className="slider"></span>
                          </S_ToggleSwitch>
                        </S_ToggleRow>
                      )}
                      {room.has_dressing && (
                        <S_ToggleRow>
                          <span>
                            <FaTshirt /> {dictionary.addDressingRoom}
                          </span>
                          <S_ToggleSwitch isRTL={isRTL}>
                            <input
                              type="checkbox"
                              checked={
                                selections.rooms[room.id].details[i].dressing
                              }
                              onChange={() => {
                                const newDetails = [
                                  ...selections.rooms[room.id].details,
                                ];
                                newDetails[i].dressing =
                                  !newDetails[i].dressing;
                                setSelections((s) => ({
                                  ...s,
                                  rooms: {
                                    ...s.rooms,
                                    [room.id]: {
                                      ...s.rooms[room.id],
                                      details: newDetails,
                                    },
                                  },
                                }));
                              }}
                            />
                            <span className="slider"></span>
                          </S_ToggleSwitch>
                        </S_ToggleRow>
                      )}
                    </S_RoomDetailCard>
                  )
                )}
              </S_RoomDetailsGrid>
            )}
          </S_RoomSection>
        ))}

        {/* --- Section 3: Add-ons and Facilities --- */}
        <S_SubSectionHeader isRTL={isRTL}>
          {dictionary.addonsAndFacilities}
        </S_SubSectionHeader>
        <S_ChoiceGrid>
          {OTHER_ROOMS_CONFIG.map((r) => (
            <S_ChoiceCard
              key={r.id}
              active={selections.otherRooms[r.id]}
              onClick={() =>
                setSelections((s) => ({
                  ...s,
                  otherRooms: { ...s.otherRooms, [r.id]: !s.otherRooms[r.id] },
                }))
              }
            >
              {r.icon}
              <h3>{dictionary.otherRoomNames[r.id]}</h3>
            </S_ChoiceCard>
          ))}
          <S_ChoiceCard
            active={selections.basement}
            onClick={() =>
              setSelections((s) => ({ ...s, basement: !s.basement }))
            }
          >
            <FaMinus />
            <h3>{dictionary.basement}</h3>
          </S_ChoiceCard>
        </S_ChoiceGrid>
        <S_SubSectionHeader isRTL={isRTL}>
          {dictionary.luxuryAddons}
        </S_SubSectionHeader>
        <S_ChoiceGrid>
          {FIXED_COST_ADDONS_CONFIG.map((a) => (
            <S_ChoiceCard
              key={a.id}
              active={selections.fixedAddons[a.id]}
              onClick={() =>
                setSelections((s) => ({
                  ...s,
                  fixedAddons: {
                    ...s.fixedAddons,
                    [a.id]: !s.fixedAddons[a.id],
                  },
                }))
              }
            >
              {a.icon}
              <h3>{dictionary.fixedAddonNames[a.id]}</h3>
            </S_ChoiceCard>
          ))}
        </S_ChoiceGrid>
        <S_SubSectionHeader isRTL={isRTL}>
          {dictionary.parking}
        </S_SubSectionHeader>
        <S_ChoiceGrid>
          {[0, 1, 2, 3, 4].map((c) => (
            <S_ChoiceCard
              key={c}
              active={selections.parking === c}
              onClick={() => setSelections((s) => ({ ...s, parking: c }))}
            >
              <FaCar />
              <h3>{c}</h3>
            </S_ChoiceCard>
          ))}
        </S_ChoiceGrid>
      </S_StepContent>
      <S_Navigation>
        <S_Button className="back" onClick={() => setCalculationMode(null)}>
          {dictionary.back}
        </S_Button>
        <S_Button className="next" onClick={handleShowResult}>
          {dictionary.showResult}
        </S_Button>
      </S_Navigation>
    </S_StepContainer>
  );

  const renderResults = () => {
    return (
      <S_ResultsPageWrapper id="pdf-content">
        {" "}
        {/* Add id for targeting */}
        <S_StepHeader isRTL={isRTL} style={{ textAlign: "center" }}>
          <h1>{dictionary.resultsTitle}</h1>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            {dictionary.resultsDescription}
          </p>
        </S_StepHeader>
        <S_ResultsGrid>
          <S_ResultBox>
            <span>{dictionary.totalBUAResult}</span>
            <h2>{calculationResult.totalBUA.toFixed(2)} m²</h2>
          </S_ResultBox>
          <S_ResultBox>
            <span>{dictionary.totalBUAResultSqft}</span>
            <h2>{(calculationResult.totalBUA * 10.764).toFixed(2)} sqft</h2>
          </S_ResultBox>
          <S_ResultBox className="primary">
            <span>{dictionary.totalCostResult}</span>
            <h2>
              {Math.round(calculationResult.totalPrice).toLocaleString()}
              {isRTL ? " د.إ" : " AED"}
            </h2>
          </S_ResultBox>
        </S_ResultsGrid>
        {calculationMode === "detailed" && (
          <S_ExtraAreaSection isRTL={isRTL}>
            <h4>{dictionary.extraAreaSectionTitle}</h4>
            <S_InputGroup isRTL={isRTL}>
              <label>{dictionary.extraAreaLabel}</label>
              <input
                type="number"
                value={extraArea === 0 ? "" : extraArea}
                onChange={handleExtraAreaChange}
                placeholder="e.g., 50"
              />
            </S_InputGroup>
          </S_ExtraAreaSection>
        )}
        <S_BreakdownSection isRTL={isRTL}>
          <S_SubSectionHeader
            isRTL={isRTL}
            style={{
              border: "none",
              margin: "0 0 16px 0",
              padding: 0,
              fontSize: "1.4rem",
            }}
          >
            {dictionary.costBreakdownTitle}
          </S_SubSectionHeader>
          <S_BreakdownLayout>
            <S_ChartContainer>
              <CostPieChart
                breakdownDetails={calculationResult.breakdownDetails}
                isRTL={isRTL}
              />
              <S_TotalInChart>
                <h2>
                  {Math.round(calculationResult.totalPrice).toLocaleString()}
                </h2>
                <span>{isRTL ? "د.إ" : "AED"}</span>
              </S_TotalInChart>
            </S_ChartContainer>
            <S_BreakdownList>
              {calculationResult.breakdownDetails.map((item, index) => (
                <S_BreakdownItem key={index} isRTL={isRTL}>
                  <div className="label-group">
                    <S_ColorDot
                      color={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="cost">
                    {Math.round(item.cost).toLocaleString()}
                    {isRTL ? " د.إ" : " AED"}
                  </span>
                </S_BreakdownItem>
              ))}
            </S_BreakdownList>
          </S_BreakdownLayout>
        </S_BreakdownSection>
        <S_ActionButtonsContainer>
          <S_Button className="back pdf-exclude" onClick={handleReset}>
            {dictionary.startOver}
          </S_Button>
          <S_Button
            as={Link}
            href={`/${lang}/Contact`}
            className="next pdf-exclude"
            style={{ fontSize: "1.2rem", textDecoration: "none" }}
          >
            {dictionary.bookConsultation}
          </S_Button>
          {/* --- MODIFICATION --- */}
          {/* Added the 'pdf-exclude' className to this button */}
          <S_Button
            className="next pdf-exclude"
            onClick={handleDownloadPdf}
            style={{ fontSize: "1.2rem", textDecoration: "none" }}
          >
            {dictionary.downloadPdf || "Download PDF"}
          </S_Button>
        </S_ActionButtonsContainer>
      </S_ResultsPageWrapper>
    );
  };

  return (
    <S_CalculatorWrapper isRTL={isRTL}>
      <S_WizardLayout>
        {!calculationMode
          ? renderModeSelector()
          : !showResults
          ? calculationMode === "detailed"
            ? renderDetailedCalculator()
            : renderQuickCalculator()
          : renderResults()}
      </S_WizardLayout>
    </S_CalculatorWrapper>
  );
}
