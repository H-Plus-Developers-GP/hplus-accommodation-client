import PropertyTypeModel from "@/model/property-type";
import { connectDB } from "@/utils/dbConnect"

export const GET = async () => {
    try {
        await connectDB();
        const propertyTypes = await PropertyTypeModel.find({}, { name: 1, _id: 1 });
        const propertyTypeOptions = propertyTypes.map((pt) => {
            return {
                label: pt.name,
                value: pt._id
            }
        })
        return Response.json(propertyTypeOptions, { status: 200 });
    } catch (error) {
        return new Response("Fail to fetch data", { status: 500 });
    }
}