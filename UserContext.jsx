import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDoc, setUserDoc] = useState(null);
  const [users, setUsers] = useState([]);
  const [transports, setTransports] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [health, setHealth] = useState([]);
  const [security, setSecurity] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [educations, setEducations] = useState([]);
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <UserContext.Provider
      value={{
        userDoc,
        setUserDoc,
        users,
        setUsers,
        transports,
        setTransports,
        accommodations,
        setAccommodations,
        health,
        setHealth,
        security,
        setSecurity,
        facilities,
        setFacilities,
        communications,
        setCommunications,
        educations,
        setEducations,
        food,
        setFood,
        loading,
        setLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);