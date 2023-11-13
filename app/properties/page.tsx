import Link from "next/link";
import AdvertisementGrid from "./components/AdvertisementGrid";
import GenericForm from "@/components/GenericForm";
import { getAdvertisement, getLocation, getPropertyType } from "@/services";

async function getData() {
    const data = await Promise.all([getLocation(), getPropertyType()]);
    return data;
}


const PropertiesPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const adType = searchParams.adType;

    const advertisements = await getAdvertisement();
    const [locations, propertyTypes] = await getData();

    return (
        <main>
            <div className="main-header ">
                <div className="w-full py-10 bg-black bg-opacity-50">
                    <div className="flex items-center justify-between sm:mx-2 md:mx-20 xl:mx-40">
                        <h3 className="text-white font-bold text-xl">All Properties {adType && `to ${adType}`}</h3>
                        <h4 className="text-white">
                            <Link href="/">/ Home</Link> / <Link href="/properties?adType=Buy">Properties</Link>
                        </h4>
                    </div>
                </div>
            </div>
            <div className="flex max-md:flex-col items-start justify-stretch gap-8 max-sm:mx-2 sm:mx-2 md:mx-20 xl:mx-40 my-3">
                <div className="flex-1">
                    <AdvertisementGrid advertisements={advertisements} />
                </div>
                <div className="w-96 p-4 bg-gray-600">
                    <GenericForm mode="side" locations={locations} propertyTypes={propertyTypes} />
                </div>
            </div>
        </main>
    )
}

export default PropertiesPage