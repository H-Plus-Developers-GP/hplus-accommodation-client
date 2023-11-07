import Link from "next/link";
import AdvertisementGrid from "./components/AdvertisementGrid";
import { AdvertisementDocument } from "@/model/advertisement";
import MainSearchForm from "@/components/MainSearchForm";

async function getAdvertisement(): Promise<Array<AdvertisementDocument>> {
    const res = await fetch("http://localhost:3000/api/advertisement");
    if (!res.ok) {
        throw new Error("Fail to fetch data");
    }
    return res.json();
}

const PropertiesPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const adType = searchParams.adType;
    const state = searchParams.state;
    const township = searchParams.township;
    const propertyType = searchParams.propertyType;
    const minPrice = searchParams.minPrice;
    const maxPrice = searchParams.maxPrice;

    const advertisements = await getAdvertisement();

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
            <div className="flex items-start justify-stretch gap-8 sm:mx-2 md:mx-20 xl:mx-40 my-3">
                <div className="flex-1">
                    <AdvertisementGrid advertisements={advertisements} />
                </div>
                <div className="w-96 p-4 bg-gray-600">

                </div>
            </div>
        </main>
    )
}

export default PropertiesPage