import AdvertisementModel from "@/model/advertisement";
import FloorTypeModel from "@/model/floor-type";
import FunishingTypeModel from "@/model/funishing-type";
import OtherInfoModel from "@/model/other-info";
import OwnershipModel from "@/model/ownership";
import PropertyModel from "@/model/property";
import PropertyTypeModel from "@/model/property-type";
import StateModel from "@/model/state";
import TownshipModel from "@/model/township";
import UserModel from "@/model/user";
import WaterSystemModel from "@/model/water-system";
import { connectDB } from "@/utils/dbConnect";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    connectDB();
    const advertisement = await AdvertisementModel.findOne({
      adId: params.id,
    }).populate([
      { path: "otherInfo", select: "label", model: OtherInfoModel },
      {
        path: "property",
        select: "name address info imgs otherInfo propertyId",
        model: PropertyModel,
        populate: [
          {
            path: "address",
            populate: [
              { path: "state", select: "label", model: StateModel },
              { path: "township", select: "label", model: TownshipModel },
            ],
          },
          {
            path: "info",
            populate: [
              { path: "type", select: "name", model: PropertyTypeModel },
              { path: "floorType", select: "label", model: FloorTypeModel },
              { path: "waterSystem", select: "label", model: WaterSystemModel },
              { path: "ownership", select: "label", model: OwnershipModel },
              {
                path: "funishingType",
                select: "label",
                model: FunishingTypeModel,
              },
            ],
          },
          { path: "otherInfo", select: "label", model: PropertyTypeModel },
        ],
      },
      {
        path: "contactInfo",
        select: "username email phone contactInfo",
        model: UserModel,
      },
    ]);
    return Response.json(advertisement, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Fail to fetch advertisement", { status: 500 });
  }
};
