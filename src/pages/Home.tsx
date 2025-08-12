import type { AppConfig, Group } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { IngredientGroup } from "../components/home/IngredientGroup";
import { SizeSelector } from "../components/home/SizeSelector";
import { PageFooter } from "../components/common/PageFooter";
import { ButtonText } from "../components/common/ButtonText";
import { useSelection } from "../context/configurator/SelectionContext";
import { PageHeader } from "../components/common/PageHeader";
import { ButtonIcon } from "../components/common/ButtonIcon";
import { MainMenu } from "../components/common/MainMenu";

export function Home({ dimensioni, gruppi }: AppConfig) {
  const { resetContext, hasIngredients, getTotalPrice } = useSelection();
  const isEmpty = !hasIngredients();

  const dimensions = Object.entries(dimensioni);
  const groups = Object.entries(gruppi);

  return (
    <div className="page-container">
      <PageHeader
        left={
          <ButtonIcon
            icon={<FontAwesomeIcon icon={faCartShopping} />}
            classes="gold border-r-10"
            tooltip="Carrello"
            linkTo={"/cart"}
          />
        }
        right={
          <MainMenu />
        }
      />

      <h2 id="page-title">crea la tua poke bowl</h2>

      <SizeSelector sizes={dimensions} />

      <section id="ingredients-selection-container">
        {renderGroups(groups)}
      </section>

      <PageFooter
        left={
          <ButtonText
            text="svuota"
            classes="red-bg primary-contrast-color border-r-10"
            clickHandler={resetContext}
            disabled={isEmpty}
            tooltip="Rimuove la selezione attuale"
          />
        }
        center={
          <div className="flex flex-center h-100 gap-5">
            Totale: <span>{getTotalPrice().toFixed(2)}</span> €
          </div>
        }
        right={
          <ButtonText
            text="salva"
            classes="primary-bg primary-contrast-color border-r-10"
            clickHandler={() => alert('Coming soon!')}
            disabled={isEmpty}
            tooltip="Salva la selezione attuale"
          />
        }
        classes={'main-bg'}
      />
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
