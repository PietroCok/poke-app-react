import IngredientGroup from "../components/home/IngredientGroup";
import SizeGroup from "../components/home/SizeGroup";

export default function Home({ config }) {
  const dimensions = Object.entries(config.dimensioni);
  const groups = Object.entries(config.gruppi);

  return (
    <>
      <div>This is the Home page</div>
      <section id="size-selection-container">
        {renderSizes(dimensions)}
      </section>
      <section id="ingredients-selection-container">
        {renderGroups(groups)}
      </section>
    </>
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