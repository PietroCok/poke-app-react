
export interface GroupLimitsProps {
  count: number,
  limit: number,
  extraPrice: number
}

export function GroupLimits({ count, limit, extraPrice }: GroupLimitsProps) {
  const excess = count - limit;

  return (
    <div className="group-count-price">
      <span className="group-count">
        <span>{count}</span>/<span>{limit}</span>
      </span>

      {excess > 0 && (
        <span className="extra-price">
          +<span>{extraPrice.toFixed(2)}</span>€
        </span>
      )}
    </div>
  )
}

