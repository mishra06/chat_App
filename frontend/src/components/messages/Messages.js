// Messages.js
import React, {  useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from '../shimmerUi/MessageSkeleton';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef();

  // console.log('Messages component:', messages); // Debug: log messages

  useEffect(() => {
    if (messages?.length > 0) {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages?.length > 0 && (
        messages.map((message) => (
          <div key={message?._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      )}
      {!loading && messages?.length === 0 && (
        <p className='text-center-white'>Send a message to start the conversation</p>
      )}
    </div>
  );
}

export default Messages;



// import { useEffect, useRef } from 'react'
// import Message from './Message'
// import useGetMessages from "../../hooks/useGetMessages";
// import MessageSkeleton from '../shimmerUi/MessageSkeleton';


// const Messages = () => {

//   const { messages, loading } = useGetMessages();
//   const lastMessageRef = useRef();

//   // console.log("message: " , messages);

//   return (
//     <div className='px-4 flex-1 overflow-auto'>

//         {!loading &&
//                 messages?.length > 0 &&
//                 messages.map((message) => (
//                   <div key={message?._id} ref={lastMessageRef}>
//                     <Message message={message} />
//                   </div>
//                 ))}

//       {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
//       {!loading && messages.length === 0 && (
// 				<p className='text-center'>Send a message to start the conversation</p>
// 			)}
//     </div>
//   )
// }

// export default Messages;
