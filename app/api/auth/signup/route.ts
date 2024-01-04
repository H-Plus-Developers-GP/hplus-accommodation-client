import CustomerModel from "@/model/customer";
import { connectDB } from "@/utils/dbConnect";

export async function POST(request: Request) {
  try {
    const { username, phone, password } = await request.json();
    console.log(username, phone, password);
    connectDB();
    const createdCustomer = await CustomerModel.create({ username, phone, password });
    return Response.json(createdCustomer, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}