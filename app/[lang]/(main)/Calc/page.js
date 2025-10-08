"use client";

import React, { useState, useMemo } from "react";
import styled, { css } from "styled-components";

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

// --- THIS IS THE CORRECTED SECTION ---
const ROOM_CONFIG = [
  {
    id: "bedroom",
    name: "غرف النوم",
    counts: [1, 2, 3, 4, 5, 6, 7, 8], // Corrected
    default: 1,
    has_bath: true,
    has_dressing: true,
    w: 4,
    l: 5,
  },
  {
    id: "majlis",
    name: "المجلس",
    counts: [1, 2, 3], // Corrected
    default: 1,
    has_bath: true,
    has_dressing: false,
    w: 6,
    l: 7,
  },
  {
    id: "living",
    name: "غرف المعيشة",
    counts: [1, 2, 3], // Corrected
    default: 1,
    has_bath: false,
    has_dressing: false,
    w: 4,
    l: 7,
  },
  {
    id: "kitchen",
    name: "المطبخ",
    counts: [1, 2], // Corrected
    default: 1,
    has_bath: false,
    has_dressing: false,
    w: 5,
    l: 5,
  },
  {
    id: "dining",
    name: "غرفة الطعام",
    counts: [0, 1, 2, 3], // Corrected (kept 0 for optional)
    default: 0,
    has_bath: false,
    has_dressing: false,
    w: 5,
    l: 5,
  },
  {
    id: "guest_bedroom",
    name: "غرفة نوم الضيوف",
    counts: [0, 1, 2], // Corrected (kept 0 for optional)
    default: 0,
    has_bath: true,
    has_dressing: true,
    w: 4,
    l: 5,
  },
];
// --- END OF CORRECTION ---

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
  plumbing: "أعمال الصحية",
  external_works: "الأعمال الخارجية",
  contingencies: "نفقات غير متوقّعة",
  consultant_fees: "أتعاب الاستشاري",
};

// --- STYLED COMPONENTS ---

const S_CalculatorWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap");

  --primary-color: #3b82f6;
  --accent-color: #c5b358;
  --secondary-color: #f7f9fc;
  --text-color: #1f2937;
  --text-light-color: #4b5563;
  --border-color: #e5e7eb;
  --background-color: #ffffff;

  font-family: "Tajawal", sans-serif;
  background-color: #f8fafc;
  color: var(--text-color);
  padding: 100px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const S_Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  width: 100%;
  max-width: 1400px;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const S_FormContainer = styled.div`
  background: var(--background-color);
  padding: 30px 35px;
  border-radius: 20px;
  box-shadow: 0 8px 30px -5px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color);
  width: 65%;
  @media (max-width: 1200px) {
    width: 100%;
    box-sizing: border-box;
  }
`;

const S_SummaryContainer = styled.div`
  background: var(--background-color);
  padding: 30px 35px;
  border-radius: 20px;
  box-shadow: 0 8px 30px -5px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color);
  width: 35%;
  position: sticky;
  top: 20px;
  align-self: flex-start;
  @media (max-width: 1200px) {
    width: 100%;
    box-sizing: border-box;
    position: static;
  }
`;

const S_Section = styled.div`
  margin-bottom: 35px;
  padding-bottom: 30px;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const S_Header = styled.h1`
  font-size: 2.4em;
  margin-bottom: 10px;
  color: var(--text-color);
`;

const S_Subheader = styled.p`
  font-size: 1.1em;
  color: var(--text-light-color);
  margin-top: 0;
  margin-bottom: 30px;
`;

const S_SectionTitle = styled.h2`
  font-size: 1.7em;
  margin-bottom: 25px;
  color: #111827;
  padding-right: 15px;
  border-right: 4px solid var(--accent-color);
`;

const S_SubSectionTitle = styled.h3`
  font-size: 1.15em;
  color: var(--text-light-color);
  margin-bottom: 15px;
  font-weight: 500;
  margin-top: ${(props) => props.mt || "15px"};
