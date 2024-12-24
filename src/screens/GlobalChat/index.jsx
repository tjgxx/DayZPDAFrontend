import { useEffect, useState } from "react";
import { Message } from "../../components/Message/Message";

export const GlobalChat = ({ allUsers, authenticatedUser }) => {

  const [newMessage, setNewMessage] = useState('');
  const [globalMessages, setGlobalMessages] = useState([]);
  const [shouldRefetchMessages, setShouldRefetchMessages] = useState(true);

  useEffect(() => {
    if (shouldRefetchMessages) {
      fetchGlobalChat();
      setShouldRefetchMessages(false);
    }
  }, [shouldRefetchMessages]);

  const fetchGlobalChat = async () => {
    let messages;
    try {
      const res = await fetch('http://localhost:10000/messages/global', {
        method: 'GET',
        headers: {
          'authorization': authenticatedUser.token
        }
      });
      messages = await res.json();
      setGlobalMessages(messages);
    } catch (e) {
      console.error(e);
    }
  }
  const sendNewGlobalMessage = () => {
    try {
      fetch('http://localhost:10000/messages', {
        method: 'POST',
        headers: {
          'authorization': authenticatedUser.token,
          'Content-Type': 'application/json', // Specify that the body content is JSON
        },
        body: JSON.stringify({
          userId: authenticatedUser.user._id,
          content: newMessage
        })
      });
      setNewMessage('');
      setShouldRefetchMessages(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    (
      <div style={{ width: '100%' }}>
        GLOBAL CHAT
        <div style={{ padding: 40 }}>
          {globalMessages?.messages?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))?.map(message => (
            <Message message={message} authenticatedUser={authenticatedUser} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '80%' }}>
            <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} style={{ width: '100%' }} name="Text1" cols="40" rows="5"></textarea>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', columnGap: 8 }}>
              <button onClick={() => sendNewGlobalMessage()}>Send</button>
              <button onClick={() => setShouldRefetchMessages(true)}>Refresh</button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}