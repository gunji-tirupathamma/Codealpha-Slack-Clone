import { useStateValue } from './StateProvider/StateProvider';
import { actionTypes } from '../reducer';
import { signInWithPopup } from 'firebase/auth'; 

import {auth, provider} from '../firebase'

function useGoogleSignIn() {
  const [state, dispatch] = useStateValue();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Signed in user:', result.user);

        dispatch({
          type: actionTypes.SET_USER,
          user: result.user          
        });
        console.log('dispatch user:', result.user);
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
      });
  };

  return handleGoogleSignIn;
}

export default useGoogleSignIn;


