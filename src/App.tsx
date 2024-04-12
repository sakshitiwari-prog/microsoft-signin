import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpSide from "./Pages/SignUpSide/SignUpSide";
import SignInSide from "./Pages/SignInSide/SignInSide";
import { MsalProvider, useMsal } from '@azure/msal-react';
import Home from "./Pages/Home/Home";
import socket from "./socket";
import { useEffect } from "react";

function App({instance}:any) {
  return (
    <MsalProvider instance={instance}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpSide />} />
        <Route path="/signIn" element={<SignInSide />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </MsalProvider>
  );
}

export default App;
