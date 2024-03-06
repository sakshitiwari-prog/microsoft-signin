import * as React from "react";

import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AlignItemsList from "../FriendsItem/FriendsItem";
import "./style.css";
import { Button, InputBase, Paper, TextField } from "@mui/material";

function Footer(props: any) {
  const { handleSendMsg } = props;
  const [msg, setMsg] = React.useState("");

  function handleSubmit(e: any) {
    e.preventDefault();

    handleSendMsg(msg);
    setMsg("");
  }
  return (
    <div className="footerContainer">
      <Paper
        component="form"
        onSubmit={(e) => handleSubmit(e)}
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          value={msg}
          style={{ width: "100%" }}
          onChange={(val) => setMsg(val.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Type your message here..."
          inputProps={{ "aria-label": "search google maps" }}
        />
        <Button variant="outlined" type="submit">
          send
        </Button>
      </Paper>
    </div>
  );
}

export default Footer;
