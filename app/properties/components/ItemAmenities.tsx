import { ReactNode } from "react";

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

export default ItemAmenities;