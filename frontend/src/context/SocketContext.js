import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        // console.log(authUser?.data?._id, "authUser ID");

        if (authUser?.data?._id) {
            const socket = io("http://localhost:4000", {
                query: { userId: authUser?.data?._id }
            });

            setSocket(socket);

            socket.on("connect", () => {
                console.log("Socket connected:", socket.id);
            });

            socket.on("getOnlineUsers", (users) => {
                // console.log("Received online users:", users); // Debugging log
                setOnlineUsers(users);
            });

            socket.on("disconnect", () => {
                console.log("Socket disconnected");
            });

            return () => {
                console.log("Socket disconnected due to component unmount");
                socket.close();
            };
        } else {
            if (socket) {
                console.log("Closing existing socket due to missing authUser");
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);


    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};