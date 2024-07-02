import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { USERRR } from "../utils/constant";

const useGetConversations = () => {

    const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	const getConversations = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${USERRR}/users`);
			const data = await res.json();

			console.log(data,"dataaaa");
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
