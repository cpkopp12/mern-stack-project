// IMPORTS --------------------------------
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

// COMPONENT ------------------------------------
const NavLinks = ({ isBigSidebar }) => {
  //dashboard context
  const { toggleSidebar, user } = useDashboardContext();
  const { role } = user;

  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        if (path === "admin" && role !== "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            className='nav-link'
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

// EXPORT ------------------------
export default NavLinks;
