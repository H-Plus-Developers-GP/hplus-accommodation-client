import { AdvertisementDocument } from "@/model/advertisement";

export async function getLocation(): Promise<Array<{ label: string, value: string, townships: Array<{ label: string, value: string }> }>> {
    const res = await fetch("http://localhost:3000/api/location");
    if (!res.ok) {
        throw new Error("Fail to fetch data");
    }

    return res.json();
}

export async function getPropertyType(): Promise<Array<{ label: string, value: string }>> {
    const res = await fetch("http://localhost:3000/api/property-type");
    if (!res.ok) {
        throw new Error("Fail to fetch data");
    }
    return res.json();
}

export async function getAdvertisement(): Promise<Array<AdvertisementDocument>> {
    const res = await fetch("http://localhost:3000/api/advertisement");
    if (!res.ok) {
        throw new Error("Fail to fetch data");
    }
    return res.json();
}

export async function getAdvertisementById(id: string): Promise<AdvertisementDocument> {
    const res = await fetch("http://localhost:3000/api/advertisement/" + id);
    if (!res.ok) {
        throw new Error("Fail to fetch data");
    }
    return res.json();
} 