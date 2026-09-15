"use client";

export default function Marquee({
  items,
  duration = 22,
  className = "",
  itemClassName = "",
}: {
  items: string[];
  duration?: number;
  className?: string;
  itemClassName?: string;
}) {
  const loop = [...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div
        className="inline-flex animate-marquee"
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((item, i) => (
          <span key={i} className={`inline-flex items-center ${itemClassName}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
