import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const appUsers = [];
          const allUsers = await getDocs(collection(db, "users"));
          allUsers.forEach((doc) => {
            appUsers.push(doc.data());
          });
          setUsers(appUsers);
          setLoading(false);
        }
      });
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="ml-[100px] lg:ml-[20%] p-[15px] md:p-[30px] bg-special-one min-h-[85vh]">
        <p className="text-sm md:text-base">waiting ...</p>
      </section>
    );
  }

  return (
    <section className="ml-[100px] lg:ml-[20%] p-[15px] md:p-[30px] min-h-[85vh]">
      <div className="overflow-x-auto bg-[#f3f4f6] rounded-lg py-[10px] px-[20px]">
        <div className="mt-[20px] text-sm md:text-base">
          {users?.length > 0 ? (
            users?.map((user) => (
              <div
                className="items-center justify-start gap-[25px] flex"
                key={user.email}
              >
                <img className="w-[30px]" src={user.profilePicture} />
                <div className="flex items-center gap-[5px]">
                  <h2>{user.firstName} </h2>
                  <div>{user.lastName}</div>
                </div>
                <h2>{user.email}</h2>
                <p>{user.phoneNumber}</p>
                <p>{user.country?.label}</p>
                <div className="flex items-center gap-[5px]">
                  <p>{user.age}</p>
                  <p>years</p>
                  <p>old</p>
                </div>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Users;
