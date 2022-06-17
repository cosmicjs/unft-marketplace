import React, {useState, useCallback} from "react";
import cn from "classnames";
import AppLink from '../AppLink';
import registerFields from "../../utils/constants/registerFields";
import { cosmicAuth } from '../../lib/cosmic';
import styles from "./OAuth.module.sass";

const OAuth = ( { className, handleClose, handleOAuth } ) => {
  const [ { email, password }, setFields ] = useState( () => registerFields );
  const [fillFiledMessage, setFillFiledMessage] = useState('');

  const handleChange = ({ target: { name, value } }) =>
    setFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }));

  const submitForm = useCallback( async ( e ) => {
    e.preventDefault();
    fillFiledMessage?.length && setFillFiledMessage( '' );

    if( email, password ) {
      const token = await cosmicAuth( {
        email: `${email}`,
        password: `${password}`,
      } );

      if( token?.hasOwnProperty('token') ) {
        setFillFiledMessage( 'Congrats!' );
        handleOAuth( token );
        setFields( registerFields );
        handleClose();
      } else {
        setFillFiledMessage(token || 'Please first register in Cosmic' );
      }

    } else {
      setFillFiledMessage( 'Please first all filed' )
    }
  },[ email,password,fillFiledMessage,handleOAuth,handleClose ] );

  return (
    <div className={cn( className,styles.transfer )}>
      <div className={cn( "h4",styles.title )}>Authentication with {' '}
        <AppLink
              target='_blank'
              href={`https://www.cosmicjs.com`}
        >
          Cosmic
        </AppLink></div>
      <div className={styles.text}>For create item you need register to {' '}
        <AppLink
              target='_blank'
              href={`https://www.cosmicjs.com`}
        >
          Cosmic
        </AppLink>
      </div>
      <div className={styles.error}>{fillFiledMessage}</div>
      <form className={styles.form} action="submit" onSubmit={submitForm}>
        <div className={styles.field}>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={email}
            required
          />
        </div>
        <div className={styles.field}>
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
            required
          />
        </div>
      <div className={styles.btns}>
        <button type="submit" className={cn("button", styles.button)}>Continue</button>
        <button onClick={handleClose} className={cn("button-stroke", styles.button)}>Cancel</button>
      </div>
      </form>
    </div>
  );
};

export default OAuth;
