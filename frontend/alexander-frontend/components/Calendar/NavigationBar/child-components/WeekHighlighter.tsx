type WeekHighlighterProps = {
  weekHighlighterValue?: number;
  weekHighlighterReset?: () => void;
};

export default function WeekHighlighter({
  weekHighlighterValue = 0,
  weekHighlighterReset = () => {},
}: WeekHighlighterProps) {
  return (
    <button onClick={weekHighlighterReset}>
      Currently:{" "}
      <span className="font-semibold">Week {weekHighlighterValue}</span>
    </button>
  );
}
