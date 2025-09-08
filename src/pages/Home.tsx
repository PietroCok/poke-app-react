import { useState } from "react";
import type { AppConfig, SizeType, Group, PokeSize } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { IngredientGroup } from "../components/home/IngredientGroup";
import { SizeSelector } from "../components/home/SizeSelector";
import { PageFooter } from "../components/common/PageFooter";
import { ButtonText } from "../components/common/ButtonText";
import { useSelection } from "../context/SelectionContext";
import { PageHeader } from "../components/common/PageHeader";
import { ButtonIcon } from "../components/common/ButtonIcon";
import { MainMenu } from "../components/common/MainMenu";
import { SaveSelectionModal } from "@/components/modals/SaveSelectionModal";
import { useCart } from "@/context/CartContext";

export function Home({ sizes, groups }: AppConfig) {
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const { resetContext, hasIngredients, getTotalPrice } = useSelection();
  const isEmpty = !hasIngredients();
  const { getItemsCount } = useCart();

  const dimensions = Object.entries(sizes) as [PokeSize, SizeType][];
  const groupsEntries = Object.entries(groups);

  return (
    <div className="page-container">
      <PageHeader
        left={
          <ButtonIcon
            icon={<FontAwesomeIcon icon={faCartShopping} />}
            classes="gold border-r-10"
            tooltip="Carrello"
            linkTo={"/cart"}
            data-cart-count={getItemsCount() || null}
          />
        }
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
