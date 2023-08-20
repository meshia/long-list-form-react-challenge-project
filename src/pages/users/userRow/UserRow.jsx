import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import { useUsersContext } from '../../../context/usersContext';
import styles from '../users.module.css';

// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';

const UserRow = ({ user={}, updateUser=(user)=>{}}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [errors, setErrors] = useState({});
  const { setListError } = useUsersContext();

  useEffect(()=> {
    setCurrentUser(user)
  }, [user]);

  useEffect(()=> {
    if(Object.values(errors).indexOf(true) === -1) {
      setListError(false);
      updateUser(currentUser, "update");
    } else {
      setListError(true);
    }
  }, [errors]);

  const handleChange = (name, value) => {
    setCurrentUser({...currentUser, [name]: value})
    switch(name) {
      case 'name':
        if (!value || /[^a-zA-Z ]/.test(value)) {
          setErrors({...errors, [name]: true});
        } else {
          setErrors({...errors, [name]: false});
        }
        break;
      case 'country':
        if (!value || countryOptions.indexOf(value) === -1) {
          setErrors({...errors, [name]: true});
        } else {
          setErrors({...errors, [name]: false});
        }
        break;
      case 'email':
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setErrors({...errors, [name]: true});
        } else {
          setErrors({...errors, [name]: false});
        }
        break;
      case 'phone':
        if (!value || !value?.match(/\+/g) || value?.match(/\+/g).length > 1) {
          setErrors({...errors, [name]: true});
        } else {
          setErrors({...errors, [name]: false});
        }
        break;
    }
  }


  return (
    <Grid container className={styles.userRow}>
      {currentUser && Object.keys(currentUser).map((key)=>{
        if(key !== 'id') {
          return (
          <Grid key={key} item xs={key === 'email' ? 3 : 2}>
            <InputField name={key} error={!currentUser[key] ? true : errors[key]} value={currentUser[key]} onChangehandler={handleChange}/>
          </Grid>
          )
        }
      })}
      
      <Grid item xs={1}>
        <TrashIconButton handleClick={()=>updateUser(currentUser, "delete")}/>
      </Grid>
    </Grid>
  );
};

export default UserRow;
