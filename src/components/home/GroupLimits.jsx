


export default function GroupLimits({ count, limit, extraPrice }) {
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

