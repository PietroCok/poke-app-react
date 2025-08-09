import type { ButtonClickEvent } from "@/types"
import type { ReactNode } from "react"

export interface ButtonProps {
  children?: ReactNode
  style?: React.CSSProperties
  classes?: string
  tooltip?: string
  disabled?: boolean
  type?: "submit" | "reset" | "button" | undefined
  clickHandler?: (event: ButtonClickEvent) => void
}

export function Button({ children, style, classes, tooltip, disabled, type, clickHandler }: ButtonProps) {
  let _classes = classes ? `${classes} ` : '';
  if (disabled) {
    _classes += 'disabled '
  }

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