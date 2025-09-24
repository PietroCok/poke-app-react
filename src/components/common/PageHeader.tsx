import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonIcon } from "./ButtonIcon";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";

export interface PageHeaderProps {
  classes?: string
  left?: React.ReactNode
  center?: React.ReactNode
  right?: React.ReactNode
}

export function PageHeader({ classes, left, center, right }: PageHeaderProps) {

  try {
    const { getItemsCount } = useCart();
  
    if (!left) {
      left = <ButtonIcon
        icon={<FontAwesomeIcon icon={faCartShopping} />}
        classes="gold border-r-10"
        tooltip="Carrello"
        linkTo={"/cart"}
        data-cart-count={getItemsCount() || null}
      />
    }
  } catch (ignored) {
    // we accept execption here because useCart context maight not be available at this point
  }

  let _classes = classes ? `${classes} ` : '';


  return (
    <header
      className={`${_classes}page-header`}
    >
      {renderElement(left, "padding-1")}
      {renderElement(center, "padding-1-0 min-w-0")}
      {renderElement(right, "padding-1")}
    </header>
  )
}

function renderElement(element: React.ReactNode, classes: string) {
  return (
    <div className={classes} >{element}</div>
  )
}