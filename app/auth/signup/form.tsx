"use client";
import Input from "@/components/Form/Input";
import { SignUpFormInput, signupSchema } from "@/schema/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const defaultValues: SignUpFormInput = {
  username: "",
  phone: "",
  password: "",
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(signupSchema),
  });
  const submitHandler: SubmitHandler<SignUpFormInput> = async (data) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    console.log(resData);
  };
  return (
    <div className="border lg:w-1/2 max-lg:w-full rounded-md shadow-sm bg-gray-600 p-4 my-4 sm:mx-2 md:mx-20 xl:mx-40">
      <form onSubmit={handleSubmit(submitHandler)} noValidate>
        <Input
          id="username"
          name="username"
          label="Username"
          register={register}
          required={true}
          error={errors?.username?.message || ""}
          placeholder="Eg. U Thant"
          disabled={false}
          type="text"
        />
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
        <Link className="text-blue-600" href="/auth/signin">
          Already have an account?
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

export default SignUpForm;
