"use client";

import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { FaWhatsapp } from "react-icons/fa";

// Correct answers — Q1‑Q12 (index 0‑11)
const CORRECT = ["C", "B", "C", "B", "C", "B", "B", "C", "C", "C", "C", "C"];

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`;

// ─── Wrapper (inherits dir from parent) ──────────────────────────────────────

const ExamWrapper = styled.div`
  width: 100%;
  max-width: 660px;
  margin: 0 auto;
  animation: ${fadeUp} 0.4s ease both;
`;

// ─── Progress ─────────────────────────────────────────────────────────────────

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #888;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 5px;
  background: #f0f0f0;
  border-radius: 99px;
  margin-bottom: 28px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, #66a109, #88cc0c);
  width: ${({ $pct }) => $pct}%;
  transition: width 0.4s ease;
`;

// ─── Question Card ────────────────────────────────────────────────────────────

const QuestionCard = styled.div`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  padding: 40px 40px 36px;
  animation: ${scaleIn} 0.3s ease both;

  @media (max-width: 640px) {
    padding: 28px 20px 24px;
    border-radius: 16px;
  }
`;

const CategoryBadge = styled.span`
  display: inline-block;
  background: rgba(102, 161, 9, 0.1);
  color: #66a109;
  border: 1px solid rgba(102, 161, 9, 0.25);
  border-radius: 99px;
  padding: 4px 14px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-bottom: 18px;
`;

const QuestionText = styled.p`
  font-size: 1.05rem;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.65;
  margin: 0 0 28px;
`;

// ─── Options ──────────────────────────────────────────────────────────────────

const OptionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`;

const OptionButton = styled.button`
  width: 100%;
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};
  padding: 14px 18px;
  border-radius: 10px;
  border: 1.5px solid ${({ $selected }) => ($selected ? "#66a109" : "#e4e4e4")};
  background: ${({ $selected }) =>
    $selected ? "rgba(102, 161, 9, 0.07)" : "#fafafa"};
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex-direction: ${({ $isRtl }) => ($isRtl ? "row-reverse" : "row")};
  transition: border-color 0.15s ease, background 0.15s ease;
  font-family: "Inter", sans-serif;

  &:hover {
    border-color: #66a109;
    background: rgba(102, 161, 9, 0.05);
  }
`;

const OptionKey = styled.span`
  min-width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ $selected }) => ($selected ? "#66a109" : "#f0f0f0")};
  color: ${({ $selected }) => ($selected ? "#fff" : "#777")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 700;
  flex-shrink: 0;
  transition: background 0.15s ease, color 0.15s ease;
`;

const OptionText = styled.span`
  font-size: 0.93rem;
  color: #333;
  line-height: 1.5;
  padding-top: 3px;
`;

// ─── Next / Submit Button ─────────────────────────────────────────────────────

const ActionButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#66a109")};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease, transform 0.15s ease;

  &:hover:not(:disabled) {
    background-color: #538307;
    transform: translateY(-1px);
  }
`;

// ─── Results Card ─────────────────────────────────────────────────────────────

const ResultCard = styled.div`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  padding: 48px 40px;
  text-align: center;
  animation: ${fadeUp} 0.5s ease both;

  @media (max-width: 640px) {
    padding: 36px 20px;
    border-radius: 16px;
  }
`;

const ScoreCircle = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: conic-gradient(
    #66a109 ${({ $pct }) => $pct * 3.6}deg,
    #f0f0f0 0deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 100px;
    height: 100px;
    background: #fff;
    border-radius: 50%;
  }
`;

const ScoreInner = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const ScoreNumber = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1;
`;

const ScoreTotal = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-top: 2px;
`;

const ResultTitle = styled.h2`
  font-family: "Playfair", serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px;
`;

const ResultMessage = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0 0 32px;
  line-height: 1.6;
`;

const WhatsAppButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 100%;
  padding: 14px 24px;
  background-color: #25d366;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.15s ease;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.25);

  &:hover {
    background-color: #1ebe58;
    transform: translateY(-1px);
  }
`;

const ScoreDivider = styled.hr`
  border: none;
  border-top: 1px solid #f0f0f0;
  margin: 28px 0;
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getResultMessage(score, messages) {
  const pct = (score / 12) * 100;
  if (pct === 100) return messages.perfect;
  if (pct >= 75) return messages.excellent;
  if (pct >= 50) return messages.good;
  return messages.fair;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ExamSection({ lang, content }) {
  const isRtl = lang === "ar";
  const ec = content;
  const questions = ec.questions;
  const total = questions.length;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  const isLast = current === total - 1;
  const progress = Math.round(((current + (selected ? 1 : 0)) / total) * 100);
  const q = questions[current];

  const handleNext = () => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (isLast) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  if (done) {
    const score = answers.filter((a, i) => a === CORRECT[i]).length;
    const pct = Math.round((score / total) * 100);
    const msg = getResultMessage(score, ec.messages);

    const waMsg = [
      `*${ec.resultTitle}*`,
      ``,
      `*${ec.yourScore}:* ${score}/${total} (${pct}%)`,
      ``,
      msg,
    ].join("\n");

    return (
      <ExamWrapper>
        <ResultCard>
          <ScoreCircle $pct={pct}>
            <ScoreInner>
              <ScoreNumber>{score}</ScoreNumber>
              <ScoreTotal>/ {total}</ScoreTotal>
            </ScoreInner>
          </ScoreCircle>

          <ResultTitle>{ec.resultTitle}</ResultTitle>
          <ResultMessage>{msg}</ResultMessage>

          <ScoreDivider />

          <WhatsAppButton
            onClick={() =>
              window.open(
                `https://api.whatsapp.com/send?phone=971551299880&text=${encodeURIComponent(waMsg)}`,
                "_blank",
              )
            }
          >
            <FaWhatsapp size={20} />
            {ec.sendResults}
          </WhatsAppButton>
        </ResultCard>
      </ExamWrapper>
    );
  }

  return (
    <ExamWrapper>
      {/* Progress */}
      <ProgressHeader>
        <span>
          {ec.questionLabel} {current + 1} {ec.of} {total}
        </span>
        <span>{progress}%</span>
      </ProgressHeader>
      <ProgressTrack>
        <ProgressFill $pct={progress} />
      </ProgressTrack>

      {/* Question */}
      <QuestionCard key={current}>
        <CategoryBadge>{q.category}</CategoryBadge>
        <QuestionText>{q.question}</QuestionText>

        <OptionsGrid>
          {Object.entries(q.options).map(([key, text]) => (
            <OptionButton
              key={key}
              $selected={selected === key}
              $isRtl={isRtl}
              onClick={() => setSelected(key)}
              type="button"
            >
              <OptionKey $selected={selected === key}>{key}</OptionKey>
              <OptionText>{text}</OptionText>
            </OptionButton>
          ))}
        </OptionsGrid>

        <ActionButton
          type="button"
          onClick={handleNext}
          disabled={!selected}
        >
          {isLast ? ec.submit : ec.next}
        </ActionButton>
      </QuestionCard>
    </ExamWrapper>
  );
}
