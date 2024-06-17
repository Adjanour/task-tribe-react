import { NavLink } from "react-router-dom";
import { NavItems, NavItem } from "./NavBarItems";
import { Clock } from "../Clock";
import image from "../../assets/60111.jpg";
import { SearchBar } from "../SearchBar";
import storage from "@/utils/storage";
import { AuthUser } from "@/features/auth";
type NavbarItemProps = {
  item: NavItem;
};

const NavbarItem = ({ item }: NavbarItemProps) => {
  return (
    <div>
      <NavLink to={item.path ? item.path : ""} className="rounded-md nav-link">
        <button className="nav-button shadow-md hover:ring-blue-700">
          <div
            className="title-theme"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className="icon">{item.icon}</div>
            <div className="text-md" style={{ marginLeft: "5px" }}>
              {item.title}
            </div>
          </div>
        </button>
      </NavLink>
    </div>
  );
};

function Navbar() {
  const user:AuthUser = storage.getUser()
  return (
    <div typeof="button" className="nav shadow-md hidden bg-white dark:bg-black gap-1  lg:flex">
      {NavItems &&
        NavItems.map((item, index) => <NavbarItem key={index} item={item} />)}
      <div className="bg-blue-500 text-white h-fit hidden rounded-md shadow-md dark:bg-white dark:text-black p-1 w-fit sm:flex md:flex lg:flex sm:flex-row lg:flex-row md:flex-row text-md text-1xl ">
        <Clock />
      </div>
      <div>
        <SearchBar />
      </div>
      <div className="w-fit">
        <img src={user?.profileImage} alt="profile" className="w-8 h-8 rounded-lg" />
      </div>
    </div>
  );
}

export default Navbar;
