import { useState } from "react";
import type { SizeType, Group, PokeSize, PokeConfig } from "@/types";

import { IngredientGroup } from "../components/home/IngredientGroup";
import { SizeSelector } from "../components/home/SizeSelector";
import { PageFooter } from "../components/common/PageFooter";
import { ButtonText } from "../components/common/ButtonText";
import { usePokeSelection } from "../context/PokeSelectionContext";
import { PageHeader } from "../components/common/PageHeader";
import { MainMenu } from "../components/common/MainMenu";
import { SaveSelectionModal } from "@/components/modals/SaveSelectionModal";

export function PokeConfigurator({ sizes, groups }: PokeConfig) {
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const { resetContext, hasIngredients, getTotalPrice } = usePokeSelection();
  const isEmpty = !hasIngredients();

  const dimensions = Object.entries(sizes) as [PokeSize, SizeType][];
  const groupsEntries = Object.entries(groups);

  return (
    <div className="page-container">
      <PageHeader
        right={
          <MainMenu />
        }
      />

      <h2 id="page-title">crea la tua poke bowl</h2>

      <SizeSelector sizes={dimensions} />

      <section id="ingredients-selection-container">
        {renderGroups(groupsEntries)}
      </section>

      <PageFooter
        left={
          <ButtonText
            text="svuota"
            classes="red-bg primary-contrast-color border-r-10"
            clickHandler={resetContext}
            disabled={isEmpty}
            disabledMessage={`Nessun ingrediente selezionato`}
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
            disabled={isEmpty}
            disabledMessage={`Nessun ingrediente selezionato`}
            tooltip="Salva la selezione attuale"
            clickHandler={() => setIsSaveOpen(true)}
          />
        }
        classes={'main-bg'}
      />

      {
        isSaveOpen &&
        <SaveSelectionModal
          hideModal={() => setIsSaveOpen(false)}
          source="poke"
        />
      }

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
