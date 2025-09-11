// components/Media/FilterControls.js
"use client";

import React from "react";
import styled from "styled-components";

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  /* Style for the active button */
  background-color: ${({ $isActive }) => ($isActive ? "#66a109" : "#f0f0f0")};
  color: ${({ $isActive }) => ($isActive ? "#ffffff" : "#333333")};
  border-color: ${({ $isActive }) => ($isActive ? "#66a109" : "#f0f0f0")};

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? "#5a8d08" : "#e0e0e0")};
    border-color: ${({ $isActive }) => ($isActive ? "#5a8d08" : "#e0e0e0")};
  }
`;

export default function FilterControls({
  categories,
  activeCategory,
  onFilterChange,
}) {
  return (
    <FilterWrapper>
      {categories.map((category) => (
        <FilterButton
          key={category}
          $isActive={activeCategory === category}
          onClick={() => onFilterChange(category)}
        >
          {category}
        </FilterButton>
      ))}
    </FilterWrapper>
  );
}
