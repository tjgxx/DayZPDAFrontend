import { useState } from "react";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

export const Login = ({setCurrentState, setAuthenticatedUser}) => {
  const [newUser, setNewUser] = useState({
    username: 'NikolaiVoronov',
    password: 'Stalker4Lyfe',
  });
  const [isNoUserFound, setIsNoUserFound] = useState(false);
  const [error, setError] = useState(null);

  const onAttemptLogin = async () => {
    if (!newUser.username) {
      setIsNoUserFound(true);
      return;
    }
    try {
      const res = await fetch('http://localhost:10000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify that the body content is JSON
        },
        body: JSON.stringify({
          username: newUser.username,
          password: newUser.password
        })
      });
      const { user, token } = await res.json();
      if (user._id) {
        setAuthenticatedUser({token, user});
        setCurrentState('GLOBAL_CHAT');
    }
    } catch(e) {
      console.log(e, 'error');
      setError(e.error);
    }
  }
  console.log(error);
    return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', rowGap: '8px'}}>
        <div style={{color: '#dbded1', fontSize: 24}}>Login</div>
        <Input onChange={(e) => {
          setNewUser({
            ...newUser,
            username: e.target.value
          })
        }} label="Username" value={newUser.username} />
        <Input onChange={(e) => {
          setNewUser({
            ...newUser,
            password: e.target.value
          })
        }} label="Password" value={newUser.password} />
        <div style={{display: 'flex', flexDirection: 'row', columnGap: 8}}>
          <Button onClick={() => onAttemptLogin()} variant="Secondary">Login</Button>
          <Button onClick={() => setCurrentState('CREATE')} variant="Primary">Register</Button>
        </div>
        {error && <div>{error}</div>}
      </div>
    )
}