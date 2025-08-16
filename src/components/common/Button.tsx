import type { ButtonClickEvent } from "@/types"
import type { ReactNode } from "react"
import { NavLink } from "react-router-dom"

export interface ButtonProps {
  children?: ReactNode
  style?: React.CSSProperties
  classes?: string
  tooltip?: string
  disabled?: boolean
  type?: "submit" | "reset" | "button" | undefined
  linkTo?: string | undefined                              
  clickHandler?: (event: ButtonClickEvent) => void
  [key: `data-${string}`]: string | number | undefined;
}

export function Button({ children, style, classes, tooltip, disabled, type, linkTo, clickHandler, ...rest }: ButtonProps) {
  let _classes = classes ? `${classes} ` : '';
  if (disabled) {
    _classes += 'disabled ';
  }

  const clickCallback = (event: ButtonClickEvent) => {
    return clickHandler ? clickHandler(event) : '';
  }

  if(linkTo) {
    return (
      <NavLink
        to={linkTo}
        className={`${_classes}button`}
        title={tooltip}
        style={style}
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
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    )
  }

}