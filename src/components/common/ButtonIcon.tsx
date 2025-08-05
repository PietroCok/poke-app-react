import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, type ButtonProps } from './Button';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ButtonIconProps extends ButtonProps {
  icon: IconDefinition
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
      <FontAwesomeIcon icon={icon} />
    </Button>
  )
}
