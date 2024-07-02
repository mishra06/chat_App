// Message.js
import React from 'react';
import { useAuthContext } from "../../context/AuthContext";
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  // console.log('Message component:', message); // Debug: log individual message

  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  
  const fromMe = authUser?._id === message?.sender?._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={profilePic} alt='profile_pic' />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:40</div>
    </div>
  );
}

export default Message;



// import React from 'react'
// import { useAuthContext } from "../../context/AuthContext";
// import useConversation from '../../zustand/useConversation';

// const Message = ({message}) => {


//   console.log(message,"message.js");

//   const { authUser } = useAuthContext();
//   const { selectedConversation } = useConversation();
//   console.log(selectedConversation.name);
//   const fromMe = authUser?._id === message?.sender?._id;
//   // console.log(fromMe,"fromMe");
//   const chatClassName = fromMe ? "chat-end" : "chat-start";
//   const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
//   const bubbleBgColor = fromMe ? "bg-blue-500" : "";

//   return (
//     <div className={`chat ${chatClassName}`}>
//       <div className='chat-image avatar'>
//         <div className='w-10 rounded-full'>
//             <img src={profilePic} alt='profile_pic' />
//         </div>
//       </div>

//       <div className={`chat-bubble text-white ${bubbleBgColor}  pb-2`}>{message?.message}</div>
//       <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:40</div>
//     </div>
//   )
// }

// export default Message
