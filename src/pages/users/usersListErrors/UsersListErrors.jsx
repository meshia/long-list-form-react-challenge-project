import { useEffect, useState } from "react";
import styles from '../users.module.css';

const UsersListErrors = ({ errors }) => {
    const [errorsList, setErrorsList] = useState({});

    useEffect(()=>{
        const countErrors = {};
        Object.values(errors).map((item)=>{
            Object.values(item).map((error)=>{
                if(!countErrors[error]) countErrors[error] = 1
                else countErrors[error] = countErrors[error] + 1;
            })
        })
        setErrorsList(countErrors);
    }, [errors])
    return (
        <div className={styles.usersListErrors}>
            <span>Errors:</span>
            {errorsList && Object.keys(errorsList).map((key, index)=>
                {return <span className={ styles.usersListErrorItems } key={index}>{key}: {errorsList[key]}</span>}
            )
            }
            
        </div>
    );
};

export default UsersListErrors;
