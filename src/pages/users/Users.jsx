import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { collection, getDocs, query, where, limit, startAfter } from "firebase/firestore";

const haversineDistance = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const lat1 = coords1.latitude;
  const lon1 = coords1.longitude;
  const lat2 = coords2.latitude;
  const lon2 = coords2.longitude;

  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

function Users() {
  const [loading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState(null);
  const [users, setUsers] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [page, setPage] = useState(1);

  const usersPerPage = 50;

  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userQuery = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );
          const userSnapshot = await getDocs(userQuery);
          userSnapshot.forEach((doc) => {
            setUserDoc(doc.data());
          });

          const firstPageQuery = query(
            collection(db, "users"),
            limit(usersPerPage)
          );

          const firstPageSnapshot = await getDocs(firstPageQuery);
          const firstUserDoc = firstPageSnapshot.docs[0];
          const lastVisible = firstPageSnapshot.docs[firstPageSnapshot.docs.length - 1];
          const fetchedUsers = firstPageSnapshot.docs.map((doc) => doc.data());

          if (userDoc?.latitude && userDoc?.longitude) {
            fetchedUsers.forEach((u) => {
              u.distance = haversineDistance(
                { latitude: userDoc.latitude, longitude: userDoc.longitude },
                { latitude: u.latitude, longitude: u.longitude }
              );
            });

            fetchedUsers.sort((a, b) => a.distance - b.distance);
          }

          setUsers(fetchedUsers);
          setLastDoc(lastVisible);
          setFirstDoc(firstUserDoc);
          setLoading(false);
        }
      });
    };

    fetchData();
  }, [userDoc]);

  const fetchNextPage = async () => {
    setLoading(true);
    const nextPageQuery = query(
      collection(db, "users"),
      startAfter(lastDoc),
      limit(usersPerPage)
    );
    const nextPageSnapshot = await getDocs(nextPageQuery);
    const lastVisible = nextPageSnapshot.docs[nextPageSnapshot.docs.length - 1];
    const fetchedUsers = nextPageSnapshot.docs.map((doc) => doc.data());

    if (userDoc?.latitude && userDoc?.longitude) {
      fetchedUsers.forEach((u) => {
        u.distance = haversineDistance(
          { latitude: userDoc.latitude, longitude: userDoc.longitude },
          { latitude: u.latitude, longitude: u.longitude }
        );
      });

      fetchedUsers.sort((a, b) => a.distance - b.distance);
    }

    setUsers(fetchedUsers);
    setLastDoc(lastVisible);
    setLoading(false);
    setPage(page + 1);
  };

  const fetchPreviousPage = async () => {
    if (page === 1) return; // No previous page if already on the first page

    setLoading(true);
    const previousPageQuery = query(
      collection(db, "users"),
      startAfter(firstDoc),
      limit(usersPerPage)
    );
    const previousPageSnapshot = await getDocs(previousPageQuery);
    const firstVisible = previousPageSnapshot.docs[0];
    const fetchedUsers = previousPageSnapshot.docs.map((doc) => doc.data());

    if (userDoc?.latitude && userDoc?.longitude) {
      fetchedUsers.forEach((u) => {
        u.distance = haversineDistance(
          { latitude: userDoc.latitude, longitude: userDoc.longitude },
          { latitude: u.latitude, longitude: u.longitude }
        );
      });

      fetchedUsers.sort((a, b) => a.distance - b.distance);
    }

    setUsers(fetchedUsers);
    setFirstDoc(firstVisible);
    setLoading(false);
    setPage(page - 1);
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
      {userDoc.role == "user" && <h1 className="text-lg md:text-xl font-semibold mb-[20px]">Nearby users</h1>}
      {userDoc?.role === "admin" ? (
        <div className="overflow-x-auto bg-[#f3f4f6] rounded-lg py-[10px] px-[20px] flex flex-col gap-[20px]">
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
      ) : (
        <div className="overflow-x-auto bg-[#f3f4f6] rounded-lg pb-[10px] px-[20px]">
          <div className="mt-[20px] text-sm md:text-base flex flex-col">
            {users?.length > 0 ? (
              users?.map((user) => (
                <div
                  className="items-center justify-start gap-[25px] flex border-b-2 py-[10px]"
                  key={user.email}
                >
                  <img className="rounded-full w-[30px] h-[30px] object-cover" src={user.profilePicture} />
                  <div className="flex items-center gap-[5px] font-semibold">
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
                    {user.distance !== undefined && (
                      <div className="mx-[10px] flex items-center gap-[5px]">
                        <p>{user.distance.toFixed(2)}</p>
                        <p>km</p>
                        <p>away</p>
                        <p>from</p>
                        <p>you</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No users found</p>
            )}
          </div>
        </div>
      )}
      <div className="flex justify-between mt-[50px] bg-main-yellow">
        <button onClick={fetchPreviousPage} disabled={page === 1} className="px-4 py-2 bg-second-black text-white">
          Previous
        </button>
        <button onClick={fetchNextPage} disabled={users.length < usersPerPage} className="px-4 py-2 bg-second-black text-white">
          Next
        </button>
      </div>
    </section>
  );
}

export default Users;
