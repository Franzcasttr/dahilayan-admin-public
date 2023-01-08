import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { initFirebase } from '../../firebase/firebaseApp';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const SignIn = () => {
  initFirebase();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<string>('');

  const { push, query } = useRouter();
  const callback = query.callbackUrl;

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential) {
          if (callback) {
            setTimeout(() => {
              push(`${callback}`);
            }, 2000);
          } else {
            setTimeout(() => {
              push('/');
            }, 2000);
          }
        }
      })
      .catch((error) => {
        setIsError(error.message);
      });
  };

  // user?.getIdToken(true).then((token) => {

  //   if (!!token.claims.SuperAdmin) {
  //     signOut();
  //     return (
  //       <div className='section-center'>
  //         <div className='text-center mt-32'>
  //           <h1 className='text-xl font-semibold'>
  //             Not allowed to access this page...
  //           </h1>
  //         </div>
  //       </div>
  //     );
  //   }
  // })

  if (user) {
    if (callback) {
      setTimeout(() => {
        push(`${callback}`);

        // push(`${query.callbackUrl}`);
      }, 2000);
    } else {
      setTimeout(() => {
        push('/');

        // push(`${query.callbackUrl}`);
      }, 2000);
    }
    return (
      <div className='section-center'>
        <div className='text-center mt-32'>
          <h1 className='text-xl font-semibold'>Checking Authentication...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className='section-center'>
      <div className='p-8 border-2 border-gray-400 rounded-3xl sm:w-fit mx-auto mt-20'>
        <p className='font-semibold text-center mb-8 text-xl'>Login</p>
        {isError ? (
          <p className='mb-8 p-4 bg-[#fe8c8c] text-red-800 text-lg rounded-lg'>
            {isError}
          </p>
        ) : null}
        <form className='flex flex-col gap-4 form-login'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='p-2 mx-auto text-lg rounded-lg bg-[#65CFA9] text-white w-28 cursor-pointer'
            onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
