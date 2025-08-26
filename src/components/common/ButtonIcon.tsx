import { Button, type ButtonProps } from './Button';

export interface ButtonIconProps extends ButtonProps {
  icon: React.ReactElement
}

export function ButtonIcon({ icon, classes, ...otherProps }: ButtonIconProps) {
  const _classes = classes ? `${classes} ` : '';

  return (
    <Button
      classes={`${_classes} button-icon-only ${_classes.indexOf('-bg') > 0 ? '' : 'alt-bg'}`}
      {...otherProps}
    >
      {icon}
    </Button>
  )
}
