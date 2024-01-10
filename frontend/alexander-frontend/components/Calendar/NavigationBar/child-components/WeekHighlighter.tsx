type WeekHighlighterProps = {
  weekHighlighterValue?: number;
  weekHighlighterReset?: () => void;
};

export default function WeekHighlighter({
  weekHighlighterValue = 0,
  weekHighlighterReset = () => {},
}: WeekHighlighterProps) {
  return (
    <button
      onClick={weekHighlighterReset}
      aria-label="Reset the calendar to the current week"
      title="Reset the calendar to the current week"
    >
      <h4 className="font-normal uppercase text-cool_grey">
        Current:{" "}
        <span className="font-semibold text-ghost_white">
          Week {weekHighlighterValue}
        </span>
      </h4>
    </button>
  );
}
