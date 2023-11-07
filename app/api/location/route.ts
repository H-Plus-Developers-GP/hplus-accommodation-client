import StateModel from "@/model/state";
import TownshipModel, { TownshipDocument } from "@/model/township";
import { connectDB } from "@/utils/dbConnect"

export const GET = async () => {
    try {
        await connectDB();
        const states = await StateModel.find({}, { _id: 1, label: 1, township: 1 }).populate([{ path: "townships", model: TownshipModel, select: "label" }]);
        const stateOptions = states.map((state) => {
            return {
                label: state.label,
                value: state._id,
                townships: state.townships.map((township: TownshipDocument) => {
                    return {
                        label: township.label,
                        value: township._id
                    }
                })
            }
        })
        return Response.json(stateOptions, { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Fail to fetch states", { status: 500 })
    }
}