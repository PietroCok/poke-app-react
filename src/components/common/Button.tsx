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
  linkTo?: string                              
  clickHandler?: (event: ButtonClickEvent) => void
}

export function Button({ children, style, classes, tooltip, disabled, type, linkTo, clickHandler }: ButtonProps) {
  let _classes = classes ? `${classes} ` : '';
  if (disabled) {
    _classes += 'disabled '
  }

  if(linkTo) {
    return (
      <NavLink
        to={linkTo}
        className={`${_classes}button`}
        title={tooltip}
        style={style}
      >
        {children}
      </NavLink>
    )
  } else {
    return (
      <button
        className={`${_classes}button`}
        onClick={(event: ButtonClickEvent) => clickHandler ? clickHandler(event): ''}
        title={tooltip}
        style={style}
        type={type}
      >
        {children}
      </button>
    )
  }

}