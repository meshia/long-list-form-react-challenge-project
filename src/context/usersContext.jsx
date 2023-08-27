import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import data from '../data/initialUsersData.json';

// initial value
const UsersContext = createContext({
  usersData: [],
  setUsersData: () => {},
  listError: {},
  setListError: () => {},
  loading: false,
});

// value provider
export const ContextProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState({});

  useEffect(() => {
    const t = setTimeout(() => {
      setUsersData(data);
    }, 2000);

    return () => {
      clearTimeout(t);
    };
  }, []);

  const contextValue = useMemo(() => ({ usersData, setUsersData, listError, setListError }), [listError, usersData]);

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;
