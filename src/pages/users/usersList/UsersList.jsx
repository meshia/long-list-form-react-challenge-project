import { v1 as uuid } from 'uuid';
import { Typography } from '@mui/material';
import { useUsersContext } from '../../../context/usersContext';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const UsersList = forwardRef((props, ref) => {
  const { usersData, setUsersData, setListError } = useUsersContext();
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    setUsers(usersData);
  }, [usersData])

  const handleAddUser = () => {
    setUsersData(oldUsers => [{
      "id": uuid(),
      "name": "",
      "country": "",
      "email": "",
      "phone": ""
    }, ...oldUsers]);
    setListError(true);
  };

  const handleUserUpdate = (user, action) => {
    switch(action) {
      case "delete":
        setUsersData(oldUsers => oldUsers.filter((item) => item?.id !== user?.id));
      break;
      case "update":
        setUsers(oldUsers => oldUsers.map((item) => 
          item.id === user.id ? user : item
        ));
      break;
    }
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        getUsers: () => users,
      }
    },
    [users],
  );

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List</Typography>
        <AddButton handleClick={handleAddUser}/>
      </div>
      <div className={styles.usersListContent}>
        { usersData.map((user) => (
          <UserRow key={user.id} user={user} updateUser={handleUserUpdate}/>
        ))}
      </div>
    </div>
  );
})

UsersList.displayName = 'UsersList';
export default UsersList;
