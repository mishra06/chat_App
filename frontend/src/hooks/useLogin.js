import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { URL } from "../utils/constant";
import axios from "axios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputError(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${URL}/login`,
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      const data = res.data;

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputError(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}


//  in below code i will expend 2-3 hurs (:

// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
// import { URL } from "../utils/constant";
// import axios from "axios";

// const useLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const { setAuthUser } = useAuthContext();

//   const login = async (username, password) => {
//     const success = handleInputError(username, password);
//     if (!success) return;
//     setLoading(true);
//     try {
//       // const res = await fetch(`${URL}/login`, {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({ username, password }),
//       // });

//       const res = await axios.post(
//         `${URL}/login`,
//         { username, password },
//         {
//             headers: { "Content-Type": "application/json" },
//             withCredentials: true
//         }
//     );

//       if (!res.ok) {
//         // Handle non-200 status codes
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Login failed");
//       }

//       // const data = await res.json();

//       const data = res.data;

//       // console.log("data", data);

//       localStorage.setItem("chat-user", JSON.stringify(data));
//       setAuthUser(data);
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, login };
// };

// export default useLogin;

// function handleInputError(username, password) {
//   if (!username || !password) {
//     toast.error("Please fill in all fields");
//     return false;
//   }

//   return true;
// }
