import { Button, type ButtonProps } from './Button';

export interface ButtonIconProps extends ButtonProps {
  icon: React.ReactElement
}

export function ButtonIcon({ icon, classes, ...otherProps }: ButtonIconProps) {
  const _classes = classes ? `${classes} ` : '';

  return (
    <Button
      classes={`${_classes}icon icon-only alt-bg`}
      {...otherProps}
    >
      {icon}
    </Button>
  )
}
