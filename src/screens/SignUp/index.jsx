import { useState } from "react";

export const SignUp = ({setAuthenticatedUser, setCurrentState}) => {
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
      });
    const [confirmPassword, setConfirmPassword] = useState('');
    const createUser = async () => {
        try {
        const res = await fetch('http://localhost:10000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Specify that the body content is JSON
            },
            body: JSON.stringify({
              username: newUser.username,
              password: newUser.password,
              steamId: String(Math.floor(Math.random() * 900000) + 100000)
            })
        });
        const response = await res.json();
        if (response?.user?._id) {
            console.log('HERE');
            setAuthenticatedUser(response);
            setCurrentState('GLOBAL_CHAT');
        }
        } catch(e) {
        console.error(e);
        }
    };

  return (
    <div style={{display: 'flex', flex: 1, flexDirection: 'column', height: '100%', justifyContent: 'center',alignItems: 'center'}}>
        <div>
        username{' '}
        <input value={newUser.username} onChange={(e) => {
          setNewUser({
            ...newUser,
            username: e.target.value
          })
        }} />
        </div>
        <div>
        password{' '}
        <input value={newUser.password} onChange={(e) => {
          setNewUser({
            ...newUser,
            password: e.target.value
          })
        }} />
        </div>
        <div>
        confirm {' '}
        <input value={confirmPassword} onChange={(e) => {
          setConfirmPassword(e.target.value)
        }} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <button onClick={() => setCurrentState('LOGIN')}>Back</button>
        <button onClick={() => createUser()}>Create User</button>
        </div>
      </div>
  )
}