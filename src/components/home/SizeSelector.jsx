import { useSelection } from '../../context/configurator/SelectionContext';
import SizeGroup from './SizeGroup'


export default function SizeSelector({ sizes }) {
  const { size: selectedSize } = useSelection();

  const renderSizes = () => {
    return sizes.map(size => {
      const _size = {
        name: size[0],
        ...size[1]
      }

      return (
        <SizeGroup
          key={_size.name}
          name={_size.name}
          price={_size.prezzo}
          limits={_size.limiti}
        />
      )
    })
  }

  return (
    <section id='size-selector-container'>
      {renderSizes()}
    </section>
  )
}
