import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from '../UserContext';

const useFetchFacilities = () => {
  const { facilities, setFacilities, setLoading } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      if (facilities.length > 0) {
        setLoading(false);
        return;
      }

      const facilitiesSnapshot = await getDocs(collection(db, "facilities"));
      const fetchedFacilities = facilitiesSnapshot.docs.map((doc) => doc.data());

      setFacilities(fetchedFacilities);
      setLoading(false);
    };

    fetchData();
  }, [setLoading, setFacilities, facilities.length]);

  return { facilities };
};

export default useFetchFacilities;
