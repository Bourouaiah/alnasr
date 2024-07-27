import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from '../UserContext';

const useFetchHealth = () => {
  const { health, setHealth, setLoading } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      if (health.length > 0) {
        setLoading(false);
        return;
      }

      const healthSnapshot = await getDocs(collection(db, "health"));
      const fetchedHealth = healthSnapshot.docs.map((doc) => doc.data());

      setHealth(fetchedHealth);
      setLoading(false);
    };

    fetchData();
  }, [setLoading, setHealth, health.length]);

  return { health };
};

export default useFetchHealth;
