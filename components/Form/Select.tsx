import { register } from "module";
import { UseFormRegister } from "react-hook-form";

type Props = {
    placeholder: string;
    register: UseFormRegister<any>;
    name: string;
    required: boolean;
    id: string;
    disabled: boolean
    error: string;
    options: Array<{ label: string, value: string }>;
    label: string;
}

const Select: React.FC<Props> = ({ placeholder, name, required, id, disabled = false, error, options, register, label }) => {
    return (
        <div className="w-full">
            <label htmlFor={id} className={`block mb-1 text-sm font-medium ${!!error ? "text-red-600" : "text-gray-100"}`}>{label}</label>
            <select
                disabled={disabled}
                placeholder={placeholder}
                id={id}
                {...register(name, { required })}
                className={`bg-gray-50 border ${!!error ? "border-red-300" : "border-gray-300 mb-4"} text-gray-600 text-sm rounded-sm focus:outline-none active:outline-none block w-full p-2.5 ${disabled ? "cursor-not-allowed" : ""}`}
            >
                {
                    options.map((option) => {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    })
                }
            </select>
            <p className="text-red-600 text-xs">{error}</p>
        </div>
    )
}

export default Select