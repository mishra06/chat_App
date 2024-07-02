import  { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";
import { URL } from '../utils/constant';



const useSignup = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async({fullName,username,password,gender,confirmPassword})=>{
       const success = handelInputError({fullName,username,password,gender,confirmPassword})
       if(!success) return;

       setLoading(true);
       try {

            const res = await fetch(`${URL}/signup`, {
                method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
            });

            const data = await res.json();
            console.log(data);
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

       } catch (error) {
        toast.error(error.message);
       } 
       finally {
        setLoading(false);
       }
    };

    return { loading, signup };
};

export default useSignup;

function handelInputError ({fullName,username,password,gender,confirmPassword}){
    if(!fullName || !username || !password || !gender || !confirmPassword){
        toast.error("Please fill all fields");
        return false;
    }

    if(password  !== confirmPassword){
        toast.error("Passwords do not match");
        return false;
    }

    if(password.length < 8){
        toast.error("Password should be at least 8 characters long");
        return false;
    }

    return true;
}
