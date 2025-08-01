import IconButton from "../components/common/IconButton";
import PageHeader from "../components/common/PageHeader";
import IngredientGroup from "../components/home/IngredientGroup";

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import SizeSelector from "../components/home/SizeSelector";

export default function Home({ config }) {
  const dimensions = Object.entries(config.dimensioni);
  const groups = Object.entries(config.gruppi);

  return (
    <div className="page-container sticky">
      <PageHeader
        left={
          <IconButton
            icon={faCartShopping}
            color="accent-2"
          />
        }
        right={<button></button>}
      />
      <h2 id="page-title">crea la tua poke bowl</h2>
      <SizeSelector sizes={dimensions}/>
      <section id="ingredients-selection-container">
        {renderGroups(groups)}
      </section>
    </div>
  )
}


function renderGroups(groups) {
  return groups.map(group => {
    const _group = {
      id: group[0],
      ...group[1]
    }

    return (
      <IngredientGroup
        key={_group.id}
        group={_group}
      />
    )
  });
}
