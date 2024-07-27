import { NavLink, Outlet } from "react-router-dom";
import useFetchUsers from "../../../custom-hooks/useFetchUsers";
import useFetchTransports from "../../../custom-hooks/useFetchTransports";
import useFetchAccommodations from "../../../custom-hooks/useFetchAccommodations";
import useFetchHealth from "../../../custom-hooks/useFetchHealth";
import useFetchSecurity from "../../../custom-hooks/useFetchSecurity";
import useFetchFacilities from "../../../custom-hooks/useFetchFacilities";
import useFetchCommunications from "../../../custom-hooks/useFetchCommunications";
import useFetchEducations from "../../../custom-hooks/useFetchEducations";
import useFetchFood from "../../../custom-hooks/useFetchFood";

function ServicesPage() {
  const { userDoc } = useFetchUsers();
  const { transports } = useFetchTransports();
  const { accommodations } = useFetchAccommodations();
  const { health } = useFetchHealth();
  const { security } = useFetchSecurity();
  const { facilities } = useFetchFacilities();
  const { communications } = useFetchCommunications();
  const { educations } = useFetchEducations();
  const { food } = useFetchFood();

  const activeStyles = {
    borderBottom: "3px solid #FFC265",
    color: "#FFC265",
    fontWeight: "bold",
  };

  return (
    <section className="ml-[100px] lg:ml-[20%] p-[15px] md:p-[30px] min-h-[85vh]">
      {userDoc?.role === "admin" ? (
        <>
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
        </>
      ) : (
        <div>
          <h2 className="text-base md:text-lg font-semibold">Transports</h2>
          <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
            {transports?.length > 0 ? (
              transports?.map((item, index) => (
                <div
                  className="items-center justify-start gap-[35px] flex"
                  key={index}
                >
                  <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                    {index + 1}
                  </h2>
                  <h2>{item.type}</h2>
                  <p>{item.location}</p>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.mapLocation}
                  >
                    See in map
                  </a>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.link}
                  >
                    See link
                  </a>
                </div>
              ))
            ) : (
              <p>No Transports found</p>
            )}
          </div>
          <h2 className="mt-[20px] text-base md:text-lg font-semibold">
            Accommodations
          </h2>
          <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
            {accommodations?.length > 0 ? (
              accommodations?.map((item, index) => (
                <div
                  className="items-center justify-start gap-[35px] flex"
                  key={index}
                >
                  <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                    {index + 1}
                  </h2>
                  <h2>{item.type}</h2>
                  <p>{item.location}</p>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.mapLocation}
                  >
                    See in map
                  </a>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.link}
                  >
                    See link
                  </a>
                </div>
              ))
            ) : (
              <p>No Accommodations found</p>
            )}
          </div>
          <h2 className="mt-[20px] text-base md:text-lg font-semibold">
            Health
          </h2>
          <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
            {health?.length > 0 ? (
              health?.map((item, index) => (
                <div
                  className="items-center justify-start gap-[35px] flex"
                  key={index}
                >
                  <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                    {index + 1}
                  </h2>
                  <h2>{item.type}</h2>
                  <p>{item.location}</p>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.mapLocation}
                  >
                    See in map
                  </a>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.link}
                  >
                    See link
                  </a>
                </div>
              ))
            ) : (
              <p>No Health services found</p>
            )}
          </div>
          <h2 className="mt-[20px] text-base md:text-lg font-semibold">
            Security services
          </h2>
          <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
            {security?.length > 0 ? (
              security?.map((item, index) => (
                <div
                  className="items-center justify-start gap-[35px] flex"
                  key={index}
                >
                  <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                    {index + 1}
                  </h2>
                  <h2>{item.type}</h2>
                  <p>{item.location}</p>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.mapLocation}
                  >
                    See in map
                  </a>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.link}
                  >
                    See link
                  </a>
                </div>
              ))
            ) : (
              <p>No Security services found</p>
            )}
          </div>
          <h2 className="mt-[20px] text-base md:text-lg font-semibold">
            Facilities
          </h2>
          <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
            {facilities?.length > 0 ? (
              facilities?.map((item, index) => (
                <div
                  className="items-center justify-start gap-[35px] flex"
                  key={index}
                >
                  <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                    {index + 1}
                  </h2>
                  <h2>{item.type}</h2>
                  <p>{item.location}</p>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.mapLocation}
                  >
                    See in map
                  </a>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.link}
                  >
                    See link
                  </a>
                </div>
              ))
            ) : (
              <p>No Facilities found</p>
            )}
          </div>
          <h2 className="mt-[20px] text-base md:text-lg font-semibold">
            Communications
          </h2>
          <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
            {communications?.length > 0 ? (
              communications?.map((item, index) => (
                <div
                  className="items-center justify-start gap-[35px] flex"
                  key={index}
                >
                  <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                    {index + 1}
                  </h2>
                  <h2>{item.type}</h2>
                  <p>{item.location}</p>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.mapLocation}
                  >
                    See in map
                  </a>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.link}
                  >
                    See link
                  </a>
                </div>
              ))
            ) : (
              <p>No Communications found</p>
            )}
          </div>
          <h2 className="mt-[20px] text-base md:text-lg font-semibold">
            Educations
          </h2>
          <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
            {educations?.length > 0 ? (
              educations?.map((item, index) => (
                <div
                  className="items-center justify-start gap-[35px] flex"
                  key={index}
                >
                  <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                    {index + 1}
                  </h2>
                  <h2>{item.type}</h2>
                  <p>{item.location}</p>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.mapLocation}
                  >
                    See in map
                  </a>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.link}
                  >
                    See link
                  </a>
                </div>
              ))
            ) : (
              <p>No Educations found</p>
            )}
          </div>
          <h2 className="mt-[20px] text-base md:text-lg font-semibold">
            Food Services
          </h2>
          <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
            {food?.length > 0 ? (
              food?.map((item, index) => (
                <div
                  className="items-center justify-start gap-[35px] flex"
                  key={index}
                >
                  <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                    {index + 1}
                  </h2>
                  <h2>{item.type}</h2>
                  <p>{item.location}</p>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.mapLocation}
                  >
                    See in map
                  </a>
                  <a
                    target="_blank"
                    className="text-second-black border-b-2 font-semibold"
                    href={item.link}
                  >
                    See link
                  </a>
                </div>
              ))
            ) : (
              <p>No Food Services found</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default ServicesPage;
