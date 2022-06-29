import React, {useState, useCallback, useEffect, useRef} from "react";
import cn from "classnames";
import AppLink from '../AppLink';
import Loader from '../Loader';
import registerFields from "../../utils/constants/registerFields";
import { useStateContext } from "../../utils/context/StateContext";
import { setToken } from "../../utils/token";

import styles from "./OAuth.module.sass";

const OAuth = ( { className,handleClose,handleOAuth } ) => {
  const { setCosmicUser } = useStateContext();

  const [ { email, password }, setFields ] = useState( () => registerFields );
  const [fillFiledMessage, setFillFiledMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const inputElement = useRef( null );

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  const handleChange = ({ target: { name, value } }) =>
    setFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }));

  const submitForm = useCallback( async ( e ) => {
    e.preventDefault();
    fillFiledMessage?.length && setFillFiledMessage( '' );
    setLoading(true);

    if( email, password ) {
      const auth = await fetch( '/api/auth',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      } );

      const cosmicUser = await auth.json();

      if( cosmicUser?.hasOwnProperty( 'user' ) ) {
        setCosmicUser( cosmicUser[ 'user' ] );
        setToken( {
          id: cosmicUser[ 'user' ]['id'],
          first_name: cosmicUser[ 'user' ]['first_name'],
          avatar_url: cosmicUser[ 'user' ]['avatar_url'],
        } );

        setFillFiledMessage( 'Congrats!' );
        handleOAuth(cosmicUser['user']);
        setFields( registerFields );
        handleClose();
      } else {
        setFillFiledMessage('Please first register in Cosmic' );
      }
    } else {
      setFillFiledMessage( 'Please first all filed' )
    }
    setLoading(false);
  },[fillFiledMessage?.length, email, password, setCosmicUser, handleOAuth, handleClose] );

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
            ref={inputElement}
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
          <button type="submit" className={cn( "button",styles.button )}>{
            loading ?
            <Loader /> :
            'Continue'
          }</button>
        <button onClick={handleClose} className={cn("button-stroke", styles.button)}>Cancel</button>
      </div>
      </form>
    </div>
  );
};

export default OAuth;
