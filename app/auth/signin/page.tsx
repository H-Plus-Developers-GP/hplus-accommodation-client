import { getServerSession } from "next-auth";
import SignInForm from "./form";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getServerSession();
  if (!!session) {
    redirect("/");
  }
  return (
    <div className="flex w-full justify-center items-center flex-col p-10">
      <h1 className="text-gray-700 text-3xl font-bold">Sign In</h1>
      <p className="text-gray-600 mt-2 mb-4">Sign in to your account.</p>
      <SignInForm />
    </div>
  );
};

export default SignIn;
