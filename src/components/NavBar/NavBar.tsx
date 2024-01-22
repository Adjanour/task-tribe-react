import { NavLink } from "react-router-dom";
import { NavItems, NavItem } from "./NavBarItems";
import { Clock } from "../Clock";
import image from "../../assets/60111.jpg";
import { SearchBar } from "../SearchBar";
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
  return (
    <div className="nav shadow-md bg-white dark:bg-black gap-1">
      {NavItems &&
        NavItems.map((item, index) => <NavbarItem key={index} item={item} />)}
      <div className="bg-blue-500 text-white h-fit  rounded-md shadow-md dark:bg-white dark:text-black p-1 w-fit flex flex-row text-md text-1xl  md:hidden lg:block">
        <Clock />
      </div>
      <div>
        <SearchBar />
      </div>
      <div className="rounded-full w-[32px] h-[32px] aspect-auto circle">
        <img src={image} alt="profile" className="w-full h-full object-cover rounded-full" />
      </div>
    </div>
  );
}

export default Navbar;
