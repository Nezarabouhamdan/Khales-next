"use client";

import React, { useState, useMemo, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components we will use
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
    name: "غرف النوم",
    counts: [1, 2, 3, 4, 5, 6, 7, 8],
    default: 1,
    has_bath: true,
    has_dressing: true,
    w: 4,
    l: 5,
  },
  {
    id: "majlis",
    name: "المجلس",
    counts: [1, 2, 3],
    default: 1,
    has_bath: true,
    has_dressing: false,
    w: 6,
    l: 7,
  },
  {
    id: "living",
    name: "غرف المعيشة",
    counts: [1, 2, 3],
    default: 1,
    has_bath: false,
    has_dressing: false,
    w: 4,
    l: 7,
  },
  {
    id: "kitchen",
    name: "المطبخ",
    counts: [1, 2],
    default: 1,
    has_bath: false,
    has_dressing: false,
    w: 5,
    l: 5,
  },
  {
    id: "dining",
    name: "غرفة الطعام",
    counts: [0, 1, 2, 3],
    default: 0,
    has_bath: false,
    has_dressing: false,
    w: 5,
    l: 5,
  },
  {
    id: "guest_bedroom",
    name: "غرفة نوم الضيوف",
    counts: [0, 1, 2],
    default: 0,
    has_bath: true,
    has_dressing: true,
    w: 4,
    l: 5,
  },
];
const OTHER_ROOMS_CONFIG = [
  { id: "maid_room", name: "غرفة خادمة", area: 12 },
  { id: "storage_room", name: "غرفة تخزين", area: 5 },
  { id: "prep_kitchen", name: "مطبخ تحضيري", area: 20 },
  { id: "driver_room", name: "غرفة للسائق", area: 20 },
];
const FIXED_COST_ADDONS_CONFIG = [
  { id: "pool", name: "مسبح", area: 45, cost: 228000 },
  { id: "office", name: "مكتب", area: 20, cost: 38597 },
  { id: "elevator", name: "مصعد", area: 6, cost: 133380 },
  { id: "cinema", name: "صالة سينما", area: 20, cost: 78444 },
  { id: "gym", name: "صالة رياضية", area: 20, cost: 56919 },
];
const ITEM_TRANSLATIONS = {
  preparatory: "الأعمال التمهيدية",
  excavation_substructure: "أعمال الحفر والبنية التحتية",
  superstructure: "أعمال الهيكل العلوي",
  blockwork: "أعمال البناء",
  waterproofing: "أعمال العزل المائي",
  main_finishing: "أعمال التشطيب",
  carpentry: "أعمال النجارة",
  aluminum_glass: "أعمال الألمنيوم والزجاج",
  electrical: "أعمال الكهرباء",
  hvac: "أعمال التكييف",
  plumbing: "أعمال السباكة",
  external_works: "الأعمال الخارجية",
  contingencies: "نفقات غير متوقّعة",
  consultant_fees: "أتعاب الاستشاري",
};
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

// --- STYLED COMPONENTS (with Mobile Optimizations) ---
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
  padding: 100px 16px; // Reduced padding for mobile
  direction: rtl;
  @media (min-width: 768px) {
    align-items: center;
    padding: 100px 20px;
  }
`;
const S_WizardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  max-width: 1400px;
  background: var(--bg-white);
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  padding: 16px; // Reduced padding for mobile
  @media (min-width: 768px) {
    padding: 24px;
  }
  @media (min-width: 1200px) {
    gap: 60px;
    min-height: 85vh;
    padding: 40px;
  }
`;
const S_StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.5s ease-out forwards;
`;
const S_StepContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px 0;
`;
const S_ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
`;
const S_ProgressBar = styled.div`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: var(--primary-color);
  transition: width 0.4s ease-out;
`;
const S_StepHeader = styled.div`
  text-align: right;
  margin-bottom: 32px;
  h1 {
    font-size: 1.8rem; // Smaller on mobile
    font-weight: 800;
    color: var(--text-dark);
    margin: 0 0 8px 0;
  }
  p {
    font-size: 1rem;
    color: var(--text-light);
    margin: 0;
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
  text-align: right;
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
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }
`;
const S_ChoiceCard = styled.div`
  padding: 16px;
  border: 2px solid
    ${(props) =>
      props.active ? "var(--primary-color)" : "var(--border-color)"};
  border-radius: 16px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) =>
    props.active ? "var(--bg-light)" : "transparent"};
  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
    border-color: var(--primary-color);
  }
  @media (min-width: 768px) {
    padding: 24px;
    h3 {
      font-size: 1.2rem;
    }
  }
