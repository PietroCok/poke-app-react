import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-regular-svg-icons";

import { ButtonIcon } from "@/components/common/ButtonIcon";
import { MainMenu } from "@/components/common/MainMenu";
import { PageHeader } from "@/components/common/PageHeader";
import { ButtonText } from "@/components/common/ButtonText";
import { PageFooter } from "@/components/common/PageFooter";
import { useFavorite } from "@/context/FavoriteContext";
import type { Poke } from "@/types";
import { FavoriteItem } from "@/components/common/FavoriteItem";

const ITEM_MEMO_THRESHOLD = 10;

export function Favorites() {
  const { favorites, removeFavorite, removeAllFavorites, duplicateItem } = useFavorite();

  const hasItems = favorites.length > 0;

  return (
    <div className="page-container h-100 flex flex-column">
      <PageHeader
        left={
          <ButtonIcon
            icon={<FontAwesomeIcon icon={faHouse} />}
            classes="primary-color border-r-10"
            tooltip="Chiudi"
            linkTo={"/"}
          />
        }
        center={
          <h3
            className="flex flex-center h-100"
          >
            Preferiti
          </h3>
        }
        right={
          <MainMenu />
        }
        classes="main-bg"
      />

      <section
        className="flex-1 flex flex-column padding-1 gap-1"
      >
        {
          hasItems ?
            renderFavorites(
              favorites,
              favorites.length > ITEM_MEMO_THRESHOLD,
              removeFavorite,
              duplicateItem
            )
            :
            <span
              className="flex flex-center h-100"
            >
              Nessun preferito disponibile
            </span>
        }
      </section>

      <PageFooter
        left={
          <ButtonText
            text="svuota"
            classes="red-bg primary-contrast-color border-r-10"
            clickHandler={removeAllFavorites}
            disabled={!hasItems}
            disabledMessage={`Nessun preferito da eliminare`}
          />
        }
        classes="main-bg"
      />
    </div>
  )
}


const renderFavorites = (
  items: Poke[], 
  useMemo: boolean,
  deleteItem: (itemId: string, itemName: string) => void,
  duplicate: (itemId: string) => void
) => {
  return items.map(item => {
    return (
      <FavoriteItem
        key={item.id}
        item={item}
        deleteItem={deleteItem}
        duplicate={duplicate}
        useMemo={useMemo}
      />
    )
  })
}