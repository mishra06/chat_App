import React from 'react'
import useLogout from "../../hooks/useLogout";
import { TbLogout2 } from "react-icons/tb";


const LogoutButton = () => {

  const { loading, logout } = useLogout();
  return (
    <div className='mt-auto'>
			{!loading ? (
				<TbLogout2 className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
  )
}

export default LogoutButton;
