import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { URL } from "../utils/constant";
import axios from "axios";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await axios.post(
				`${URL}/logout`,
				{},
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true // Assuming you need to send cookies
				}
			);
	
			const data = res.data;
// console.log("__+",localStorage.getItem('chat-user'))
			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
  
}; 

export default useLogout;


