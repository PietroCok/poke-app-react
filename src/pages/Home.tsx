import { NavLink } from "react-router-dom";
import type { AppConfig, Group } from "@/types";

import { IngredientGroup } from "../components/home/IngredientGroup";
import { SizeSelector } from "../components/home/SizeSelector";
import { PageFooter } from "../components/common/PageFooter";
import { ButtonText } from "../components/common/ButtonText";
import { useSelection } from "../context/configurator/SelectionContext";
import { PageHeader } from "../components/common/PageHeader";
import { ButtonIcon } from "../components/common/ButtonIcon";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { MainMenu } from "../components/common/MainMenu";

export function Home({ dimensioni, gruppi }: AppConfig) {
  const { resetContext, hasIngredients } = useSelection();
  const isEmpty = !hasIngredients();

  const dimensions = Object.entries(dimensioni);
  const groups = Object.entries(gruppi);

  return (
    <div className="page-container sticky">
      <PageHeader
        left={
          <NavLink
            to={"/cart"}
          >
            <ButtonIcon
              icon={faCartShopping}
              classes="gold border-r-10"
              tooltip="Carello"
            />
          </NavLink>
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
            text="cancella"
            classes="red-bg primary-contrast-color border-r-10"
            clickHandler={resetContext}
            disabled={isEmpty}
            tooltip="Rimuove la selezione attuale"
          />
        }
        right={
          <ButtonText
            text="salva"
            classes="primary-bg primary-contrast-color border-r-10"
            disabled={isEmpty}
            tooltip="Salva la selezione attuale"
          />
        }
        solid={true}
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