`;

const S_OptionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const S_ImageOption = styled.div`
  border: 2px solid
    ${({ active }) => (active ? "var(--primary-color)" : "var(--border-color)")};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: center;
  padding: 20px;
  position: relative;
  background: #fff;
  width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ active }) =>
    active ? "0 0 15px rgba(59, 130, 246, 0.3)" : "none"};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.08);
    border-color: #d1d5db;
  }

  span {
    font-weight: 500;
    font-size: 1.1em;
    color: #374151;
  }

  ${({ active }) =>
    active &&
    css`
      &::after {
        content: "✓";
        font-size: 16px;
        color: white;
        background-color: var(--primary-color);
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 8px;
        right: 8px;
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
      }
    `}
`;

const S_CountSelector = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */
  gap: 10px;
  margin-bottom: 15px;
`;

const S_CountButton = styled.button`
  width: 50px;
  height: 50px;
  border: 1px solid var(--border-color);
  background-color: ${({ active }) =>
    active ? "var(--primary-color)" : "#fff"};
  color: ${({ active }) => (active ? "white" : "inherit")};
  font-weight: ${({ active }) => (active ? "bold" : "500")};
  transform: ${({ active }) => (active ? "scale(1.05)" : "scale(1)")};
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1em;
  transition: all 0.2s ease;

  &:hover:not(.active) {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }
`;

const S_RoomDetails = styled.div`
  border: 1px solid #f0f0f0;
  background-color: var(--secondary-color);
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
`;

const S_DimensionInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;

  label {
    font-weight: 500;
    width: 60px;
  }

  input {
    width: 80px;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    text-align: center;
    font-size: 1.1em;
    font-family: "Tajawal", sans-serif;
    transition: all 0.2s ease;
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
  }
`;

const S_ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  padding: 15px 0;
  border-top: 1px solid #e5e7eb;

  &:first-of-type {
    border-top: none;
    padding-top: 0;
  }

  span {
    font-weight: 500;
    font-size: 1.05em;
  }
`;

const S_ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;

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
    border-radius: 28px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  input:checked + .slider {
    background-color: var(--accent-color);
  }

  input:checked + .slider:before {
    transform: translateX(22px);
  }
`;

const S_OtherRoomLabel = styled.label`
  width: calc(50% - 10px);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const S_SummaryBua = styled.div`
  font-size: 1.1em;
  color: var(--text-color);
  margin-bottom: 25px;
  text-align: center;
  background: linear-gradient(135deg, var(--secondary-color), #fff);
  padding: 15px;
  border-radius: 12px;
  border: 1px solid var(--border-color);

  strong {
    display: block;
  }

  span {
    font-size: 1.8em;
    font-weight: bold;
    color: var(--primary-color);
    display: block;
    margin-top: 5px;
  }
`;

const S_SummaryBreakdown = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }
  tr:nth-child(even) {
    background-color: var(--secondary-color);
  }
  td {
    padding: 14px 10px;
    border-bottom: 1px solid #f0f0f0;
  }
  td:first-child {
    color: var(--text-light-color);
  }
  td:last-child {
    text-align: left;
    font-weight: 700;
    font-size: 1.1em;
    color: var(--text-color);
  }
`;

const S_SummaryTotal = styled.div`
  margin-top: 25px;
  padding-top: 25px;
  border-top: 3px solid var(--accent-color);
  text-align: center;

  h3 {
    font-size: 1.2em;
    color: var(--text-light-color);
    margin: 0;
  }
  h2 {
    margin: 5px 0 0 0;
    font-size: 2.8em;
    color: var(--text-color);
  }
