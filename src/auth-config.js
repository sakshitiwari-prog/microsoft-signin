import {
  EventType,
  LogLevel,
  PublicClientApplication,
} from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "905b5933-7b18-4274-a196-e398c92ed806", // This is the ONLY mandatory field that you need to supply.
    authority: "https://login.microsoftonline.com/common", // Choose SUSI as your default authority.
    redirectUri: window.location.origin, // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
    postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            // console.error(message);
            return;
          case LogLevel.Info:
            // console.info(message);
            return;
          case LogLevel.Verbose:
            // console.debug(message);
            return;
          case LogLevel.Warning:
            // console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };
  
export const accessRequest = {
  scopes: ["User.Read"],
};
export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
  // Add your initialization logic here
  // For example, set active account, enable account storage events, add event callbacks, etc.

  // Default to using the first account if no account is active on page load
  if (
    !msalInstance.getActiveAccount() &&
    msalInstance.getAllAccounts().length > 0
  ) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  msalInstance.addEventCallback((event) => {
    if (
      (event.eventType === EventType.LOGIN_SUCCESS ||
        event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
        event.eventType === EventType.SSO_SILENT_SUCCESS) &&
      event.payload.account
    ) {
      msalInstance.setActiveAccount(event.payload.account);
    }
  });
});
