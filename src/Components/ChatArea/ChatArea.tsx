import * as React from "react";

import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AlignItemsList from "../FriendsItem/FriendsItem";
import "./style.css";
import { Card, CardContent } from "@mui/material";

function ChatArea(props: any) {
  const { reciever_email, allMsg } = props;
  return (
    <div className="chatAreaContainer">
      {allMsg &&
        allMsg.length > 0 &&
        allMsg.map((item: any, index: number) => {
          return (
            <Card sx={{ minWidth: 275 }} className="msgBox" key={index}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {item.sender.userData.email}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {item.msg}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}

export default ChatArea;
