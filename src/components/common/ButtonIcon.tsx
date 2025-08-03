import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, type ButtonProps } from './Button';

export interface ButtonIconProps extends ButtonProps {
  icon: any,
}

export function ButtonIcon({ icon, classes, tooltip, disabled, clickHandler }: ButtonIconProps) {
  const _classes = classes ? `${classes} ` : '';

  return (
    <Button
      classes={`${_classes}icon icon-only alt-bg`}
      clickHandler={clickHandler}
      tooltip={tooltip}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  )
}
