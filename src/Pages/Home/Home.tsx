import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import socket from "../../socket";
import { Button } from "@mui/material";
import SideBar from "../../Components/SideBar/SideBar";
import ChatBox from "../../Components/ChatBox/ChatBox";
import Profile from "../../Components/Profile/Profile";
import "./style.css";
export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  const [isLogout, setIsLogout] = useState(false);
  const [roomData, setRoomData] = useState({ room: null, reciever: {} });
  const [onlineUserList, setOnlineUserList] = useState([]);
  const [allMsg, setAllMsg] = useState<any>([]);
  const socketRef: React.MutableRefObject<Socket<any, any> | undefined> =
    useRef();
  const user = window.sessionStorage.getItem("user");
  let parseUser;
  if (user) parseUser = JSON.parse(user);
  // Define 'crypto' as a global variable

  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (!state) {
      navigate("/");
    }
    socketRef.current = socket;
    socket.on("connect", () => setIsConnected(true));
    socket.off("disconnect", () => setIsConnected(false));
  }, []);
  useEffect(() => {
    if (isConnected && socketRef) {
      socketRef?.current?.emit("Add_User", state);
      socket.on("User_Added", (user) => {
        setOnlineUserList(user);
      });
      console.log(isConnected, socketRef, "isConnected && socketRef");
      socketRef.current?.on("Reciever_Msg", (msgData: any): any => {
        console.log(msgData, "---------msgData");
        setAllMsg((prev: any) => [...prev, msgData]);
      });
    }

    // Return a cleanup function
    // return () => {
    //   socketRef?.current?.disconnect();
    // };
  }, [isConnected]);
  function handleSendMsg(msg: string) {
    // console.log(msg, "chatbox");
    if (socketRef.current?.connected) {
      let msgData = {
        msg,
        reciever: roomData.reciever,
        sender: state,
      };
      setAllMsg((prev: any) => [...prev, msgData]);
      socketRef.current.emit("Send_Msg", msgData);
    }
  }
  function logoutHandler(val: any) {
    setIsLogout(val);
    if (socketRef.current?.connected) {
      socketRef.current.emit("Logout", state);
    }
  }
  useEffect(() => {
    console.log(allMsg, "allMsg", { isConnected }, { socketRef });
  }, [allMsg]);

  return (
    <div className="homeContainer">
      <SideBar
        roomData={roomData}
        setRoomData={setRoomData}
        onlineUsers={onlineUserList}
        user={parseUser}
      />
      <ChatBox
        allMsg={allMsg}
        roomData={roomData}
        handleSendMsg={(msg: string) => handleSendMsg(msg)}
      ></ChatBox>
      <Profile handlelogout={(val: any) => logoutHandler(val)}></Profile>
    </div>
  );
}
