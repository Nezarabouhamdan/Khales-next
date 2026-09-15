"use client";

export default function LiveBadge({
  label,
  className = "",
  dotClassName = "bg-emerald-400",
}: {
  label: string;
  className?: string;
  dotClassName?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest backdrop-blur-sm ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${dotClassName}`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dotClassName}`} />
      </span>
      {label}
    </span>
  );
}