`;
const S_Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  gap: 16px;
  margin-top: auto;
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
    padding: 14px 32px;
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
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background-color: var(--bg-light);
  h3 {
    margin: 0;
    font-size: 1.2rem;
    text-align: right;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
    text-align: right;
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
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-dark);
    margin-bottom: 8px;
    text-align: right;
  }
  input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    background-color: var(--bg-white);
    text-align: right;
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
      left: 4px;
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
    transform: translateX(20px);
  }
`;
// --- STYLES FOR RESULTS PAGE (with Mobile Optimizations) ---
const S_ResultsPageWrapper = styled.div`
  animation: ${fadeIn} 0.6s ease-out forwards;
  text-align: center;
  h1 {
    font-size: 1.8rem;
    @media (min-width: 768px) {
      font-size: 2.2rem;
    }
  }
  p {
    font-size: 1rem;
    max-width: 600px;
    margin: 8px auto 0;
    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;
const S_ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin: 24px 0;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
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
    font-size: 2.1rem; // Adjusted for mobile
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
const S_ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
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
  padding: 16px; // Reduced padding for mobile
  margin-top: 32px;
  text-align: right;
  @media (min-width: 768px) {
    padding: 32px;
    margin-top: 40px;
  }
`;
const S_BreakdownLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr; // Single column on mobile
  gap: 24px;
  margin-top: 24px;
  @media (min-width: 992px) {
    grid-template-columns: 320px 1fr; // Two columns on desktop
    gap: 30px;
    align-items: flex-start;
  }
