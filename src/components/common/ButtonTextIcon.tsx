import { Button, type ButtonProps } from './Button';

export interface ButtonTextIconProps extends ButtonProps {
  icon: React.ReactElement
  text: string
}

export function ButtonTextIcon({ icon, text, classes, ...otherProps }: ButtonTextIconProps) {
  const _classes = classes ? `${classes} ` : '';

  return (
    <Button
      classes={`${_classes} button-text button-icon-only ${_classes.indexOf('-bg') > 0 ? '' : 'alt-bg'}`}
      {...otherProps}
    >
      {icon}
      <span
        className={`main-color text-normal`}
      >
        {text}
      </span>
    </Button>
  )
}
