import { useEffect,  useState } from "react";
import "./style.css";
import { Button } from "@mui/material";
import { graphConfig } from "../../auth-config";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import {
  InteractionRequiredAuthError,
  InteractionType,
} from "@azure/msal-browser";
import { accessRequest } from "../../auth-config";
async function callMsGraph(msalInstance: any) {
  let accessToken;
  try {
    const account = msalInstance.getActiveAccount();
    if (!account) {
      throw Error(
        "No active account! Verify a user has been signed in and setActiveAccount has been called."
      );
    }
    const response = await msalInstance.acquireTokenSilent({
      ...accessRequest,
      account: account,
    });
    accessToken = response.accessToken;
  } catch (error) {
    throw error;
  }

  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}
function ProfileContent({ msalContext }: any) {
  const [graphData, setGraphData] = useState(null);

  const fetchData = async () => {
    console.log('run');
    
    try {
      const account = msalContext.instance.getActiveAccount(); // Get active account
      if (!account) {
        throw Error(
          "No active account! Verify a user has been signed in and setActiveAccount has been called."
        );
      }

      const response = await callMsGraph(msalContext.instance); // Pass MSAL instance to callMsGraph function
      setGraphData(response);
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        msalContext.instance
          .loginPopup({
            ...accessRequest,
          })
          .then(() => {
            // After successful login, fetch data
            fetchData();
          })
          .catch((error: any) => {
            console.log(error, "error");
          });
      }
    }
  };
  const handleSignOut = () => {
    msalContext.instance.logout();
    // Optionally, you can redirect the user to a different page after logout
    // window.location.href = '/logout';
  };
  useEffect(() => {
    console.log(graphData, "graphData");
  }, [graphData]);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p>hy</p>
      {graphData && (
        <>
          <Button onClick={handleSignOut}>Sign Out</Button>
          <p>done</p>{" "}
        </>
      ) }
    </div>
  );
}

export default function Home() {
  const instance :any= useMsal();
  const [isSignInClicked, setIsSignInClicked] = useState(false);

  const authRequest = {
    ...accessRequest,
  };

  const handleSignInClick = () => {
    setIsSignInClicked(true);
  };

  return (
    <div className="homeContainer">
      {/* Render the Sign In button if isSignInClicked is false */}
      {!isSignInClicked && (
        <button onClick={handleSignInClick}>Sign In</button>
      )}
 
      {/* Render the MsalAuthenticationTemplate only when isSignInClicked is true */}
      {isSignInClicked && (
        <MsalAuthenticationTemplate
          interactionType={InteractionType.Popup}
          // interactionType={InteractionType.Redirect}
          authenticationRequest={authRequest}
        >
         <ProfileContent msalContext={instance} />
        </MsalAuthenticationTemplate>
      )}
    </div>
  );
}

