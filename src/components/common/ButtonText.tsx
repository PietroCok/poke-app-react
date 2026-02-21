import { Button, type ButtonProps } from "./Button"

export interface ButtonTextProps extends ButtonProps {
  text: string
}

export function ButtonText({ text, classes, ...otherProps }: ButtonTextProps) {
  let _classes = classes ? `${classes} ` : '';

  return (
    <Button
      classes={`${_classes}button button-text`}
      {...otherProps}
    >
      {text}
    </Button>
  )
}