import useFetchUsers from "../../../custom-hooks/useFetchUsers";
import useFetchTransports from "../../../custom-hooks/useFetchTransports";
import useFetchAccommodations from "../../../custom-hooks/useFetchAccommodations";
import useFetchHealth from "../../../custom-hooks/useFetchHealth";
import useFetchSecurity from "../../../custom-hooks/useFetchSecurity";
import useFetchFacilities from "../../../custom-hooks/useFetchFacilities";
import useFetchCommunications from "../../../custom-hooks/useFetchCommunications";
import useFetchEducations from "../../../custom-hooks/useFetchEducations";
import useFetchFood from "../../../custom-hooks/useFetchFood";

function Overview() {
  const { users } = useFetchUsers();
  const { transports } = useFetchTransports();
  const { accommodations } = useFetchAccommodations();
  const { health } = useFetchHealth();
  const { security } = useFetchSecurity();
  const { facilities } = useFetchFacilities();
  const { communications } = useFetchCommunications();
  const { educations } = useFetchEducations();
  const { food } = useFetchFood();

  console.log(users)

  const filteredUsers = users.filter((user) => user.role !== "admin");

  const lastTenUsers = filteredUsers?.slice(-10);
  const lastTwoTransports = transports?.slice(-2);
  const lastTwoAccommodations = accommodations?.slice(-2);
  const lastTwoHealth = health?.slice(-2);
  const lastTwoSecurity = security?.slice(-2);
  const lastTwoFacilities = facilities?.slice(-2);
  const lastTwoCommunications = communications?.slice(-2);
  const lastTwoEducations = educations?.slice(-2);
  const lastTwoFood = food?.slice(-2);

  return (
    <section className="ml-[100px] lg:ml-[20%] p-[15px] md:p-[30px] min-h-[85vh]">
      <div>
        <h1 className="text-main-black text-lg md:text-2xl">Last users</h1>
        <div className="flex flex-col mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTenUsers?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="mx-[10px]">#</th>
                  <th className="mx-[10px]">ProfilePic</th>
                  <th className="mx-[10px]">Name</th>
                  <th className="mx-[10px]">Email</th>
                  <th className="mx-[10px]">Phone Number</th>
                  <th className="mx-[10px]">Country</th>
                  <th className="mx-[10px]">Age</th>
                  <th className="mx-[10px]">Gender</th>
                </tr>
              </thead>
              <tbody>
                {lastTenUsers?.map((user, index) => (
                  <tr key={index} className="py-[10px] border-b">
                    <td className="flex items-center justify-center rounded-full font-semibold">
                      {index + 1}
                    </td>
                    <td>
                      <img
                        className="mx-[10px] rounded-full w-[30px] h-[30px] object-cover"
                        src={user.profilePicture}
                      />
                    </td>
                    <td className="mx-[10px]">
                      <div className="flex items-center gap-[5px]">
                        <h2 className="font-semibold">{user.firstName}</h2>
                        <h2 className="font-semibold">{user.lastName}</h2>
                      </div>
                    </td>
                    <td className="mx-[10px]">{user.email}</td>
                    <td className="mx-[10px]">{user.phoneNumber}</td>
                    <td className="mx-[10px]">{user.country?.label}</td>
                    <td className="mx-[10px]">{user.age}</td>
                    <td className="mx-[10px]">{user.gender?.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Users found</p>
          )}
        </div>
      </div>
      <div className="mt-[40px]">
        <h1 className="text-main-black text-lg md:text-2xl mb-[40px]">
          Last services
        </h1>
        <h2 className="text-base md:text-lg">Transports</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoTransports?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-[3px] w-[20px] h-[20px]">#</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Map</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {lastTwoTransports?.map((item, index) => (
                  <tr key={index} className="py-[10px] border-b">
                    <td className="flex items-center justify-center rounded-full font-semibold">
                      {index + 1}
                    </td>
                    <td>{item.type}</td>
                    <td>{item.location}</td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.mapLocation}
                      >
                        See in map
                      </a>
                    </td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.link}
                      >
                        See link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Transports found</p>
          )}
        </div>

        <h2 className="mt-[20px] text-base md:text-lg">Accommodations</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoAccommodations?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-[3px] w-[20px] h-[20px]">#</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Map</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {lastTwoAccommodations?.map((item, index) => (
                  <tr key={index} className="py-[10px] border-b">
                    <td className="flex items-center justify-center rounded-full font-semibold">
                      {index + 1}
                    </td>
                    <td>{item.type}</td>
                    <td>{item.location}</td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.mapLocation}
                      >
                        See in map
                      </a>
                    </td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.link}
                      >
                        See link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Accommodations found</p>
          )}
        </div>
        <h2 className="mt-[20px] text-base md:text-lg">Health</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoHealth?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-[3px] w-[20px] h-[20px]">#</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Map</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {lastTwoHealth?.map((item, index) => (
                  <tr key={index} className="py-[10px] border-b">
                    <td className="flex items-center justify-center rounded-full font-semibold">
                      {index + 1}
                    </td>
                    <td>{item.type}</td>
                    <td>{item.location}</td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.mapLocation}
                      >
                        See in map
                      </a>
                    </td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.link}
                      >
                        See link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Health services found</p>
          )}
        </div>
        <h2 className="mt-[20px] text-base md:text-lg">Security services</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoSecurity?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-[3px] w-[20px] h-[20px]">#</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Map</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {lastTwoSecurity?.map((item, index) => (
                  <tr key={index} className="py-[10px] border-b">
                    <td className="flex items-center justify-center rounded-full font-semibold">
                      {index + 1}
                    </td>
                    <td>{item.type}</td>
                    <td>{item.location}</td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.mapLocation}
                      >
                        See in map
                      </a>
                    </td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.link}
                      >
                        See link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Security services found</p>
          )}
        </div>
        <h2 className="mt-[20px] text-base md:text-lg">Facilities</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoFacilities?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-[3px] w-[20px] h-[20px]">#</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Map</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {lastTwoFacilities?.map((item, index) => (
                  <tr key={index} className="py-[10px] border-b">
                    <td className="flex items-center justify-center rounded-full font-semibold">
                      {index + 1}
                    </td>
                    <td>{item.type}</td>
                    <td>{item.location}</td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.mapLocation}
                      >
                        See in map
                      </a>
                    </td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.link}
                      >
                        See link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Facilities found</p>
          )}
        </div>
        <h2 className="mt-[20px] text-base md:text-lg">Communications</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoCommunications?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-[3px] w-[20px] h-[20px]">#</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Map</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {lastTwoCommunications?.map((item, index) => (
                  <tr key={index} className="py-[10px] border-b">
                    <td className="flex items-center justify-center rounded-full font-semibold">
                      {index + 1}
                    </td>
                    <td>{item.type}</td>
                    <td>{item.location}</td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.mapLocation}
                      >
                        See in map
                      </a>
                    </td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.link}
                      >
                        See link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Communications found</p>
          )}
        </div>
        <h2 className="mt-[20px] text-base md:text-lg">Educations</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoEducations?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-[3px] w-[20px] h-[20px]">#</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Map</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {lastTwoEducations?.map((item, index) => (
                  <tr key={index} className="py-[10px] border-b">
                    <td className="flex items-center justify-center rounded-full font-semibold">
                      {index + 1}
                    </td>
                    <td>{item.type}</td>
                    <td>{item.location}</td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.mapLocation}
                      >
                        See in map
                      </a>
                    </td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.link}
                      >
                        See link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Educations found</p>
          )}
        </div>
        <h2 className="mt-[20px] text-base md:text-lg">Food Services</h2>
        <div className="mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTwoFood?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-[3px] w-[20px] h-[20px]">#</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Map</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {lastTwoFood?.map((item, index) => (
                  <tr key={index} className="py-[10px] border-b">
                    <td className="flex items-center justify-center rounded-full font-semibold">
                      {index + 1}
                    </td>
                    <td>{item.type}</td>
                    <td>{item.location}</td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.mapLocation}
                      >
                        See in map
                      </a>
                    </td>
                    <td>
                      <a
                        target="_blank"
                        className="text-second-black font-semibold"
                        href={item.link}
                      >
                        See link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Food services found</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Overview;
