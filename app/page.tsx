import GenericForm from '@/components/GenericForm';
import { getLocation, getPropertyType } from '@/services';

async function getData() {
  const data = await Promise.all([getLocation(), getPropertyType()]);
  return data;
}

export default async function Home() {

  const [locations, propertyTypes] = await getData();

  return (
    <main className='main-header'>
      <div className="w-full py-20">
        <GenericForm mode='main' locations={locations} propertyTypes={propertyTypes} />
      </div>
    </main>
  )
}
