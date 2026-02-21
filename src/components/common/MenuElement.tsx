import { ButtonTextIcon, type ButtonTextIconProps } from "./ButtonTextIcon";


export function MenuElement({ classes, ...props }: ButtonTextIconProps) {

  const _classes = classes ? `${classes} ` : '';

  return (
    <ButtonTextIcon
      {...props}
      classes={`menu-element text-capitalize flex align-center gap-1 main-bg ${_classes}`}
    />
  )
}
