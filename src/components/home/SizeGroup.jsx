


export default function SizeGroup({ name, price, limits }) {
  const id = `size-${name}`;

  return (
    <div>
      <label htmlFor={id}>
        <input type="checkbox" name={id} id={id} />
        <div>
          <span className="size-name">{name}</span>
          <span className="size-limits">
            {renderLimits(limits)}
          </span>
          <span className="size-price">{price.toFixed(2)} €</span>
        </div>
      </label>
    </div>
  )
}


function renderLimits(limits){
  return Object.entries(limits).map(limit => {
    const type = limit[0];
    const quantity = limit[1];

    return (
      <span key={type} className="limit">
        {quantity} {type}
      </span>
    )
  })
}