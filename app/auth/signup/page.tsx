import React from "react";
import SignUpForm from "./form";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

const SignUp = async () => {
  const session = await getServerSession();
  if (!!session) {
    redirect("/");
  }
  return (
    <div className="flex w-full justify-center items-center flex-col p-10">
      <h1 className="text-gray-700 text-3xl font-bold">Sign Up</h1>
      <p className="text-gray-600 mt-2 mb-4">Create a new account</p>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
