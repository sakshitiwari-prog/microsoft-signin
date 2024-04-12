import * as React from "react";

import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AlignItemsList from "../FriendsItem/FriendsItem";
import "./style.css";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function SideBar(props: any) {
  const { onlineUsers, user, roomData, setRoomData } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    // console.log(onlineUsers, "onlineUsers");
  });

  return (
    <div className="sideBarContainer">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="User List" {...a11yProps(0)} />
            <Tab label="Chat List" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AlignItemsList
            roomData={roomData}
            setRoomData={setRoomData}
            onlineUsers={onlineUsers}
            user={user}
          ></AlignItemsList>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AlignItemsList
            onlineUsers={onlineUsers}
            user={user}
            roomData={roomData}
            setRoomData={setRoomData}
            isUserList={true}
          ></AlignItemsList>
        </CustomTabPanel>
      </Box>
    </div>
  );
}

export default SideBar;
