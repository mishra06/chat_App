import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { MSG } from "../utils/constant";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  // console.log("selectedConversation", selectedConversation._id);

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${MSG}/send/${selectedConversation?._id}`,
        { message },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // If you need to send cookies with the request
        }
      );

      const data = res.data;

      // console.log(data, "message data");
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;

// import  { useState } from 'react'
// import useConversation from '../zustand/useConversation';
// import toast from "react-hot-toast";
// import { MSG } from '../utils/constant';

// const useSendMessage = () => {

//     const [loading, setLoading] = useState(false);
// 	const { messages, setMessages, selectedConversation } = useConversation();

//     // console.log("selectedConversation", selectedConversation?._id)

//     const sendMessage = async (message)=>{
//         setLoading(true);
//         try {
//             const res = await fetch(`${MSG}/send/${selectedConversation._id}`, {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ message }),
//               });

//             const data = await res.json();
//             if(data.error) throw new Error(data.error);

//             setMessages([...messages,data]);
//         } catch (error) {
//             toast.error(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { sendMessage, loading };
//  };

// export default useSendMessage;
