import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from '../UserContext';

const useFetchAccommodations = () => {
  const { accommodations, setAccommodations, setLoading } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      if (accommodations.length > 0) {
        setLoading(false);
        return;
      }

      const accommodationsSnapshot = await getDocs(collection(db, "accommodations"));
      const fetchedAccommodations = accommodationsSnapshot.docs.map((doc) => doc.data());

      setAccommodations(fetchedAccommodations);
      setLoading(false);
    };

    fetchData();
  }, [setLoading, setAccommodations, accommodations.length]);

  return { accommodations };
};

export default useFetchAccommodations;
