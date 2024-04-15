import React from "react";
import "./style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ChatArea from "../ChatArea/ChatArea";
import axios from "axios";
import { Button } from "@mui/material";
import { InteractionRequiredAuthError, InteractionStatus, InteractionType } from "@azure/msal-browser";
import { useEffect, useState } from "react";
import { MsalAuthenticationTemplate, withMsal } from "@azure/msal-react";
import {graphConfig,accessRequest,msalInstance} from '../../../src/auth-config'
// function ChatBox(props: any) {
//   const { roomData, handleSendMsg, allMsg } = props;
//   function getChat() {
//     // const data=await axios.get
//   }
//   const user = window.sessionStorage.getItem("user");
//   return (
//     <div className="chatboxContainer">
//       {roomData.room ? (
//         <>
//           <Header roomData={roomData}></Header>
//           <ChatArea
//             allMsg={allMsg}
//             reciever_email={roomData.reciever.userData.email}
//           ></ChatArea>
//           <Footer handleSendMsg={handleSendMsg}></Footer>
//         </>
//       ) : (
//         <>
//           <h1>
//             {" "}
//             <Button variant="outlined" onClick={() => {}}>
//               signin
//             </Button>
//           </h1>
//         </>
//       )}
//     </div>
//   );
// }

// export default ChatBox;
async function callMsGraph(accessToken:any) {
  console.log('hy');
  if (!accessToken) {
      const account = msalInstance.getActiveAccount();
      if (!account) {
          throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
      }
  console.log(account,'account');
      const response = await msalInstance.acquireTokenSilent({
          ...accessRequest,
          account: account
      });
      console.log(response,'response')
      accessToken = response.accessToken;
  }

  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
      method: "GET",
      headers: headers
  };

  return fetch(graphConfig.graphMeEndpoint, options)
      .then(response => response.json())
      .catch(error => console.log(error));
}
function ProfileContent({msalContext}:any) {
  useEffect(() => {
    console.log('came');
  }, []);
  
  const [graphData, setGraphData] = useState(null);

  // const fetchData = () => {
  //   if (!graphData && msalContext.inProgress === InteractionStatus.None) {
  //     const token=localStorage.getItem('token')
  //     callMsGraph(token)
  //       .then((response) => setGraphData(response))
  //       .catch((error) => {
  //         if (error instanceof InteractionRequiredAuthError) {
  //           msalContext.instance.acquireTokenRedirect({
  //             ...accessRequest,
  //             account: msalContext.instance.getActiveAccount(),
  //           });
  //         }
  //       });
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [graphData, msalContext]);

  return (
    <div>
      <p>hy</p>
      {graphData ? (
        <p>done</p>
      ) : (
        <Button onClick={() => {}} >
          signin
        </Button>
      )}
    </div>
  );
}

function ChatBox({ msalContext }:any) {
  const authRequest = { ...accessRequest };
useEffect(() => {
  console.log('dummy',msalContext);
}, []);

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      // errorComponent={ErrorComponent}
      // loadingComponent={Loading}
    >
      <ProfileContent msalContext={msalContext}/>
    </MsalAuthenticationTemplate>
  );
}

export default withMsal(ChatBox);
