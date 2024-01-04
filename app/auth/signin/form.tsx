"use client";
import Input from "@/components/Form/Input";
import { SignInFormInput, singinSchema } from "@/schema/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const defaultValues: SignInFormInput = {
  phone: "",
  password: "",
};

const SignInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(singinSchema),
  });
  const submitHandler: SubmitHandler<SignInFormInput> = async (data) => {
    const res = await signIn("credentials", {
      phone: data.phone,
      password: data.password,
      redirect: false,
    });
    if (!res?.error) {
      router.push("/");
    }
  };
  return (
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
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
