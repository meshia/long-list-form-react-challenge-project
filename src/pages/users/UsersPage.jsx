import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import { useUsersContext } from '../../context/usersContext';
import styles from './users.module.css';
import { useEffect, useRef, useState } from 'react';

function UsersPage() {
  const { setUsersData, listError } = useUsersContext({});
  const [ displaySaveButton, setDisplaySaveButton ] = useState(false);
  const actionRef = useRef();

  const handleSave = () => {
    const childData = actionRef.current.getUsers();
    setUsersData(childData)
  }

  useEffect(() => {
    console.log("listError", listError, Object.keys(listError).length)
    if(Object.keys(listError).length > 0) {
      setDisplaySaveButton(true);
    } else {
      setDisplaySaveButton(false);
    }
  },[ listError ])

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList ref={actionRef}/>
        <div className={styles.rightButtonContainer}>
          <PrimaryButton
            disabled={displaySaveButton}
            handleClick={handleSave}
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
