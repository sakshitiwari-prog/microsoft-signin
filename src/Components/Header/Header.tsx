import * as React from "react";

import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AlignItemsList from "../FriendsItem/FriendsItem";
import "./style.css";

function Header(props: any) {
  const { roomData } = props;
  return (
    <div className="headerContainer">
      <h1>{roomData.reciever.userData.email}</h1>
    </div>
  );
}

export default Header;
