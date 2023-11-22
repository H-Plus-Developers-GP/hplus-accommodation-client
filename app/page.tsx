"use client";
import GenericForm from '@/components/GenericForm';
import { getLocation, getPropertyType } from '@/services';
import { useEffect, useState } from 'react';

// async function getData() {
//   const data = await Promise.all([getLocation(), getPropertyType()]);
//   return data;
// }

export default function Home() {

  // const [locations, propertyTypes] = await getData();
  const [locations, setLocations] = useState<Array<{ label: string, value: string, townships: Array<{ label: string, value: string }> }>>([]);
  const [propertyTypes, setPropertyTypes] = useState<Array<{ label: string, value: string }>>([]);
  useEffect(() => {
    Promise.all([getLocation(), getPropertyType()])
      .then(data => {
        setLocations(data[0]);
        setPropertyTypes(data[1]);
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <main className='main-header'>
      <div className="w-full py-20">
        <GenericForm mode='main' locations={locations} propertyTypes={propertyTypes} />
      </div>
    </main>
  )
}
