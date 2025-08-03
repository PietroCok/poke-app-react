import type { Dimension } from '@/types'

import { SizeGroup } from './SizeGroup'

interface SizeSelectorProps {
  sizes: [string, Dimension][]
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
