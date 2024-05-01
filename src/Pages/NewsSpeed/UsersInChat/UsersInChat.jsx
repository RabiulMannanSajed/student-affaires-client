import { useContext, useEffect, useState } from "react";
import Chatting from "../Chatting/Chatting";
import { AuthContext } from "../../../Provider/Authprovider";

const UsersInChat = () => {
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const [allUsers, setAllUsers] = useState([]);
  const [chatWithUser, setChatWithUser] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);
  console.log(allUsers);
  //  here all user
  const handleClick = (email) => {
    setChatWithUser(email);
  };
  return (
    <div className="flex justify-around mt-5 rounded-2xl">
      <div className="bg-slate-500 p-5 w-1/2 mr-5">
        {allUsers.map((users) => (
          <div key={users._id}>
            {/* <button onClick={() => handleClick(users.email)}>
              {(user?.displayName == users?.name) ? <></> : <p>{users.name}</p>}
            </button> */}
            {user?.displayName !== users?.name && (
              <button onClick={() => handleClick(users.email)}>
                <p>{users.name}</p>
              </button>
            )}
          </div>
        ))}
      </div>
      <Chatting chatWithUser={chatWithUser}></Chatting>
    </div>
  );
};

export default UsersInChat;
