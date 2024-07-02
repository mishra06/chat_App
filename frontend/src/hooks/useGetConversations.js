import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { USERRR } from "../utils/constant";
import axios from "axios";

const useGetConversations = () => {

    const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	// const getConversations = async () => {
	// 	setLoading(true);
	// 	try {
	// 		const res = await fetch(`${USERRR}/users`);
	// 		const data = await res.json();

	// 		console.log(data,"dataaaa");
	// 		if (data.error) {
	// 			throw new Error(data.error);
	// 		}
	// 		setConversations(data?.data);
	// 	} catch (error) {
	// 		toast.error(error.message);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	const getConversations = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${USERRR}/users`, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true, // This allows sending cookies with the request
			});
			const data = res.data;

			// console.log(data, "dataaaa");
			if (data.error) {
				throw new Error(data.error);
			}
			setConversations(data?.data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};


    useEffect(() => {
		getConversations();
	}, []);

    return { loading, conversations };
};

export default useGetConversations
