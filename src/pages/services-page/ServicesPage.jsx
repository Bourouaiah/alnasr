import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function ServicesPage() {
  const [loading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState(null);
  const [users, setUsers] = useState(null);
  const [transports, setTransports] = useState(null);
  const [accommodations, setAccommodations] = useState(null);
  const [health, setHealth] = useState(null);
  const [security, setSecurity] = useState(null);
  const [facilities, setFacilities] = useState(null);
  const [communications, setCommunications] = useState(null);
  const [educations, setEducations] = useState(null);
  const [food, setFood] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const usersQuery = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(usersQuery);
          querySnapshot.forEach((doc) => {
            setUserDoc(doc.data());
          });

          const appUsers = [];
          const allUsers = await getDocs(collection(db, "users"));
          allUsers.forEach((doc) => {
            appUsers.push(doc.data());
          });
          setUsers(appUsers);

          const appTransports = [];
          const allTransports = await getDocs(collection(db, "transports"));
          allTransports.forEach((doc) => {
            appTransports.push(doc.data());
          });
          setTransports(appTransports);

          const appAccommodations = [];
          const allAccommodations = await getDocs(
            collection(db, "accommodations")
          );
          allAccommodations.forEach((doc) => {
            appAccommodations.push(doc.data());
          });
          setAccommodations(appAccommodations);

          const appHealth = [];
          const allHealth = await getDocs(collection(db, "health"));
          allHealth.forEach((doc) => {
            appHealth.push(doc.data());
          });
          setHealth(appHealth);

          const appSecurity = [];
          const allSecurity = await getDocs(collection(db, "security"));
          allSecurity.forEach((doc) => {
            appSecurity.push(doc.data());
          });
          setSecurity(appSecurity);

          const appFacilities = [];
          const allFacilities = await getDocs(collection(db, "facilities"));
          allFacilities.forEach((doc) => {
            appFacilities.push(doc.data());
          });
          setFacilities(appFacilities);

          const appCommunications = [];
          const allCommunications = await getDocs(
            collection(db, "communications")
          );
          allCommunications.forEach((doc) => {
            appCommunications.push(doc.data());
          });
          setCommunications(appCommunications);

          const appEducations = [];
          const allEducations = await getDocs(collection(db, "educations"));
          allEducations.forEach((doc) => {
            appEducations.push(doc.data());
          });
          setEducations(appEducations);

          const appFood = [];
          const allFood = await getDocs(collection(db, "food"));
          allFood.forEach((doc) => {
            appFood.push(doc.data());
          });
          setFood(appFood);

          setLoading(false);
        }
      });
    };
    fetchData();
  }, []);
  const activeStyles = {
    borderBottom: "3px solid #FFC265",
    color: "#FFC265",
    fontWeight: "bold",
  };

  if (loading) {
    return (
      <section className="ml-[100px] lg:ml-[20%] p-[15px] md:p-[30px] bg-special-one min-h-[85vh]">
        <p className="text-sm md:text-base">waiting ...</p>
      </section>
    );
  }

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
          <h2 className="mt-[20px] text-base md:text-lg font-semibold">Accommodations</h2>
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
          <h2 className="mt-[20px] text-base md:text-lg font-semibold">Health</h2>
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
          <h2 className="mt-[20px] text-base md:text-lg font-semibold">Security services</h2>
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
          <h2 className="mt-[20px] text-base md:text-lg font-semibold">Facilities</h2>
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
          <h2 className="mt-[20px] text-base md:text-lg font-semibold">Communications</h2>
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
          <h2 className="mt-[20px] text-base md:text-lg font-semibold">Educations</h2>
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
          <h2 className="mt-[20px] text-base md:text-lg font-semibold">Food Services</h2>
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