`;

// --- REACT COMPONENT ---

// Function to initialize the state for all rooms based on config
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

const VillaCalculatorPage = () => {
  const [selections, setSelections] = useState({
    location: "abu_dhabi",
    designStyle: "modern",
    layout: "rectangle",
    floors: "g_only",
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

  const handleSimpleChange = (field, value) => {
    setSelections((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoomCountChange = (roomId, count) => {
    setSelections((prev) => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        [roomId]: { ...prev.rooms[roomId], count: count },
      },
    }));
  };

  const handleRoomDetailChange = (roomId, index, field, value) => {
    setSelections((prev) => {
      const newDetails = [...prev.rooms[roomId].details];
      newDetails[index] = { ...newDetails[index], [field]: value };
      return {
        ...prev,
        rooms: {
          ...prev.rooms,
          [roomId]: { ...prev.rooms[roomId], details: newDetails },
        },
      };
    });
  };

  const handleCheckboxChange = (group, id) => {
    setSelections((prev) => ({
      ...prev,
      [group]: { ...prev[group], [id]: !prev[group][id] },
    }));
  };

  const calculationResult = useMemo(() => {
    let totalCoreArea = 0;
    let totalFixedAddonCost = 0;

    // Calculate area from main rooms
    Object.keys(selections.rooms).forEach((roomId) => {
      const roomData = selections.rooms[roomId];
      for (let i = 0; i < roomData.count; i++) {
        const details = roomData.details[i];
        totalCoreArea += (details.w || 0) * (details.l || 0);
        if (details.bath) totalCoreArea += PRICING_DATA.area_addons.bathroom;
        if (details.dressing)
          totalCoreArea += PRICING_DATA.area_addons.dressing_room;
      }
    });

    // Add area from other rooms
    OTHER_ROOMS_CONFIG.forEach((room) => {
      if (selections.otherRooms[room.id]) {
        totalCoreArea += room.area;
      }
    });

    // Add area and cost from fixed addons
    FIXED_COST_ADDONS_CONFIG.forEach((addon) => {
      if (selections.fixedAddons[addon.id]) {
        totalCoreArea += addon.area;
        totalFixedAddonCost += addon.cost;
      }
    });

    // Apply basement multiplier
    if (selections.basement) {
      totalCoreArea *= PRICING_DATA.factors.basement_multiplier;
    }

    const totalBUA =
      totalCoreArea * PRICING_DATA.factors.circulation_multiplier;

    const costBreakdown =
      PRICING_DATA.cost_breakdown_per_sqm[selections.finishing];
    let totalConstructionCost = 0;
    const breakdownDetails = [];

    for (const item in costBreakdown) {
      const itemCost = costBreakdown[item] * totalBUA;
      totalConstructionCost += itemCost;
      breakdownDetails.push({
        name: ITEM_TRANSLATIONS[item],
        cost: itemCost,
      });
    }

    if (totalFixedAddonCost > 0) {
      breakdownDetails.push({
        name: "تكلفة الإضافات",
        cost: totalFixedAddonCost,
      });
    }

    const totalPrice = totalConstructionCost + totalFixedAddonCost;

    return {
      totalBUA,
      totalPrice,
      breakdownDetails,
    };
  }, [selections]);

  return (
    <S_CalculatorWrapper>
      <S_Container>
        <S_FormContainer>
          <S_Header>حاسبة تكلفة بناء الفيلا</S_Header>
          <S_Subheader>
            ابدأ بتخصيص منزل أحلامك واحصل على تقدير فوري للتكلفة.
          </S_Subheader>

          <S_Section>
            <S_SectionTitle>1. الموقع ونوع التصميم</S_SectionTitle>
            <S_SubSectionTitle mt="0">يرجى تحديد موقع المنزل</S_SubSectionTitle>
            <S_OptionGroup>
              <S_ImageOption
                active={selections.location === "abu_dhabi"}
                onClick={() => handleSimpleChange("location", "abu_dhabi")}
              >
                <span>أبوظبي</span>
              </S_ImageOption>
              <S_ImageOption
                active={selections.location === "dubai"}
                onClick={() => handleSimpleChange("location", "dubai")}
              >
                <span>دبي</span>
              </S_ImageOption>
              <S_ImageOption
                active={selections.location === "sharjah"}
                onClick={() => handleSimpleChange("location", "sharjah")}
              >
                <span>الشارقة</span>
              </S_ImageOption>
            </S_OptionGroup>
            <S_SubSectionTitle mt="25px">
              ما نوع التصميم الذي تفضله؟
            </S_SubSectionTitle>
            <S_OptionGroup>
              <S_ImageOption
                active={selections.designStyle === "modern"}
                onClick={() => handleSimpleChange("designStyle", "modern")}
              >
                <span>عصري</span>
              </S_ImageOption>
              <S_ImageOption
                active={selections.designStyle === "neoclassic"}
                onClick={() => handleSimpleChange("designStyle", "neoclassic")}
              >
                <span>نيو كلاسيكي</span>
              </S_ImageOption>
              <S_ImageOption
                active={selections.designStyle === "heritage"}
                onClick={() => handleSimpleChange("designStyle", "heritage")}
              >
                <span>تراثي</span>
              </S_ImageOption>
            </S_OptionGroup>
          </S_Section>

          <S_Section>
            <S_SectionTitle>2. مخطط البناء والتشطيب</S_SectionTitle>
            <S_SubSectionTitle mt="0">مستوى التشطيب</S_SubSectionTitle>
            <S_OptionGroup>
              <S_ImageOption
                active={selections.finishing === "standard"}
                onClick={() => handleSimpleChange("finishing", "standard")}
              >
                <span>أساسي</span>
              </S_ImageOption>
              <S_ImageOption
                active={selections.finishing === "medium"}
                onClick={() => handleSimpleChange("finishing", "medium")}
              >
                <span>متوسط</span>
              </S_ImageOption>
              <S_ImageOption
                active={selections.finishing === "high"}
                onClick={() => handleSimpleChange("finishing", "high")}
              >
                <span>عالي</span>
              </S_ImageOption>
            </S_OptionGroup>
          </S_Section>

          <S_Section>
            <S_SectionTitle>3. تحديد الغرف والمساحات</S_SectionTitle>
            {ROOM_CONFIG.map((room) => (
              <div key={room.id}>
                <S_SubSectionTitle mt="25px">{room.name}</S_SubSectionTitle>
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
                {Array.from({ length: selections.rooms[room.id].count }).map(
                  (_, i) => (
                    <S_RoomDetails key={i}>
                      <h4>
                        تفاصيل: {room.name.replace("ال", " ").trim()} {i + 1}
                      </h4>
                      <S_DimensionInputContainer>
                        <label htmlFor={`${room.id}_${i}_w`}>العرض</label>
                        <input
                          type="number"
                          id={`${room.id}_${i}_w`}
                          value={selections.rooms[room.id].details[i].w}
                          onChange={(e) =>
                            handleRoomDetailChange(
                              room.id,
                              i,
                              "w",
                              parseFloat(e.target.value)
                            )
                          }
                          min="3"
                          step="0.5"
                        />
                        <span>م</span>
                      </S_DimensionInputContainer>
                      <S_DimensionInputContainer>
                        <label htmlFor={`${room.id}_${i}_l`}>الطول</label>
                        <input
                          type="number"
                          id={`${room.id}_${i}_l`}
                          value={selections.rooms[room.id].details[i].l}
                          onChange={(e) =>
                            handleRoomDetailChange(
                              room.id,
                              i,
                              "l",
                              parseFloat(e.target.value)
                            )
                          }
                          min="3"
                          step="0.5"
                        />
                        <span>م</span>
                      </S_DimensionInputContainer>
                      {room.has_bath && (
                        <S_ToggleContainer>
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
                        </S_ToggleContainer>
                      )}
                      {room.has_dressing && (
                        <S_ToggleContainer>
                          <span>إضافة غرفة ملابس</span>
                          <S_ToggleSwitch>
                            <input
                              type="checkbox"
                              checked={
                                selections.rooms[room.id].details[i].dressing
                              }
                              onChange={() =>
                                handleRoomDetailChange(
                                  room.id,
                                  i,
                                  "dressing",
                                  !selections.rooms[room.id].details[i].dressing
                                )
                              }
                            />
                            <span className="slider"></span>
                          </S_ToggleSwitch>
                        </S_ToggleContainer>
                      )}
                    </S_RoomDetails>
                  )
                )}
              </div>
            ))}
          </S_Section>

          <S_Section>
            <S_SectionTitle>4. مرافق إضافية</S_SectionTitle>
            <S_OptionGroup>
              {OTHER_ROOMS_CONFIG.map((room) => (
                <S_OtherRoomLabel key={room.id}>
                  <input
                    type="checkbox"
                    checked={selections.otherRooms[room.id]}
                    onChange={() => handleCheckboxChange("otherRooms", room.id)}
                  />
                  <span>{room.name}</span>
                </S_OtherRoomLabel>
              ))}
            </S_OptionGroup>
            <S_ToggleContainer
              style={{
                width: "100%",
                paddingTop: "15px",
                marginTop: "15px",
                borderTop: "1px solid var(--border-color)",
              }}
            >
              <span>إضافة طابق سفلي (بيسمنت)</span>
              <S_ToggleSwitch>
                <input
                  type="checkbox"
                  checked={selections.basement}
                  onChange={() =>
                    handleSimpleChange("basement", !selections.basement)
                  }
                />
                <span className="slider"></span>
              </S_ToggleSwitch>
            </S_ToggleContainer>
          </S_Section>

          <S_Section>
            <S_SectionTitle>5. الإضافات الفاخرة</S_SectionTitle>
            <S_OptionGroup>
              {FIXED_COST_ADDONS_CONFIG.map((addon) => (
                <S_ImageOption
                  key={addon.id}
                  active={selections.fixedAddons[addon.id]}
                  onClick={() => handleCheckboxChange("fixedAddons", addon.id)}
                >
                  <span>{addon.name}</span>
                </S_ImageOption>
              ))}
            </S_OptionGroup>
          </S_Section>

          <S_Section>
            <S_SectionTitle>6. مواقف السيارات</S_SectionTitle>
            <S_CountSelector>
              {[0, 1, 2, 3, 4].map((c) => (
                <S_CountButton
                  key={c}
                  active={selections.parking === c}
                  onClick={() => handleSimpleChange("parking", c)}
                >
                  {c}
                </S_CountButton>
              ))}
            </S_CountSelector>
          </S_Section>
        </S_FormContainer>

        <S_SummaryContainer>
          <S_SectionTitle
            style={{ textAlign: "center", border: "none", padding: 0 }}
          >
            الملخص التقديري
          </S_SectionTitle>
          <S_SummaryBua>
            <strong>إجمالي مساحة البناء (BUA)</strong>
            <span>{calculationResult.totalBUA.toFixed(2)}</span>
            متر مربع
          </S_SummaryBua>
          <S_SubSectionTitle mt="0">تفاصيل التكلفة</S_SubSectionTitle>
          <S_SummaryBreakdown>
            <table>
              <tbody>
                {calculationResult.breakdownDetails.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{Math.round(item.cost).toLocaleString()} د.إ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </S_SummaryBreakdown>
          <S_SummaryTotal>
            <h3>التكلفة الإجمالية التقديرية</h3>
            <h2>
              <span>
                {Math.round(calculationResult.totalPrice).toLocaleString()}
              </span>{" "}
              د.إ
            </h2>
          </S_SummaryTotal>
        </S_SummaryContainer>
      </S_Container>
    </S_CalculatorWrapper>
  );
};

export default VillaCalculatorPage;
