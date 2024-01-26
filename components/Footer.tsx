import { FaLocationDot } from "react-icons/fa6";
import { BsTelephoneFill } from 'react-icons/bs';
import Link from "next/link";

const Footer = () => {
    return (
        <>
            <div className="bg-gray-600">
                <div className="flex gap-4 sm:mx-2 md:mx-20 xl:mx-40 py-5 text-white max-md:flex-col max-md:px-2">
                    <div className="flex-1">
                        <h4>CONTACTS</h4>
                        <p className="text-sm my-2 text-gray-400">We are the leading real estate and rental marketplace dedicated to empowering consumers with data.
                        </p>
                        <ul className="mt-5 text-sm">
                            <li className="flex items-center gap-2 mt-2 text-gray-300"><FaLocationDot /> Lathar Street, Lanmadaw Township, Yangon</li>
                            <li className="flex items-center gap-2 mt-2 text-gray-300"><BsTelephoneFill /> +959-780878870</li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h4>LATEST PROPERTIES</h4>
                        <p className="my-2 text-sm text-gray-400">No properties for now!</p>
                    </div>
                    <div className="flex-1">
                        <h4>QUICK LINKS</h4>
                        <ul className="my-2 text-sm">
                            <li className="py-2 text-xs text-gray-400 border-b border-gray-400"><Link href="/">HOME</Link></li>
                            <li className="py-2 text-xs text-gray-400 border-b border-gray-400"><Link href="/">BUY</Link></li>
                            <li className="py-2 text-xs text-gray-400 border-b border-gray-400"><Link href="/">RENT</Link></li>
                            <li className="py-2 text-xs text-gray-400 border-b border-gray-400"><Link href="/">CONTACT US</Link></li>
                        </ul>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="bg-gray-900 text-center p-2 text-sm text-gray-500">H-Plus Real Estate &copy; 2023 All Rights Reserved</div>
        </>
    )
}

export default Footer