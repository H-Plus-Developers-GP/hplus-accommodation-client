import { AdvertisementDocument } from "@/model/advertisement"
import Image from "next/image"
import ItemAmenities from "./ItemAmenities"
import { RiLayoutMasonryLine } from "react-icons/ri"
import { FaBath, FaBed, FaBuildingUser, FaStairs } from "react-icons/fa6"
import { FaHandHoldingWater } from "react-icons/fa"
import { MdElectricBolt, MdRoomPreferences } from "react-icons/md"
import { BsGrid1X2, BsHouseDoor } from "react-icons/bs"
import { TbAirConditioning, TbToolsKitchen2 } from "react-icons/tb"
import { PiCarProfile, PiStairsLight } from "react-icons/pi"

type Props = {
  advertisement: AdvertisementDocument
}

const AdvertisementDetail: React.FC<Props> = ({ advertisement }) => {
  return <div>
    <Image quality={100} src={advertisement.property.imgs[0]} alt={advertisement.property.name} width={0} height={200} style={{ width: '100%', height: '200px' }} className='object-cover' />
    <p className='text-red-600 text-xs font-light my-4'>{advertisement.property.info.type.name} to {advertisement.adType}</p>
    <h3 className='text-xl font-bold my-4'>{advertisement.title}</h3>
    <p className='text-sm font-semibold text-gray-600 my-4'>{advertisement.subTitle}</p>
    <div className="flex items-center justify-between my-4">
      <h4 className='bg-red-600 bg-opacity-80 p-2 font-semibold text-white'><sup>MMK</sup> {advertisement.price.price}</h4>
      <ItemAmenities icon={<RiLayoutMasonryLine />} value={`${advertisement.property.info.area.area || advertisement.property.info.area.acre} sq-ft`} />
      <ItemAmenities icon={<FaBed />} value={advertisement.property.info.bedroom} />
      <ItemAmenities icon={<FaBath />} value={advertisement.property.info.bathroom} />
      <ItemAmenities icon={<FaBuildingUser />} value={advertisement.property.info.ownership.label} />
    </div>
    <div
      className="my-4"
      dangerouslySetInnerHTML={{ __html: advertisement.description as string }}
    />
    <hr className="my-8" />
    <div className="my-8">
      <h3 className='text-xl font-bold my-8'>Detail Amenities</h3>
      <div className="flex items-center justify-start gap-8 flex-wrap">
        <ItemAmenities icon={<BsHouseDoor className="text-3xl" />} value={advertisement.property.info.type.name} />
        <ItemAmenities icon={<RiLayoutMasonryLine className="text-3xl" />} value={`${advertisement.property.info.area.area || advertisement.property.info.area.acre} sq-ft`} />
        <ItemAmenities icon={<FaBed className="text-3xl" />} value={advertisement.property.info.bedroom} />
        <ItemAmenities icon={<FaBath className="text-3xl" />} value={advertisement.property.info.bathroom} />
        <ItemAmenities icon={<FaStairs className="text-3xl" />} value={advertisement.property.info.floor} />
        <ItemAmenities icon={<PiStairsLight className="text-3xl" />} value={advertisement.property.info.story} />
        <ItemAmenities icon={<TbToolsKitchen2 className="text-3xl" />} value={advertisement.property.info.kitchen} />
        <ItemAmenities icon={<TbAirConditioning className="text-3xl" />} value={advertisement.property.info.aircon} />
        <ItemAmenities icon={<FaBuildingUser className="text-3xl" />} value={advertisement.property.info.ownership.label} />
        {!!advertisement.property.info.floorType && <ItemAmenities icon={<BsGrid1X2 className="text-3xl" />} value={advertisement.property.info.floorType.label} />}
        {!!advertisement.property.info.waterSystem && <ItemAmenities icon={<FaHandHoldingWater className="text-3xl" />} value={advertisement.property.info.waterSystem.label} />}
        <ItemAmenities icon={<PiCarProfile className="text-3xl" />} value={advertisement.property.info.parkingAvailibity === "true" ? "Parking Available" : "Parking Unavailable"} />
        <ItemAmenities icon={<MdElectricBolt className="text-3xl" />} value={advertisement.property.info.electronicSystem} />
      </div>
    </div>
    <hr className="my-8" />
    <div className="my-8">
      <h3 className='text-xl font-bold my-8'>ADDITIONAL INFORMATION</h3>
      {
        advertisement.property.otherInfo.length === 0 ?
          <p className='text-sm font-semibold text-gray-600 my-4'>NO ADDITIONAL INFORMATION</p>
          :
          <ul className="list-disc">
            {
              advertisement.property.otherInfo.map((item: { _id: string, label: string }) => {
                return <li key={item._id}>
                  {item.label}
                </li>
              })
            }
          </ul>
      }
    </div>
    <hr className="my-8" />
    <div className="my-8">
      <h3 className='text-xl font-bold my-8'>PLACES NEAR BY</h3>
      <p className='text-sm font-semibold text-gray-600 my-4'>{advertisement.property.info.nearBy}</p>
    </div>
  </div>
}

export default AdvertisementDetail;