import { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { GlobalChat } from './screens/GlobalChat';
import { Login } from './screens/Login';
import { SignUp } from './screens/SignUp';
import { Contacts } from './screens/Contacts';
import { Button } from './components/Button/Button';

function App() {
  const [currentState, setCurrentState] = useState('LOGIN');
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [shouldRefetchMessages, setShouldRefetchMessages] = useState(true);

  console.log(currentState);

  useEffect(() => {
    fetchAllUsers();
    if (authenticatedUser) {
      setCurrentState('GLOBAL_CHAT');
    }
  }, []);

  useEffect(() => {
    if (shouldRefetchMessages) {
      setShouldRefetchMessages(false);
    }
  }, [shouldRefetchMessages]);

  const fetchAllUsers = async () => {
    // let users;
    // try {
    //   const res = await fetch('https://dayzpdaservertemplate.onrender.com/users');
    //   users = await res.json();
    // } catch(e) {
    //   console.error(e);
    // } finally {
    //   setAllUsers(users);
    // }
  }


  const renderState = () => {
    if (currentState === 'LOGIN') {
      return <Login setAuthenticatedUser={setAuthenticatedUser} setCurrentState={setCurrentState} />;
    }
    if (currentState === 'CREATE') {
      return <SignUp setCurrentState={setCurrentState} setAuthenticatedUser={setAuthenticatedUser} />;
    }
    if (currentState === 'GLOBAL_CHAT') {
      return <GlobalChat authenticatedUser={authenticatedUser} allUsers={allUsers} />;
    }

    if (currentState === 'CONTACTS') {
      return <Contacts authenticatedUser={authenticatedUser} />
    }

    return null;
  }

  const onLogout = async () => {
    try {
      const res = await fetch('http://localhost:10000/auth/logout', {
        method: 'POST',
        headers: {
          'authorization': authenticatedUser.token
        }
      });
      if (res.status === 200) {
        setAuthenticatedUser(null);
        setCurrentState('LOGIN');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div style={{ width: 800, height: 500, backgroundColor: '#081319' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
        <div style={{ padding: 10 }}>
          {currentState !== 'LOGIN' && currentState !== 'CREATE' &&
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: '8px' }}>
              <Button variant={currentState === 'GLOBAL_CHAT' ? 'Primary' : 'Secondary'} onClick={() => setCurrentState('GLOBAL_CHAT')}>Chat</Button>
              <Button variant={currentState === 'CONTACTS' ? 'Primary' : 'Secondary'} onClick={() => setCurrentState('CONTACTS')}>Contacts</Button>
              <Button variant={currentState === 'ONLINE' ? 'Primary' : 'Secondary'} >Online</Button>
              <Button variant={currentState === 'PROFILE' ? 'Primary' : 'Secondary'} >Profile</Button>
              <Button variant={currentState === '' ? 'Primary' : 'Secondary'} onClick={async () => {
                await onLogout();
              }}>Logout</Button>

            </div>
          }
        </div>
        <div style={{ width: '100%', overflow: 'scroll', height: 500 }}>
          {renderState()}
        </div>
      </div>
    </div>
  )
}

export default App
