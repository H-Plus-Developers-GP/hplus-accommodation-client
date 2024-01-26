import { getServerSession } from "next-auth";
import SignInForm from "./form";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getServerSession();
  if (!!session) {
    redirect("/");
  }
  return <SignInForm />;
};

export default SignIn;
