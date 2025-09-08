import type { SizeType, PokeSize } from '@/types'

import { SizeGroup } from './SizeGroup'

interface SizeSelectorProps {
  sizes: [PokeSize, SizeType][]
}

export function SizeSelector({ sizes }: SizeSelectorProps) {

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
          price={_size.price}
          limits={_size.limits}
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
