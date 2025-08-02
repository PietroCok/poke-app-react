import type { AppConfig, Group } from "@/types";

import { IconButton } from "../components/common/IconButton";
import { PageHeader } from "../components/common/PageHeader";
import { IngredientGroup } from "../components/home/IngredientGroup";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import SizeSelector from "../components/home/SizeSelector";

export function Home({ dimensioni, gruppi }: AppConfig) {
  const dimensions = Object.entries(dimensioni);
  const groups = Object.entries(gruppi);

  return (
    <div className="page-container sticky">
      <PageHeader
        left={
          <IconButton
            icon={faCartShopping}
            classes="accent-2 border-r-10"
          />
        }
        right={<button></button>}
      />
      <h2 id="page-title">crea la tua poke bowl</h2>
      <SizeSelector sizes={dimensions} />
      <section id="ingredients-selection-container">
        {renderGroups(groups)}
      </section>
    </div>
  )
}


function renderGroups(groups: [string, Group][]) {
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
