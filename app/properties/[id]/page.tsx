"use client";
import GenericForm from "@/components/GenericForm";
import { AdvertisementDocument } from "@/model/advertisement";
import {
  getAdvertisement,
  getAdvertisementById,
  getLocation,
  getPropertyType,
} from "@/services";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AdvertisementDetail from "../components/AdvertisementDetail";
import AdvertisementGridItem from "../components/AdvertisementGridItem";
import ContactAgent from "../components/ContactAgent";

async function getData() {
  const data = await Promise.all([getLocation(), getPropertyType()]);
  return data;
}

const PropertyDetail = () => {
  const params = useParams();
  const [advertisement, setAdvertisement] =
    useState<AdvertisementDocument | null>(null);
  const [locations, setLocations] = useState<
    Array<{
      label: string;
      value: string;
      townships: Array<{ label: string; value: string }>;
    }>
  >([]);
  const [propertyTypes, setPropertyTypes] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const [recommentedAds, setRecommendedAds] = useState<
    Array<AdvertisementDocument>
  >([]);
  const id: string = params.id as string;
  useEffect(() => {
    getAdvertisementById(id)
      .then((data) => setAdvertisement(data))
      .catch((err) => console.log(err));
    getAdvertisement()
      .then((data) => setRecommendedAds(data))
      .catch((err) => console.log(err));
    getData()
      .then((data) => {
        setLocations(data[0]);
        setPropertyTypes(data[1]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <main>
      <div className="main-header ">
        <div className="w-full py-10 bg-black bg-opacity-50">
          <div className="flex items-center justify-between sm:mx-2 md:mx-20 xl:mx-40">
            <h3 className="text-white font-bold text-xl">
              {advertisement?.title}
            </h3>
            <h4 className="text-white">
              <Link href="/">/ Home</Link> /{" "}
              <Link href="/properties?adType=Buy">Properties</Link>
            </h4>
          </div>
        </div>
      </div>
      <div className="flex max-md:flex-col items-start justify-stretch gap-8 max-sm:mx-2 sm:mx-2 md:mx-20 xl:mx-40 my-3">
        <div className="flex-1">
          {!!advertisement && (
            <AdvertisementDetail advertisement={advertisement} />
          )}
        </div>
        <div>
          <div className="w-96 p-4 bg-gray-600">
            <GenericForm
              mode="side"
              locations={locations}
              propertyTypes={propertyTypes}
            />
          </div>
          <ContactAgent
            name={advertisement?.contactInfo.username}
            email={advertisement?.contactInfo.email}
            phone={advertisement?.contactInfo.phone}
          />
        </div>
      </div>
      <hr className="my-8" />

      <div className="max-sm:mx-2 sm:mx-2 md:mx-20 xl:mx-40 my-8">
        <h3 className="text-xl font-bold my-8">RECOMMENDED PROPERTIES</h3>
        <div className="flex max-md:flex-col items-start justify-evenly gap-8">
          {recommentedAds
            .slice(0, 3)
            .filter((item) => item.adId !== id)
            .map((advertisement) => {
              return (
                <div className="flex-1" key={advertisement.adId}>
                  <AdvertisementGridItem advertisement={advertisement} />
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
};

export default PropertyDetail;
