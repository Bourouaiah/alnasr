import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from '../UserContext';

const useFetchSecurity = () => {
  const { security, setSecurity, setLoading } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      if (security.length > 0) {
        setLoading(false);
        return;
      }

      const securitySnapshot = await getDocs(collection(db, "security"));
      const fetchedSecurity = securitySnapshot.docs.map((doc) => doc.data());

      setSecurity(fetchedSecurity);
      setLoading(false);
    };

    fetchData();
  }, [setLoading, setSecurity, security.length]);

  return { security };
};

export default useFetchSecurity;
