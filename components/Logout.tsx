"use client";
import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return <button className="text-red-600" onClick={() => signOut()}>Logout</button>;
};

export default Logout;
