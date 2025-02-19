import React from 'react';
import UserForm from './UserForm';

const Signup = () => {
  const handleUserSignUp = (userPayload) => {
    console.log(" signup payload", userPayload);
  }
  return (
    <div className='container'>
      <h3 className='text-center'>Sign-up</h3>
      <UserForm isSignUp={true} saveUserDetails={handleUserSignUp} />
    </div>
  )
}

export default Signup