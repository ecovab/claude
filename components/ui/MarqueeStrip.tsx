interface MarqueeStripProps {
  text: string;
  className?: string;
}

export default function MarqueeStrip({ text, className = "" }: MarqueeStripProps) {
  return (
    <div className={`marquee-strip w-full overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max">
        <span className="marquee-content flex shrink-0 whitespace-nowrap py-5 pr-10">{text}</span>
        <span className="marquee-content flex shrink-0 whitespace-nowrap py-5 pr-10" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  );
}
