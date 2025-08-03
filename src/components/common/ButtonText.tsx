import { Button, type ButtonProps } from "./Button"

interface ButtonTextProps extends ButtonProps{
  text: string
}

export function ButtonText({ text, classes, disabled, tooltip, clickHandler }: ButtonTextProps) {
  let _classes = classes ? `${classes} ` : '';

  return (
    <Button
      classes={`${_classes}button button-text`}
      clickHandler={clickHandler}
      tooltip={tooltip}
      disabled={disabled}
    >
      {text}
    </Button>
  )
}