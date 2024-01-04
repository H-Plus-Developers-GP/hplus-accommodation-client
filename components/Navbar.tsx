import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";

const Navbar = async () => {
  const session = await getServerSession();
  console.log(session);
  return (
    <nav className="bg-white flex items-center justify-between sm:mx-2 md:mx-20 xl:mx-40">
      <div className="flex">
        <Image
          src="/image/hplus-logo.jpg"
          alt="Logo"
          width={100}
          height={100}
        />
        <div className="w-14 h-14 bg-red-400 p-3 text-white text-xs">
          Real Estate
        </div>
      </div>
      <ul className="flex items-center gap-4">
        <li>
          <Link href="/" className="font-bold">
            Rent
          </Link>
        </li>
        <li>
          <Link href="/" className="font-bold">
            Buy
          </Link>
        </li>
        <li>
          <Link href="/" className="font-bold">
            Contact Us
          </Link>
        </li>
      </ul>
      <div className="max-sm:hidden cursor-pointer">
        {!!session ? (
          <Logout />
        ) : (
          <Link href="/auth/signin">
            <button>Sign In</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
