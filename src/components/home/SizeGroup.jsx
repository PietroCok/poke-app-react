import { useSelection } from "../../context/configurator/SelectionContext";



export default function SizeGroup({ name, price, limits }) {
  const { size, selectSize } = useSelection();
  const id = `size-${name}`;

  const selected = name === size ? 'selected' : '';

  return (
    <div className={`size-container${' ' + selected}`}>
      <label htmlFor={id}>
        <input
          type="radio"
          name="size"
          id={id}
          onClick={() => selectSize(name)}
        />
        <div className="flex flex-column flex-center gap-05 padding-1">
          <span className="size-name text-uppercase text-large weight-bold">{name}</span>
          <span className="size-limits">
            {renderLimits(limits)}
          </span>
          <span className="size-price">{price.toFixed(2)} €</span>
        </div>
      </label>
    </div>
  )
}


function renderLimits(limits) {
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