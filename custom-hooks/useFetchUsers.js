import { useState, useEffect } from "react";
import { collection, query, getDocs, limit, startAfter, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useUserContext } from '../UserContext';

const useFetchUsers = () => {
  const { users, setUsers, userDoc, setUserDoc, loading, setLoading } = useUserContext();
  const [lastDoc, setLastDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(2);
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
          setLoading(false);
        }
      });
    };

    fetchData();
  }, [setLoading, setUserDoc]);

  const fetchUsers = async (reset = false, direction = 'next') => {
    setLoading(true);
    try {
      let usersQuery;

      if (direction === 'next') {
        usersQuery = query(
          collection(db, "users"),
          ...(lastDoc && !reset ? [startAfter(lastDoc)] : []),
          limit(usersPerPage)
        );
      } else if (direction === 'prev' && currentPage > 1) {
        usersQuery = query(
          collection(db, "users"),
          limit(usersPerPage)
        );
      }

      const snapshot = await getDocs(usersQuery);
      const newUsers = snapshot.docs.map((doc) => doc.data());

      if (userDoc?.latitude && userDoc?.longitude) {
        newUsers.forEach((u) => {
          u.distance = haversineDistance(
            { latitude: userDoc.latitude, longitude: userDoc.longitude },
            { latitude: u.latitude, longitude: u.longitude }
          );
        });
        newUsers.sort((a, b) => a.distance - b.distance);
      }

      setUsers(reset ? newUsers : newUsers);

      if (direction === 'next') {
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        setCurrentPage((prevPage) => prevPage + 1);
      } else if (direction === 'prev' && currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchUsers(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { users, userDoc, fetchUsers, loading };
};

export default useFetchUsers;

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
