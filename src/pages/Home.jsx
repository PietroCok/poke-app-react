import IconButton from "../components/common/IconButton";
import PageHeader from "../components/common/PageHeader";
import IngredientGroup from "../components/home/IngredientGroup";
import SizeGroup from "../components/home/SizeGroup";

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

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
      <section id="size-selection-container">
        {renderSizes(dimensions)}
      </section>
      <section id="ingredients-selection-container">
        {renderGroups(groups)}
      </section>
    </div>
  )
}


function renderGroups(groups) {
  return groups.map(group => {
    const _group = {
      type: group[0],
      ...group[1]
    }

    return (
      <IngredientGroup
        key={_group.type}
        group={_group}
      />
    )
  });
}


function renderSizes(sizes) {
  return sizes.map(size => {
    const _size = {
      name: size[0],
      ...size[1]
    }

    return (
      <SizeGroup
        key={_size.name}
        name={_size.name}
        price={_size.prezzo}
        limits={_size.limiti}
      />
    )
  })
}