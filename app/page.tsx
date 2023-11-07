import MainSearchForm from '@/components/MainSearchForm'

async function getLocation(): Promise<Array<{ label: string, value: string, townships: Array<{ label: string, value: string }> }>> {
  const res = await fetch("http://localhost:3000/api/location");
  if (!res.ok) {
    throw new Error("Fail to fetch data");
  }

  return res.json();
}

async function getPropertyType(): Promise<Array<{ label: string, value: string }>> {
  const res = await fetch("http://localhost:3000/api/property-type");
  if (!res.ok) {
    throw new Error("Fail to fetch data");
  }
  return res.json();
}

async function getData() {
  const data = await Promise.all([getLocation(), getPropertyType()]);
  return data;
}

export default async function Home() {

  const [locations, propertyTypes] = await getData();

  return (
    <main className='main-header'>
      <div className="w-full py-20">
        <MainSearchForm locations={locations} propertyTypes={propertyTypes} />
      </div>
    </main>
  )
}
