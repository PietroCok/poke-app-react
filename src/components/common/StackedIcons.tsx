
export interface StackedIconsProps {
  outer: React.ReactElement,
  inner: React.ReactElement
}

export function StackedIcons({ outer, inner }: StackedIconsProps) {
  return (
    <div
      className="stacked-icons-container"
    >
      <div
        className="stacked-icons-outer"
      >
        {outer}
      </div>
      <div
        className="stacked-icons-inner"
      >
        {inner}
      </div>
    </div>
  )
}