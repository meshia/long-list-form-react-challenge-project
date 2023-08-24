import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import { useUsersContext } from '../../context/usersContext';
import styles from './users.module.css';
import { useRef } from 'react';

function UsersPage() {
  const { setUsersData, listError } = useUsersContext(true);
  const actionRef = useRef();

  const handleSave = () => {
    const childData = actionRef.current.getUsers();
    setUsersData(childData)
  }

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList ref={actionRef}/>
        <div className={styles.rightButtonContainer}>
          <PrimaryButton
            disabled={listError}
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
