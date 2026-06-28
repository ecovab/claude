type SeamColor = "ink" | "charcoal";

const COLOR_CLASS: Record<SeamColor, string> = {
  ink: "from-ink",
  charcoal: "from-charcoal",
};

interface SectionSeamProps {
  from: SeamColor;
}

/** Softens the hard cut between two adjacently coloured sections so the page reads as one continuous space. */
export function SectionSeam({ from }: SectionSeamProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${COLOR_CLASS[from]} to-transparent sm:h-32`}
    />
  );
}
