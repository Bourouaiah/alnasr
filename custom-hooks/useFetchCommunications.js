import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from '../UserContext';

const useFetchCommunications = () => {
  const { communications, setCommunications, setLoading } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      if (communications.length > 0) {
        setLoading(false);
        return;
      }

      const communicationsSnapshot = await getDocs(collection(db, "communications"));
      const fetchedCommunications = communicationsSnapshot.docs.map((doc) => doc.data());

      setCommunications(fetchedCommunications);
      setLoading(false);
    };

    fetchData();
  }, [setLoading, setCommunications, communications.length]);

  return { communications };
};

export default useFetchCommunications;
