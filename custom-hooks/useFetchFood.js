import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from '../UserContext';

const useFetchFood = () => {
  const { food, setFood, setLoading } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      if (food.length > 0) {
        setLoading(false);
        return;
      }

      const foodSnapshot = await getDocs(collection(db, "food"));
      const fetchedFood = foodSnapshot.docs.map((doc) => doc.data());

      setFood(fetchedFood);
      setLoading(false);
    };

    fetchData();
  }, [setLoading, setFood, food.length]);

  return { food };
};

export default useFetchFood;
