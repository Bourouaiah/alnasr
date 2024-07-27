import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from '../UserContext';

const useFetchTransports = () => {
  const { transports, setTransports, setLoading } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      if (transports.length > 0) {
        setLoading(false);
        return;
      }

      const transportsSnapshot = await getDocs(collection(db, "transports"));
      const fetchedTransports = transportsSnapshot.docs.map((doc) => doc.data());

      setTransports(fetchedTransports);
      setLoading(false);
    };

    fetchData();
  }, [setLoading, setTransports, transports.length]);

  return { transports };
};

export default useFetchTransports;
