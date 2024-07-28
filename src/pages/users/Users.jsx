import { useState } from "react";
import useFetchUsers from "../../../custom-hooks/useFetchUsers";

function Users() {
  const { users, fetchUsers, loading, userDoc } = useFetchUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [distanceRange, setDistanceRange] = useState(20037);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleDistanceRangeChange = (e) => {
    setDistanceRange(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const isNotAdmin = user.role !== "admin";
    const matchesSearchTerm = `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry
      ? user.country?.label === selectedCountry
      : true;
    const matchesDistance =
      user.distance !== undefined ? user.distance <= distanceRange : true;

    return isNotAdmin && matchesSearchTerm && matchesCountry && matchesDistance;
  });

  return (
    <section className="ml-[100px] lg:ml-[20%] p-[15px] md:p-[30px] min-h-[85vh]">
      {userDoc?.role === "user" && (
        <h1 className="text-lg md:text-xl font-semibold mb-[20px]">
          Nearby users
        </h1>
      )}

      <div className="mb-[20px] flex flex-col md:flex-row gap-[10px]">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Countries</option>
          {[...new Set(users.map((user) => user.country?.label))].map(
            (country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            )
          )}
        </select>
      </div>

      <div className="mb-[20px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Distance (KM):
        </label>
        <input
          type="range"
          min="0"
          max="20037"
          value={distanceRange}
          onChange={handleDistanceRangeChange}
          className="w-full"
        />
        <span className="block text-center text-sm mt-2">{distanceRange} KM</span>
      </div>

      <>
        {userDoc?.role === "admin" ? (
          <div className="overflow-x-auto bg-[#f3f4f6] rounded-lg py-[10px] px-[20px] flex flex-col gap-[20px]">
            <div className="mt-[20px] text-sm md:text-base">
              {filteredUsers.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="px-4 py-2">#</th>
                      <th className="px-4 py-2">ProfilePic</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Phone Number</th>
                      <th className="px-4 py-2">Country</th>
                      <th className="px-4 py-2">Age</th>
                      <th className="px-4 py-2">Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
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
        ) : (
          <div className="overflow-x-auto bg-[#f3f4f6] rounded-lg pb-[10px] px-[20px]">
            <div className="mt-[20px] text-sm md:text-base flex flex-col">
              {filteredUsers.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="px-4 py-2">#</th>
                      <th className="px-4 py-2">ProfilePic</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Phone Number</th>
                      <th className="px-4 py-2">Country</th>
                      <th className="px-4 py-2">Age</th>
                      <th className="px-4 py-2">Gender</th>
                      <th className="px-4 py-2">Away by KM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
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
                        <td className="mx-[10px]">
                          {user.distance !== undefined && (
                            <p>{user.distance.toFixed(2)}</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No Users found</p>
              )}
            </div>
          </div>
        )}
      </>

      <div className="flex justify-between mt-[50px] bg-yellow-500 rounded-lg">
        <button
          onClick={() => fetchUsers(false)}
          disabled={loading}
          className="px-4 py-2 bg-second-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => fetchUsers(false)}
          disabled={loading}
          className="px-4 py-2 bg-second-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default Users;
