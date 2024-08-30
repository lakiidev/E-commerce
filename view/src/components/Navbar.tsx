import { FC } from "react";
import { LuMenu } from "react-icons/lu";
interface NavbarProps {}
import { PiShoppingCartSimpleBold } from "react-icons/pi";

const Navbar: FC<NavbarProps> = ({}) => {
  const linkStyle = "text-black font-bold";
  return (
    <nav className="mt-10 flex w-full justify-between items-center max-w-[1440px] mx-auto md:px-10 sm:px-2 px-4 z-10 text-black">
      <h1 className="text-6xl font-bold tracking-tighter">EC</h1>
      <div className="flex items-center justify-end group overflow-hidden">
        <ul className="flex gap-5 text-2xl uppercase tracking-tighter w-0 list-none  overflow-hidden group-hover:w-full transition-all duration-1000 translate-x-[50%] group-hover:translate-x-0 bg-[#F2F2EF] group-hover:p-5 group-hover:pr-10  rounded-full">
          <li>
            <a className={linkStyle} href="">
              Store
            </a>
          </li>
          <li>
            <a className={linkStyle} href="">
              Orders
            </a>
          </li>
          <li>
            <a className={linkStyle} href="">
              Profile
            </a>
          </li>
          <li>
            <a
              className={`${linkStyle} flex items-center gap-2 relative`}
              href=""
            >
              Cart
              <PiShoppingCartSimpleBold />
              <div className="absolute text-lg text-center bg-[#01E3EB] w-6 h-6 -right-4 -bottom-2 rounded-full">
                01
              </div>
            </a>
          </li>
        </ul>
        <div className="p-5 rounded-full bg-[#F2F2EF] z-10">
          <LuMenu size={32} className="cursor-pointer text-black" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
