import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from '../UserContext';

const useFetchEducations = () => {
  const { educations, setEducations, setLoading } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      if (educations.length > 0) {
        setLoading(false);
        return;
      }

      const educationsSnapshot = await getDocs(collection(db, "educations"));
      const fetchedEducations = educationsSnapshot.docs.map((doc) => doc.data());

      setEducations(fetchedEducations);
      setLoading(false);
    };

    fetchData();
  }, [setLoading, setEducations, educations.length]);

  return { educations };
};

export default useFetchEducations;
