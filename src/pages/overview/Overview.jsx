import useFetchUsers from "../../../custom-hooks/useFetchUsers";
import useFetchTransports from "../../../custom-hooks/useFetchTransports";
import useFetchAccommodations from "../../../custom-hooks/useFetchAccommodations";
import useFetchHealth from "../../../custom-hooks/useFetchHealth";
import useFetchSecurity from "../../../custom-hooks/useFetchSecurity";
import useFetchFacilities from "../../../custom-hooks/useFetchFacilities";
import useFetchCommunications from "../../../custom-hooks/useFetchCommunications";
import useFetchEducations from "../../../custom-hooks/useFetchEducations";
import useFetchFood from "../../../custom-hooks/useFetchFood";
import { useContext } from "react";
import { AppContext } from "../../../AppContext";

function Overview() {
  const { language } = useContext(AppContext);
  const isArabic = language === "ar";
  const { users } = useFetchUsers();
  const { transports } = useFetchTransports();
  const { accommodations } = useFetchAccommodations();
  const { health } = useFetchHealth();
  const { security } = useFetchSecurity();
  const { facilities } = useFetchFacilities();
  const { communications } = useFetchCommunications();
  const { educations } = useFetchEducations();
  const { food } = useFetchFood();

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
    <section className={`${isArabic ? "arabic-font mr-[100px] lg:mr-[20%]" : "ml-[100px] lg:ml-[20%]"}  p-[15px] md:p-[30px] min-h-[85vh]`}>
      <div>
        <h1 className={`${isArabic ? "text-right" : ""} text-main-black text-lg md:text-2xl`}>{isArabic ? "آخر المستخدمين" : "Last users"}</h1>
        <div className="flex flex-col mt-[20px] overflow-x-auto pb-[10px] text-sm md:text-base bg-[#f3f4f6] rounded-lg p-[20px]">
          {lastTenUsers?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="mx-[10px]">#</th>
                  <th className="mx-[10px]">{isArabic ? "صورة الحساب" : "ProfilePic"}</th>
                  <th className="mx-[10px]">{isArabic ? "الاِسم" : "Name"}</th>
                  <th className="mx-[10px]">{isArabic ? "الاِيميل" : "Email"}</th>
                  <th className="mx-[10px]">{isArabic ? "رقم الهاتف" : "Phone Number"}</th>
                  <th className="mx-[10px]">{isArabic ? "البلد" : "Country"}</th>
                  <th className="mx-[10px]">{isArabic ? "السّن" : "Age"}</th>
                  <th className="mx-[10px]">{isArabic ? "الجنس" : "Gender"}</th>
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
            <p>{isArabic ? "لا يوجد مستخدمين حاليا" : "No Users found"}</p>
          )}
        </div>
      </div>
      <div className="mt-[40px]">
        <h1 className={`${isArabic ? "text-right" : ""} text-main-black text-lg md:text-2xl mb-[40px]`}>
        {isArabic ? "آخر الخدمات" : "Last services"}
        </h1>
        <h2 className={`${isArabic ? "text-right" : "text-left"} text-base md:text-lg font-semibold`}>{isArabic ? "النقل" : "Transports"}</h2>
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
            <p className={`${isArabic ? "text-right" : "text-left"}`}>{isArabic ? "لا يوجد بيانات حاليا" : "No Transports found"}</p>
          )}
        </div>
        <h2 className={`${isArabic ? "text-right" : "text-left"} text-base md:text-lg font-semibold mt-[20px]`}>
        {isArabic ? "الإقامة" : "Accommodations"}
        </h2>
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
            <p className={`${isArabic ? "text-right" : "text-left"}`}>{isArabic ? "لا يوجد بيانات حاليا" : "No Accommodations found"}</p>
          )}
        </div>
        <h2 className={`${isArabic ? "text-right" : "text-left"} mt-[20px] text-base md:text-lg font-semibold`}>{isArabic ? "الصحة" : "Health"}</h2>
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
            <p className={`${isArabic ? "text-right" : "text-left"}`}>{isArabic ? "لا يوجد بيانات حاليا" : "No Health services found"}</p>
          )}
        </div>
        <h2 className={`${isArabic ? "text-right" : "text-left"} mt-[20px] text-base md:text-lg font-semibold`}>
        {isArabic ? "الأمن" : "Security"}
        </h2>
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
            <p className={`${isArabic ? "text-right" : "text-left"}`}>{isArabic ? "لا يوجد بيانات حاليا" : "No Security services found"}</p>
          )}
        </div>
        <h2 className={`${isArabic ? "text-right" : "text-left"} mt-[20px] text-base md:text-lg font-semibold`}>
        {isArabic ? "المرافق العمومية" : "Facilities"}
        </h2>
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
            <p className={`${isArabic ? "text-right" : "text-left"}`}>{isArabic ? "لا يوجد بيانات حاليا" : "No Facilities found"}</p>
          )}
        </div>
        <h2 className={`${isArabic ? "text-right" : "text-left"} mt-[20px] text-base md:text-lg font-semibold`}>
        {isArabic ? "الاِتصالات" : "Communications"}
        </h2>
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
            <p className={`${isArabic ? "text-right" : "text-left"}`}>{isArabic ? "لا يوجد بيانات حاليا" : "No Communications found"}</p>
          )}
        </div> 
        <h2 className={`${isArabic ? "text-right" : "text-left"} mt-[20px] text-base md:text-lg font-semibold`}>
        {isArabic ? "الدراسة" : "Educations"}
        </h2>
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
            <p className={`${isArabic ? "text-right" : "text-left"}`}>{isArabic ? "لا يوجد بيانات حاليا" : "No Educations found"}</p>

          )}
        </div>
        <h2 className={`${isArabic ? "text-right" : "text-left"} mt-[20px] text-base md:text-lg font-semibold`}>
        {isArabic ? "الطعام" : "Food"}
        </h2>
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
            <p className={`${isArabic ? "text-right" : "text-left"}`}>{isArabic ? "لا يوجد بيانات حاليا" : "No Food services found"}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Overview;
