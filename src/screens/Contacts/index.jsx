import { useEffect, useState } from "react"

export const Contacts = ({authenticatedUser}) => {
    const [displayFriends, setDisplayFriends] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            for (const id of authenticatedUser.friends) {
                const response = await fetch(`http://localhost:3000/users?user_id=${id}`);
                const userArray = await response.json(); // Assume each response is an array
                setDisplayFriends((prevData) => [...userArray]); // Merge into one array
              }
        };
    
        fetchUserData();
      }, [authenticatedUser]);

      console.log(displayFriends);

    return (
        <div>
            {displayFriends.length ? (
                displayFriends.map(friend => (
                    <div>{friend.username}</div>
                ))
            ) : 'NO FRIENDS'}
        </div>
    )
}