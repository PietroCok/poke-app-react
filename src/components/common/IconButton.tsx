import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IconButtonProps {
  icon: any,
  classes?: string,
  clickHandler?: () => void
}

export function IconButton({ icon, classes, clickHandler }: IconButtonProps) {
  const _classes = classes ? `${classes} ` : '';
  return (
    <button 
      className={`${_classes}button icon icon-only alt-bg`}
      onClick={clickHandler}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  )
}