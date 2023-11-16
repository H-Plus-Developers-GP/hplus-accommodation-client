import { AdvertisementDocument } from '@/model/advertisement'
import React from 'react'
import AdvertisementGridItem from './AdvertisementGridItem'

type Props = {
  advertisements: Array<AdvertisementDocument>,
  cols?: string,
}

const AdvertisementGrid: React.FC<Props> = ({ advertisements }) => {
  return (
    <div className={`grid grid-cols-2 max-sm:grid-cols-1 gap-8`}>
      {
        advertisements.map((advertisement) => {
          return <AdvertisementGridItem key={advertisement._id} advertisement={advertisement} />
        })
      }
    </div>
  )
}

export default AdvertisementGrid