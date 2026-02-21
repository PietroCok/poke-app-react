import type { ReactNode } from "react"
import { NavLink } from "react-router-dom"

import type { ButtonClickEvent } from "@/types"
import { useToast } from "@/context/ToastContext"

export interface ButtonProps {
  children?: ReactNode
  style?: React.CSSProperties
  classes?: string
  tooltip?: string
  disabled?: boolean
  disabledMessage?: string
  type?: "submit" | "reset" | "button" | undefined
  linkTo?: string | undefined                              
  clickHandler?: (event: ButtonClickEvent) => void
  [key: `data-${string}`]: string | number | undefined;
}

export function Button({ children, style, classes, tooltip, disabled, disabledMessage, type, linkTo, clickHandler, ...rest }: ButtonProps) {
  const { showError } = useToast();

  let _classes = classes ? `${classes} ` : '';
  if (disabled) {
    _classes += 'disabled ';
  }

  const clickCallback = (event: ButtonClickEvent) => {
    if(disabled) {
      showError(disabledMessage || 'Operazione non consentita');
      return;
    }

    return clickHandler ? clickHandler(event) : '';
  }

  if(linkTo) {
    return (
      <NavLink
        to={linkTo}
        className={`${_classes}button`}
        title={tooltip}
        style={style}
        onClick={clickCallback}
        {...rest}
      >
        {children}
      </NavLink>
    )
  } else {
    return (
      <button
        onClick={clickCallback}
        className={`${_classes}button`}
        title={tooltip}
        style={style}
        type={type}
        {...rest}
      >
        {children}
      </button>
    )
  }

}