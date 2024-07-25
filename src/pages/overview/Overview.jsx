import  { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";

function Overview() {
  const [loading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState(null);
  const [users, setUsers] = useState(null);

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
          setLoading(false);
        }
      });
    };
    fetchData();
  }, []);

  const lastTenUsers = users?.slice(-10);

  console.log(lastTenUsers);

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
          <h1 className="text-main-black text-2xl">Last users</h1>
          <div className="mt-[20px]">
          {lastTenUsers?.length > 0 ? (
            lastTenUsers?.map((user) => (
              <div className="bg-white items-center justify-start gap-[25px] flex" key={user.email}>
                <img className="w-[30px]" src={user.profilePicture} />
                <h2>{user.firstName} {user.lastName}</h2>
                <h2>{user.email}</h2>
                <p>{user.phoneNumber}</p>
                <p>{user.country?.label}</p>
                <p>{user.age} years old</p>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
          </div>
        </div>
        <div className="mt-[40px]">
          <h1 className="text-main-black text-2xl">Last services</h1>
          
        </div>
    </section>
  );
}

export default Overview;
