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
  const { setListError, listError } = useUsersContext();

  useEffect(()=> {
    setCurrentUser(user)
  }, [user]);

  useEffect(()=> {
    if(Object.keys(errors).length) {
      if(currentUser.id) {
        setListError({...listError, [currentUser.id]: errors});
      }
    } else {
      setListError(prev => {
        const copy = {...prev};
        delete copy[currentUser.id];
        return copy
      });
    }
    updateUser(currentUser, "update");
  }, [errors]);

  const handleChange = (name, value) => {
    setCurrentUser({...currentUser, [name]: value})
    let currentError = value.length === 0 ? "field is empty" : false;
    if(!currentError) {
      switch(name) {
        case 'name':
          if (/[^a-zA-Z ]/.test(value)) {
            currentError = "invalid name";
          }
          break;
        case 'country':
          if (countryOptions.indexOf(value) === -1) {
            currentError = "invalid country name";
          }
          break;
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            currentError = "invalid email address";
          }
          break;
        case 'phone':
          if (!value?.match(/\+/g) || value?.match(/\+/g).length > 1) {
            currentError = "invalid phone number";
          }
          break;
      }
    }

    if (currentError === false) {
      setErrors(prev => {
        const copy = {...prev};
        delete copy[name];
        return copy
      });
    } else {
      setErrors({...errors, [name]: currentError});
    }
  }

  return (
    <Grid container className={styles.userRow}>
      {currentUser && Object.keys(currentUser).map((key)=>{
        if(key !== 'id') {
          return (
          <Grid key={key} className={styles.userFieldWrapper} item xs={key === 'email' ? 3 : 2}>
            <InputField name={key} error={ errors[key] ? true : false } value={ currentUser[key] } onChangehandler={handleChange}/>
            <span className={styles.errorNote}>{errors[key]}</span>
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
