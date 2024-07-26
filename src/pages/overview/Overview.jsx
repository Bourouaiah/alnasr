import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";

function Overview() {
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
          setFacilities(appCommunications);

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

  const lastTenUsers = users?.slice(-10);
  const lastTwoTransports = transports?.slice(-2);
  const lastTwoAccommodations= accommodations?.slice(-2);
  const lastTwoHealth= health?.slice(-2);
  const lastTwoSecurity= security?.slice(-2);
  const lastTwoFacilities= facilities?.slice(-2);
  const lastTwoCommunications= communications?.slice(-2);
  const lastTwoEducations= educations?.slice(-2);
  const lastTwoFood= food?.slice(-2);

  if (loading) {
    return (
      <section className="ml-[100px] lg:ml-[20%] p-[15px] md:p-[30px] bg-special-one min-h-[85vh]">
        <p className="text-sm md:text-base">waiting ...</p>
      </section>
    );
  }
  return (
    <section className="ml-[100px] lg:ml-[20%] p-[15px] md:p-[30px] min-h-[85vh]">
      <div>
        <h1 className="text-main-black text-lg md:text-2xl">Last users</h1>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTenUsers?.length > 0 ? (
            lastTenUsers?.map((user) => (
              <div
                className="items-center justify-start gap-[35px] flex"
                key={user.email}
              >
                <img className="w-[30px]" src={user.profilePicture} />
                <div className="flex items-center gap-[5px]">
                  <h2 className="font-semibold">{user.firstName}</h2>
                  <h2 className="font-semibold">{user.lastName}</h2>
                </div>
                <h2>{user.email}</h2>
                <p>{user.phoneNumber}</p>
                <p>{user.country?.label}</p>
                <div className="flex items-center gap-[5px]">
                  <p>{user.age}</p>
                  <p>years</p>
                  <p>old</p>
                </div>
                <p>{user.gender?.label}</p>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
      <div className="mt-[40px]">
        <h1 className="text-main-black text-lg md:text-2xl mb-[40px]">Last services</h1>
        <h2 className="text-base md:text-lg">Transports</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoTransports?.length > 0 ? (
            lastTwoTransports?.map((item, index) => (
              <div
                className="items-center justify-start gap-[35px] flex"
                key={index}
              >
                <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                  {index + 1}
                </h2>
                <h2>{item.type}</h2>
                <p>{item.location}</p>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.mapLocation}>See in map</a>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.link}>See link</a>
              </div>
            ))
          ) : (
            <p>No Transports found</p>
          )}
        </div>
        <h2 className="mt-[20px] text-base md:text-lg">Accommodations</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoAccommodations?.length > 0 ? (
            lastTwoAccommodations?.map((item, index) => (
              <div
                className="items-center justify-start gap-[35px] flex"
                key={index}
              >
                <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                  {index + 1}
                </h2>
                <h2>{item.type}</h2>
                <p>{item.location}</p>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.mapLocation}>See in map</a>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.link}>See link</a>
              </div>
            ))
          ) : (
            <p>No Accommodations found</p>
          )}
        </div>
        <h2 className="mt-[20px] text-base md:text-lg">Health</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoHealth?.length > 0 ? (
            lastTwoHealth?.map((item, index) => (
              <div
                className="items-center justify-start gap-[35px] flex"
                key={index}
              >
                <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                  {index + 1}
                </h2>
                <h2>{item.type}</h2>
                <p>{item.location}</p>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.mapLocation}>See in map</a>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.link}>See link</a>
              </div>
            ))
          ) : (
            <p>No Health services found</p>
          )}
        </div>
        <h2 className="mt-[20px] text-base md:text-lg">Security services</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoSecurity?.length > 0 ? (
            lastTwoSecurity?.map((item, index) => (
              <div
                className="items-center justify-start gap-[35px] flex"
                key={index}
              >
                <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                  {index + 1}
                </h2>
                <h2>{item.type}</h2>
                <p>{item.location}</p>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.mapLocation}>See in map</a>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.link}>See link</a>
              </div>
            ))
          ) : (
            <p>No Security services found</p>
          )}
        </div>
        <h2 className="mt-[20px] text-base md:text-lg">Facilities</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoFacilities?.length > 0 ? (
            lastTwoFacilities?.map((item, index) => (
              <div
                className="items-center justify-start gap-[35px] flex"
                key={index}
              >
                <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                  {index + 1}
                </h2>
                <h2>{item.type}</h2>
                <p>{item.location}</p>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.mapLocation}>See in map</a>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.link}>See link</a>
              </div>
            ))
          ) : (
            <p>No Facilities found</p>
          )}
        </div>
        <h2 className="mt-[20px] text-base md:text-lg">Communications</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoCommunications?.length > 0 ? (
            lastTwoCommunications?.map((item, index) => (
              <div
                className="items-center justify-start gap-[35px] flex"
                key={index}
              >
                <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                  {index + 1}
                </h2>
                <h2>{item.type}</h2>
                <p>{item.location}</p>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.mapLocation}>See in map</a>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.link}>See link</a>
              </div>
            ))
          ) : (
            <p>No Communications found</p>
          )}
        </div>
        <h2 className="mt-[20px] text-base md:text-lg">Educations</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoEducations?.length > 0 ? (
            lastTwoEducations?.map((item, index) => (
              <div
                className="items-center justify-start gap-[35px] flex"
                key={index}
              >
                <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                  {index + 1}
                </h2>
                <h2>{item.type}</h2>
                <p>{item.location}</p>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.mapLocation}>See in map</a>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.link}>See link</a>
              </div>
            ))
          ) : (
            <p>No Educations found</p>
          )}
        </div>
        <h2 className="mt-[20px] text-base md:text-lg">Food Services</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoFood?.length > 0 ? (
            lastTwoFood?.map((item, index) => (
              <div
                className="items-center justify-start gap-[35px] flex"
                key={index}
              >
                <h2 className="border-2 p-[3px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold">
                  {index + 1}
                </h2>
                <h2>{item.type}</h2>
                <p>{item.location}</p>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.mapLocation}>See in map</a>
                <a target="_blank" className="text-second-black border-b-2 font-semibold" href={item.link}>See link</a>
              </div>
            ))
          ) : (
            <p>No Accommodations found</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Overview;
