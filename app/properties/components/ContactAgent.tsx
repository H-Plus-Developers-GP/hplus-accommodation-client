import React from "react";

type Props = {
  name: string;
  email: string;
  phone: string;
};

const ContactAgent: React.FC<Props> = ({ name, email, phone }) => {
  return (
    <div className="flex-1 border border-gray-200 my-1">
      <div className="bg-gray-100 border-b border-b-gray-200 p-2">
        <h3 className="font-bold">Responsible Agent Info</h3>
      </div>
      <div className="p-1">
        <div className="border border-gray-200 my-1 rounded-sm bg-gray-50 p-2">
          {name}
        </div>
        <div className="border border-gray-200 my-1 rounded-sm bg-gray-50 p-2">
          {email}
        </div>
        <div className="border border-gray-200 my-1 rounded-sm bg-gray-50 p-2">
          {phone}
        </div>
      </div>
      <button
        type="button"
        onClick={() => {}}
        className="text-white bg-blue-600 hover:bg-blue-500 font-medium text-sm px-5 py-2 rounded-md text-center w-full"
      >
        Call Agent
      </button>
    </div>
  );
};

export default ContactAgent;
