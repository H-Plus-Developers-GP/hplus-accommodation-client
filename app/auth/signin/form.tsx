"use client";
import Input from "@/components/Form/Input";
import { SignInFormInput, singinSchema } from "@/schema/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const defaultValues: SignInFormInput = {
  phone: "",
  password: "",
};

const SignInForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(singinSchema),
  });
  const submitHandler: SubmitHandler<SignInFormInput> = async (data) => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        phone: data.phone,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        throw new Error(res.error);
      }
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-full justify-center items-center flex-col p-10">
      <h1 className="text-gray-700 text-3xl font-bold">Sign In</h1>
      <p className="text-gray-600 mt-2 mb-4">Sign in to your account.</p>
      {!!error && (
        <div className="border border-red-600 text-red-600 bg-red-200 p-2 rounded-sm">
          <b>Error: </b>{error}
        </div>
      )}
      <div className="border lg:w-1/2 max-lg:w-full rounded-md shadow-sm bg-gray-600 p-4 my-4 sm:mx-2 md:mx-20 xl:mx-40">
        <form onSubmit={handleSubmit(submitHandler)} noValidate>
          <Input
            id="phone"
            name="phone"
            label="Phone Number"
            register={register}
            required={true}
            error={errors?.phone?.message || ""}
            placeholder="Eg. 09987456321"
            disabled={false}
            type="text"
          />
          <Input
            id="password"
            name="password"
            label="Password"
            register={register}
            required={true}
            error={errors?.password?.message || ""}
            placeholder="Enter your password"
            disabled={false}
            type="password"
          />
          <Link className="text-blue-600" href="/auth/signup">
            Need an account?
          </Link>
          <button
            className="my-2 bg-white text-gray-600 py-2 w-full rounded-md"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In ...." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
