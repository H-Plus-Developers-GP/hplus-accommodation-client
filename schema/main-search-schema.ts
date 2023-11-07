import { object, string, number } from "zod";

export interface MainSearchModel {
    adType: string;
    state?: string;
    township?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
}

export const mainSearchSchema = object({
    adType: string({ required_error: "Advertisement Type is required" }),
    state: string().optional(),
    township: string().optional(),
    propertyType: string(),
    minPrice: number().optional(),
    maxPrice: number().optional()
});