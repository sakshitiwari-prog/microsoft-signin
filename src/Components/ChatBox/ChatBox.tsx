import React from "react";
import "./style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ChatArea from "../ChatArea/ChatArea";
function ChatBox(props: any) {
  const { roomData, handleSendMsg, allMsg } = props;

  return (
    <div className="chatboxContainer">
      {roomData.room ? (
        <>
          <Header roomData={roomData}></Header>
          <ChatArea
            allMsg={allMsg}
            reciever_email={roomData.reciever.userData.email}
          ></ChatArea>
          <Footer handleSendMsg={handleSendMsg}></Footer>
        </>
      ) : (
        <>
          <h1>please select a user to chat with </h1>
        </>
      )}
    </div>
  );
}

export default ChatBox;
