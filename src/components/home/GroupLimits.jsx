


export default function GroupLimits({ count, limit, extraPrice }) {
  const excess = count - limit;

  return (
    <div>
      <span>{count}</span>/<span>{limit}</span>

      {excess > 0 && (
        <span className="extra-price">
          +<span>{extraPrice * excess}</span>€
        </span>
      )}
    </div>
  )
}

