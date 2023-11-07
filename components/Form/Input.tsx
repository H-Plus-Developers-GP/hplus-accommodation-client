import { UseFormRegister } from "react-hook-form";

type Props = {
    placeholder: string;
    type: "text" | "email" | "password" | "number",
    register: UseFormRegister<any>;
    name: string;
    required: boolean;
    id: string;
    disabled: boolean
    error: string;
    label: string;
}

const Input: React.FC<Props> = ({ type, name, placeholder, id, disabled = false, required, register, error, label }) => {
    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className={`block mb-1 text-sm font-medium ${!!error ? "text-red-600" : "text-gray-100"}`}
            >
                {label}
            </label>
            <input
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                id={id}
                {...register(name, { required, valueAsNumber: type === "number" })}
                className={`bg-gray-50 border ${!!error ? "border-red-300" : "border-gray-300 mb-4"} text-gray-600 text-sm rounded-sm focus:outline-none active:outline-none block w-full p-2.5 ${disabled ? "cursor-not-allowed" : ""}`}
            />
            <p className="text-red-600 text-xs">{error}</p>
        </div>
    )
}

export default Input