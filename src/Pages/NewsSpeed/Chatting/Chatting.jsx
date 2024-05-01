import { AuthContext } from "../../../Provider/Authprovider";
import { useContext } from "react";
import Swal from "sweetalert2";
import useMessage from "../../../hooks/useMessage";

const Chatting = ({ chatWithUser }) => {
  const [messages, refetch] = useMessage();
  const { user } = useContext(AuthContext);
  const date = new Date();
  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  //  show there chatting
  console.log(chatWithUser);
  const sendMEmail = chatWithUser;
  const handleChat = (event) => {
    event.preventDefault();
    const form = event.target;
    const chat = form.chat.value;
    const toEmail = sendMEmail;
    const userEmail = user?.email;
    const userName = user?.displayName;

    console.log(chat, toEmail, userEmail, showTime);

    const messaging = {
      chat: chat,
      toEmail: toEmail,
      userEmail: userEmail,
      showTime: showTime,
      userName: userName,
    };
    fetch("http://localhost:5000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messaging),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          refetch();
        }
      });
  };

  return (
    <div className="bg-slate-500 p-5 w-1/2">
      <h2 className="bg-slate-800 p-4 mb-5 text-white">{chatWithUser}</h2>
      {sendMEmail ? (
        <>
          {messages.map((message) => (
            <div className="text-white" key={message._id}>
              {/* reciver */}
              {message?.userEmail ? (
                <>
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      {message.userName}
                      <time className="text-xs opacity-50 ml-4">
                        {message.showTime}
                      </time>
                    </div>
                    <div className="chat-bubble">{message.chat}</div>
                  </div>
                </>
              ) : (
                <> </>
              )}
            </div>
          ))}
        </>
      ) : (
        <>
          <h2>Start chat with friend</h2>
        </>
      )}
      <form onSubmit={handleChat} className="flex">
        <div className="form-control">
          <input
            type="text"
            name="chat"
            placeholder="Type here"
            required
            className="input input-bordered input-warning w-full max-w-xs mt-3 text-black"
          />
        </div>
        <div>
          <button className="btn bg-green-400 mt-3" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatting;