`;
const S_ChartContainer = styled.div`
  position: relative; // No sticky on mobile
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
    font-size: 1.8rem; // Adjusted for mobile
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
  grid-template-columns: 1fr; // Single column on small screens
  gap: 12px;
  @media (min-width: 576px) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(250px, 1fr)
    ); // Grid on larger screens
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
  }
  .label-group span {
    font-weight: 500;
    color: var(--text-dark);
  }
  .cost {
    font-size: 1.4rem; // Adjusted for mobile
    font-weight: 700;
    color: var(--primary-darker);
    direction: ltr;
    text-align: right;
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
// --- Pie Chart Component ---
const CostPieChart = ({ breakdownDetails }) => {
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
        rtl: true,
        textDirection: "rtl",
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            return `${label}: ${Math.round(value).toLocaleString()} د.إ`;
          },
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

// --- Main Component ---
const VillaCalculatorPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const TOTAL_STEPS = 3;
  const [selections, setSelections] = useState(getInitialState());

  const calculationResult = useMemo(() => {
    let totalCoreArea = 0;
    let totalFixedAddonCost = 0;
    Object.keys(selections.rooms).forEach((id) => {
      const room = selections.rooms[id];
      for (let i = 0; i < room.count; i++) {
        const d = room.details[i];
        totalCoreArea += (d.w || 0) * (d.l || 0);
        if (d.bath) totalCoreArea += PRICING_DATA.area_addons.bathroom;
        if (d.dressing) totalCoreArea += PRICING_DATA.area_addons.dressing_room;
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
    if (selections.basement) {
      totalCoreArea *= PRICING_DATA.factors.basement_multiplier;
    }
    const totalBUA =
      totalCoreArea * PRICING_DATA.factors.circulation_multiplier;
    const costs = PRICING_DATA.cost_breakdown_per_sqm[selections.finishing];
    const baseBreakdownDetails = Object.keys(costs).map((key) => ({
      name: ITEM_TRANSLATIONS[key],
      cost: costs[key] * totalBUA,
    }));
    const locationMultiplier =
      LOCATION_PRICING_FACTORS[selections.location] || 1.0;
    const adjustedBreakdownDetails = baseBreakdownDetails.map((item) => ({
      ...item,
      cost: item.cost * locationMultiplier,
    }));
    const adjustedConstructionCost = adjustedBreakdownDetails.reduce(
      (sum, item) => sum + item.cost,
      0
    );
    const finalBreakdownForDisplay = [...adjustedBreakdownDetails];
    if (totalFixedAddonCost > 0) {
      finalBreakdownForDisplay.push({
        name: "تكلفة الإضافات الثابتة",
        cost: totalFixedAddonCost,
      });
    }
    const finalTotalPrice = adjustedConstructionCost + totalFixedAddonCost;
    return {
      totalBUA,
      totalPrice: finalTotalPrice,
      breakdownDetails: finalBreakdownForDisplay,
    };
  }, [selections]);

  const handleSimpleChange = (field, value) =>
    setSelections((prev) => ({ ...prev, [field]: value }));
  const handleCheckboxChange = (group, id) =>
    setSelections((prev) => ({
      ...prev,
      [group]: { ...prev[group], [id]: !prev[group][id] },
    }));
  const handleRoomCountChange = (id, count) =>
    setSelections((prev) => ({
      ...prev,
      rooms: { ...prev.rooms, [id]: { ...prev.rooms[id], count } },
    }));
  const handleRoomDetailChange = (id, i, field, value) => {
    setSelections((prev) => {
      const newDetails = [...prev.rooms[id].details];
      newDetails[i] = {
        ...newDetails[i],
        [field]: typeof value === "boolean" ? value : parseFloat(value) || 0,
      };
      return {
        ...prev,
        rooms: {
          ...prev.rooms,
          [id]: { ...prev.rooms[id], details: newDetails },
        },
      };
    });
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS + 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const handleReset = () => {
    setCurrentStep(1);
    setSelections(getInitialState());
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <S_StepHeader>
              <h1>الخصائص الأساسية</h1>
              <p>اختر الموقع، الطراز، ومستوى التشطيب لمشروعك.</p>
            </S_StepHeader>
            <S_StepContent>
              <S_SubSectionHeader>الموقع</S_SubSectionHeader>
              <S_ChoiceGrid>
                {[
                  { id: "abu_dhabi", name: "أبوظبي" },
                  { id: "dubai", name: "دبي" },
                  { id: "sharjah", name: "الشارقة" },
                  { id: "ajman", name: "عجمان" },
                  { id: "umm_al_quwain", name: "أم القيوين" },
                  { id: "ras_al_khaimah", name: "رأس الخيمة" },
                  { id: "fujairah", name: "الفجيرة" },
                  { id: "al_ain", name: "العين" },
                ].map((loc) => (
                  <S_ChoiceCard
                    key={loc.id}
                    active={selections.location === loc.id}
                    onClick={() => handleSimpleChange("location", loc.id)}
                  >
                    <h3>{loc.name}</h3>
                  </S_ChoiceCard>
                ))}
              </S_ChoiceGrid>
              <S_SubSectionHeader>الطراز المعماري</S_SubSectionHeader>
              <S_ChoiceGrid>
                {["modern", "neoclassic", "heritage"].map((style) => (
                  <S_ChoiceCard
                    key={style}
                    active={selections.designStyle === style}
                    onClick={() => handleSimpleChange("designStyle", style)}
                  >
                    <h3>
                      {
                        {
                          modern: "عصري",
                          neoclassic: "نيو كلاسيكي",
                          heritage: "تراثي",
                        }[style]
                      }
                    </h3>
                  </S_ChoiceCard>
                ))}
              </S_ChoiceGrid>
              <S_SubSectionHeader>مستوى التشطيب</S_SubSectionHeader>
              <S_ChoiceGrid>
                {["standard", "medium", "high"].map((fin) => (
                  <S_ChoiceCard
                    key={fin}
                    active={selections.finishing === fin}
                    onClick={() => handleSimpleChange("finishing", fin)}
                  >
                    <h3>
                      {
                        { standard: "أساسي", medium: "متوسط", high: "فاخر" }[
                          fin
                        ]
                      }
                    </h3>
                  </S_ChoiceCard>
                ))}
              </S_ChoiceGrid>
            </S_StepContent>
          </>
        );
      case 2:
        return (
          <>
            <S_StepHeader>
              <h1>تحديد الغرف والمساحات</h1>
              <p>حدد عدد وأبعاد الغرف الرئيسية في الفيلا.</p>
            </S_StepHeader>
            <S_StepContent>
              {ROOM_CONFIG.map((room) => (
                <S_RoomSection key={room.id}>
                  <S_RoomHeader>
                    <h3>{room.name}</h3>
                    <S_CountSelector>
                      {room.counts.map((c) => (
                        <S_CountButton
                          key={c}
                          active={selections.rooms[room.id].count === c}
                          onClick={() => handleRoomCountChange(room.id, c)}
                        >
                          {c}
                        </S_CountButton>
                      ))}
                    </S_CountSelector>
                  </S_RoomHeader>
                  {selections.rooms[room.id].count > 0 && (
                    <S_RoomDetailsGrid>
                      {Array.from({
                        length: selections.rooms[room.id].count,
                      }).map((_, i) => (
                        <S_RoomDetailCard key={i}>
                          <h4>
                            {room.name.replace("ال", "").trim()} {i + 1}
                          </h4>
                          <S_InputGrid>
                            <S_InputGroup>
                              <label>العرض (م)</label>
                              <input
                                type="number"
                                value={selections.rooms[room.id].details[i].w}
                                onChange={(e) =>
                                  handleRoomDetailChange(
                                    room.id,
                                    i,
                                    "w",
                                    e.target.value
                                  )
                                }
                              />
                            </S_InputGroup>
                            <S_InputGroup>
                              <label>الطول (م)</label>
                              <input
                                type="number"
                                value={selections.rooms[room.id].details[i].l}
                                onChange={(e) =>
                                  handleRoomDetailChange(
                                    room.id,
                                    i,
                                    "l",
                                    e.target.value
                                  )
                                }
                              />
                            </S_InputGroup>
                          </S_InputGrid>
                          {room.has_bath && (
                            <S_ToggleRow>
                              <span>إضافة حمام</span>
                              <S_ToggleSwitch>
                                <input
                                  type="checkbox"
                                  checked={
                                    selections.rooms[room.id].details[i].bath
                                  }
                                  onChange={() =>
                                    handleRoomDetailChange(
                                      room.id,
                                      i,
                                      "bath",
                                      !selections.rooms[room.id].details[i].bath
                                    )
                                  }
                                />
                                <span className="slider"></span>
                              </S_ToggleSwitch>
                            </S_ToggleRow>
                          )}
                          {room.has_dressing && (
                            <S_ToggleRow>
                              <span>إضافة غرفة ملابس</span>
                              <S_ToggleSwitch>
                                <input
                                  type="checkbox"
                                  checked={
                                    selections.rooms[room.id].details[i]
                                      .dressing
                                  }
                                  onChange={() =>
                                    handleRoomDetailChange(
                                      room.id,
                                      i,
                                      "dressing",
                                      !selections.rooms[room.id].details[i]
                                        .dressing
                                    )
                                  }
                                />
                                <span className="slider"></span>
                              </S_ToggleSwitch>
                            </S_ToggleRow>
                          )}
                        </S_RoomDetailCard>
                      ))}
                    </S_RoomDetailsGrid>
                  )}
                </S_RoomSection>
              ))}
            </S_StepContent>
          </>
        );
      case 3:
        return (
          <>
            <S_StepHeader>
              <h1>الإضافات والمرافق</h1>
              <p>اختر أي مرافق إضافية أو إضافات فاخرة تحتاجها.</p>
            </S_StepHeader>
            <S_StepContent>
              <S_SubSectionHeader>المرافق الإضافية</S_SubSectionHeader>
              <S_ChoiceGrid>
                {OTHER_ROOMS_CONFIG.map((r) => (
                  <S_ChoiceCard
                    key={r.id}
                    active={selections.otherRooms[r.id]}
                    onClick={() => handleCheckboxChange("otherRooms", r.id)}
                  >
                    <h3>{r.name}</h3>
                  </S_ChoiceCard>
                ))}
                <S_ChoiceCard
                  active={selections.basement}
                  onClick={() =>
                    handleSimpleChange("basement", !selections.basement)
                  }
                >
                  <h3>طابق سفلي</h3>
                </S_ChoiceCard>
              </S_ChoiceGrid>
              <S_SubSectionHeader>الإضافات الفاخرة</S_SubSectionHeader>
              <S_ChoiceGrid>
                {FIXED_COST_ADDONS_CONFIG.map((a) => (
                  <S_ChoiceCard
                    key={a.id}
                    active={selections.fixedAddons[a.id]}
                    onClick={() => handleCheckboxChange("fixedAddons", a.id)}
                  >
                    <h3>{a.name}</h3>
                  </S_ChoiceCard>
                ))}
              </S_ChoiceGrid>
              <S_SubSectionHeader>مواقف السيارات</S_SubSectionHeader>
              <S_ChoiceGrid>
                {[0, 1, 2, 3, 4].map((c) => (
                  <S_ChoiceCard
                    key={c}
                    active={selections.parking === c}
                    onClick={() => handleSimpleChange("parking", c)}
                  >
                    <h3>{c}</h3>
                  </S_ChoiceCard>
                ))}
              </S_ChoiceGrid>
            </S_StepContent>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <S_CalculatorWrapper>
      <S_WizardLayout>
        {currentStep <= TOTAL_STEPS ? (
          <S_StepContainer>
            <S_ProgressBarContainer>
              <S_ProgressBar progress={(currentStep / TOTAL_STEPS) * 100} />
            </S_ProgressBarContainer>
            {renderStep()}
            <S_Navigation>
              <S_Button
                className="back"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                رجوع
              </S_Button>
              <S_Button className="next" onClick={nextStep}>
                {currentStep === TOTAL_STEPS ? "عرض النتيجة" : "التالي"}
              </S_Button>
            </S_Navigation>
          </S_StepContainer>
        ) : (
          <S_ResultsPageWrapper>
            <h1>هذا هو تقدير التكلفة لمشروعك</h1>
            <p>
              هذا تقدير مبدئي بناءً على اختياراتك. تواصل معنا للحصول على عرض سعر
              مفصل.
            </p>
            <S_ResultsGrid>
              <S_ResultBox>
                <span>إجمالي مساحة البناء (BUA)</span>
                <h2>{calculationResult.totalBUA.toFixed(2)} م²</h2>
              </S_ResultBox>
              <S_ResultBox className="primary">
                <span>التكلفة الإجمالية التقديرية</span>
                <h2>
                  {Math.round(calculationResult.totalPrice).toLocaleString()}{" "}
                  د.إ
                </h2>
              </S_ResultBox>
            </S_ResultsGrid>

            <S_BreakdownSection>
              <S_SubSectionHeader
                style={{
                  border: "none",
                  margin: "0 0 16px 0",
                  padding: 0,
                  fontSize: "1.4rem",
                }}
              >
                ملخص تفاصيل التكلفة
              </S_SubSectionHeader>
              <S_BreakdownLayout>
                <S_ChartContainer>
                  <CostPieChart
                    breakdownDetails={calculationResult.breakdownDetails}
                  />
                  <S_TotalInChart>
                    <h2>
                      {Math.round(
                        calculationResult.totalPrice
                      ).toLocaleString()}
                    </h2>
                    <span>د.إ</span>
                  </S_TotalInChart>
                </S_ChartContainer>

                <S_BreakdownList>
                  {calculationResult.breakdownDetails.map((item, index) => (
                    <S_BreakdownItem key={item.name}>
                      <div className="label-group">
                        <S_ColorDot
                          color={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="cost">
                        {Math.round(item.cost).toLocaleString()} د.إ
                      </span>
                    </S_BreakdownItem>
                  ))}
                </S_BreakdownList>
              </S_BreakdownLayout>
            </S_BreakdownSection>

            <S_ActionButtonsContainer>
              <S_Button className="back" onClick={handleReset}>
                ابدأ من جديد
              </S_Button>
              <S_Button className="next" style={{ fontSize: "1.2rem" }}>
                احجز استشارة مجانية
              </S_Button>
            </S_ActionButtonsContainer>
          </S_ResultsPageWrapper>
        )}
      </S_WizardLayout>
    </S_CalculatorWrapper>
  );
};

export default VillaCalculatorPage;
