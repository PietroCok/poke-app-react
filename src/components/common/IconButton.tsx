import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IconButtonProps {
  icon: any,
  color: string
}

export function IconButton({ icon, color }: IconButtonProps) {
  return (
    <button className={`button icon icon-only alt-bg ${color}`}>
      <FontAwesomeIcon icon={icon} />
    </button>
  )
}