import { Button, type ButtonProps } from './Button';

export interface ButtonIconProps extends ButtonProps {
  icon: React.ReactElement
}

export function ButtonIcon({ icon, style, classes, tooltip, disabled, clickHandler }: ButtonIconProps) {
  const _classes = classes ? `${classes} ` : '';

  return (
    <Button
      classes={`${_classes}icon icon-only alt-bg`}
      clickHandler={clickHandler}
      tooltip={tooltip}
      disabled={disabled}
      style={style}
    >
      {icon}
    </Button>
  )
}
