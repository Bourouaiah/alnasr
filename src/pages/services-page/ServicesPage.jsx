import { NavLink, Outlet } from "react-router-dom";

function ServicesPage() {
  const activeStyles = {
    borderBottom: "3px solid #FFC265",
    color: "#FFC265",
    fontWeight: "bold",
  };
  return (
    <section className="ml-[100px] lg:ml-[20%] p-[15px] md:p-[30px] min-h-[85vh]">
      <ul className="flex items-center gap-[20px] mb-[20px] text-xs sm:text-base overflow-x-auto overflow-y-hidden pb-[10px]">
        <li>
          <NavLink
            className="pb-[5px] text-main-black"
            activeClassName="font-bold text-second-blue border-b-2 border-second-blue"
            to="/alnasr/home/services"
            style={
              location.pathname === "/alnasr/home/services"
                ? activeStyles
                : null
            }
          >
            Transport
          </NavLink>
        </li>
        <li>
          <NavLink
            className="pb-[5px] text-main-gray"
            activeClassName="font-bold text-second-blue border-b-2 border-second-blue"
            to="/alnasr/home/services/accommodation"
            style={
              location.pathname === "/alnasr/home/services/accommodation"
                ? activeStyles
                : null
            }
          >
            Accommodation
          </NavLink>
        </li>
        <li>
          <NavLink
            className="pb-[5px] text-main-gray"
            activeClassName="font-bold text-second-blue border-b-2 border-second-blue"
            to="/alnasr/home/services/health"
            style={
              location.pathname === "/alnasr/home/services/health"
                ? activeStyles
                : null
            }
          >
            Health
          </NavLink>
        </li>
        <li>
          <NavLink
            className="pb-[5px] text-main-gray"
            activeClassName="font-bold text-second-blue border-b-2 border-second-blue"
            to="/alnasr/home/services/security"
            style={
              location.pathname === "/alnasr/home/services/security"
                ? activeStyles
                : null
            }
          >
            Security
          </NavLink>
        </li>
        <li>
          <NavLink
            className="pb-[5px] text-main-gray"
            activeClassName="font-bold text-second-blue border-b-2 border-second-blue"
            to="/alnasr/home/services/facilities"
            style={
              location.pathname === "/alnasr/home/services/facilities"
                ? activeStyles
                : null
            }
          >
            Facilities
          </NavLink>
        </li>
        <li>
          <NavLink
            className="pb-[5px] text-main-gray"
            activeClassName="font-bold text-second-blue border-b-2 border-second-blue"
            to="/alnasr/home/services/communication"
            style={
              location.pathname === "/alnasr/home/services/communication"
                ? activeStyles
                : null
            }
          >
            Communication
          </NavLink>
        </li>
        <li>
          <NavLink
            className="pb-[5px] text-main-gray"
            activeClassName="font-bold text-second-blue border-b-2 border-second-blue"
            to="/alnasr/home/services/education"
            style={
              location.pathname === "/alnasr/home/services/education"
                ? activeStyles
                : null
            }
          >
            Education
          </NavLink>
        </li>
        <li>
          <NavLink
            className="pb-[5px] text-main-gray"
            activeClassName="font-bold text-second-blue border-b-2 border-second-blue"
            to="/alnasr/home/services/food"
            style={
              location.pathname === "/alnasr/home/services/food"
                ? activeStyles
                : null
            }
          >
            Food
          </NavLink>
        </li>
      </ul>
      <div>
        <Outlet />
      </div>
    </section>
  );
}

export default ServicesPage;
