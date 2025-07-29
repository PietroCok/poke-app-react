import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function IconButton({icon, color}){
  return (
    <button className={`button icon icon-only alt-bg ${color}`}>
      <FontAwesomeIcon icon={icon} />
    </button>
  )
}