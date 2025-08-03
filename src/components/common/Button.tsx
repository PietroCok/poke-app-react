import type { ReactNode } from "react"

export interface ButtonProps {
  children?: ReactNode
  classes?: string
  tooltip?: string
  disabled?: boolean
  clickHandler?: () => void
}

export function Button({ children, classes, tooltip, disabled, clickHandler }: ButtonProps) {
  let _classes = classes ? `${classes} ` : '';
  if (disabled) {
    _classes += 'disabled '
  }

  return (
    <button
      className={`${_classes}button`}
      onClick={clickHandler}
      title={tooltip}
    >
      {children}
    </button>
  )
}