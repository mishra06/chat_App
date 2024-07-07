
// import { useEffect, useState } from 'react';
// import useConversation from "../zustand/useConversation";
// import toast from 'react-hot-toast';
// import { MSG } from '../utils/constant';
// import axios from 'axios';

// const useGetMessages = () => {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages, selectedConversation } = useConversation();

//   // console.log(selectedConversation,"selected");

// useEffect(() => {
//   const getMessages = async () => {
//     if (selectedConversation?._id)
//     setLoading(true);
//     try {
      
//       const res = await axios.get(`${MSG}/${selectedConversation?._id}`,{
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true, // If you need to send cookies with the request
//       })
//       const data = res?.data.message;
//       console.log(data,"data");
//       if (data.error) {throw new Error(data.error);}
//       setMessages([data]); 
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//    getMessages();
// }, [selectedConversation?._id, setMessages]);

// return { messages, loading };
// };

// export default useGetMessages;


import { useEffect, useState } from 'react';
import useConversation from "../zustand/useConversation";
import toast from 'react-hot-toast';
import { MSG } from '../utils/constant';
import axios from 'axios';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  // console.log(selectedConversation,"selected");

useEffect(() => {
  const getMessages = async () => {
    setLoading(true);
    try {
      
      const res = await axios.get(`${MSG}/${selectedConversation?._id}`,{
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // If you need to send cookies with the request
      })
      const data = res?.data;
      console.log(data,"data");
      if (data.error) {throw new Error(data.error);}
      setMessages(data); 
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (selectedConversation?._id) getMessages();
}, [selectedConversation?._id, setMessages]);

return { messages, loading };
};

export default useGetMessages;