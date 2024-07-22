import  { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";

function Overview() {
  const [loading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState(null);

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
    <section className="ml-[100px] lg:ml-[20%] p-[15px] md:p-[30px] bg-special-one min-h-[85vh]">
        <p>Hello</p>
    </section>
  );
}

export default Overview;
