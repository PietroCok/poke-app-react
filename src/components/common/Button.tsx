import type { ReactNode } from "react"

export interface ButtonProps {
  children?: ReactNode
  style?: React.CSSProperties
  classes?: string
  tooltip?: string
  disabled?: boolean
  clickHandler?: () => void
}

export function Button({ children, style, classes, tooltip, disabled, clickHandler }: ButtonProps) {
  let _classes = classes ? `${classes} ` : '';
  if (disabled) {
    _classes += 'disabled '
  }

  return (
    <button
      className={`${_classes}button`}
      onClick={clickHandler}
      title={tooltip}
      style={style}
    >
      {children}
    </button>
  )
}