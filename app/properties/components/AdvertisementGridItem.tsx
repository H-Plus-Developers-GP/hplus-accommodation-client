import { AdvertisementDocument } from '@/model/advertisement'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { FaBath, FaBed, FaBuildingUser } from 'react-icons/fa6';
import { RiLayoutMasonryLine } from "react-icons/ri";

type Props = {
    advertisement: AdvertisementDocument
}

type AmenitiesProps = {
    icon: ReactNode;
    value: string
}

const ItemAmenities: React.FC<AmenitiesProps> = ({ icon, value }) => {
    return <div className='flex items-center gap-1'>
        <span>{icon}</span>
        <span>{value}</span>
    </div>
}

const AdvertisementGridItem: React.FC<Props> = ({ advertisement }) => {
    return (
        <div className='bg-white shadow-sm'>
            <div className='relative bg-black bg-opacity-10'>
                <Image quality={100} src={advertisement.property.imgs[0]} alt={advertisement.property.name} width={0} height={100} style={{ width: '100%', height: '200px' }} className='object-cover' />
                <h4 className='absolute bottom-0 right-0 bg-red-600 bg-opacity-80 p-2 font-semibold text-white'><sup>MMK</sup> {advertisement.price.price}</h4>
            </div>
            <div className="px-6 py-4">
                <div>
                    <p className='text-red-600 text-xs font-light'>{advertisement.property.info.type.name} to {advertisement.adType}</p>
                    <h3 className='text-xl font-bold'>{advertisement.title}</h3>
                    <p className='text-sm font-semibold text-gray-600'>{advertisement.subTitle}</p>
                </div>
                <div className='flex items-center justify-between flex-wrap mt-2 pt-2 border-t border-gray-200'>
                    {
                        (advertisement.property.info.area.area || advertisement.property.info.area.acre) &&
                        <ItemAmenities icon={<RiLayoutMasonryLine />} value={`${advertisement.property.info.area.area || advertisement.property.info.area.acre} sq-ft`} />
                    }
                    {
                        advertisement.property.info.bedroom &&
                        <ItemAmenities icon={<FaBed />} value={advertisement.property.info.bedroom} />
                    }
                    {
                        advertisement.property.info.bathroom &&
                        <ItemAmenities icon={<FaBath />} value={advertisement.property.info.bathroom} />
                    }
                    {
                        advertisement.property.info.ownership &&
                        <ItemAmenities icon={<FaBuildingUser />} value={advertisement.property.info.ownership.label} />
                    }
                </div>
            </div>
        </div>
    )
}

export default AdvertisementGridItem