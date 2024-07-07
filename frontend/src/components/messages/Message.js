
// import React from 'react';
// import { useAuthContext } from "../../context/AuthContext";
// import useConversation from '../../zustand/useConversation';
// import { extractTime } from "../../utils/extractTime";

// const Message = ({ message }) => {


//   const { authUser } = useAuthContext();
//   const { selectedConversation } = useConversation();
//   const formattedTime = extractTime(message.createdAt);

//   // console.log(message,"mesagessss");

//   console.log(message?.data?.message?.senderId,"senderid");
//   console.log(authUser?.data?._id,"authuser");
  
//   const fromMe = message?.data?.message?.senderId === authUser?.id;

//   // console.log(fromMe,"fromme")
//   const chatClassName = fromMe ? "chat-end" : "chat-start";
//   const loggedInUser = authUser?.data?.profilePic;
//   const profilePic = fromMe ? loggedInUser : selectedConversation.profilePic;
//   const bubbleBgColor = fromMe ? "bg-blue-500" : "";
//   const shakeClass = message.shouldShake ? "shake" : "";



//   return (
//     <div className={`chat ${chatClassName}`}>
//       <div className='chat-image avatar'>
//         <div className='w-10 rounded-full'>
//           <img src={profilePic} alt='profile_pic' />
//         </div>
//       </div>
//       <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message?.message}</div>
//       <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
//     </div>
//   );
// }

// export default Message;


import React from 'react';
import { useAuthContext } from "../../context/AuthContext";
import useConversation from '../../zustand/useConversation';
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {


  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const formattedTime = extractTime(message.createdAt);
  
  console.log(message?.senderId,"sendid");
  const fromMe = message?.senderId === authUser?.id;

  console.log(fromMe);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const loggedInUser = authUser?.data?.profilePic;
  const profilePic = fromMe ? loggedInUser : selectedConversation.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";



  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={profilePic} alt='profile_pic' />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message?.message}</div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  );
}

export default Message;