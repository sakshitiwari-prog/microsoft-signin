import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function AlignItemsList(props: any) {
  const { onlineUsers, user, isUserList, roomData, setRoomData } = props;
  React.useEffect(() => {
    // console.log(user.user.userId, onlineUsers, "sisdebar");
  }, []);
  function handleRoomData(user: any) {
    setRoomData({
      ...roomData,
      room: "1",
      reciever: user,
    });
  }
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {onlineUsers &&
        onlineUsers.length > 0 &&
        (!isUserList
          ? onlineUsers
              .filter((item: any) => {
                // console.log(item.userData.userId !== user.user.userId);

                return item.userData.userId !== user.user.userId;
              })
              .map((user: any, index: number) => {
                return (
                  <div key={index} onClick={() => handleRoomData(user)}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.userData.email}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Ali Connors
                            </Typography>
                            {
                              " — I'll be in your neighborhood doing errands this…"
                            }
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                );
              })
          : onlineUsers.map((user: any, index: number) => {
              return (
                <div key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.userData.email}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Ali Connors
                          </Typography>
                          {
                            " — I'll be in your neighborhood doing errands this…"
                          }
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              );
            }))}
    </List>
  );
}
