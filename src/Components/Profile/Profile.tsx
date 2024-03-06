import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
function Profile(props: any) {
  const { handlelogout } = props;
  const navigate = useNavigate();
  function logout() {
    window.sessionStorage.removeItem("user");
    navigate("/");
    handlelogout(true);
  }
  return (
    <div className="profileContainer">
      <Button variant="outlined" onClick={() => logout()}>
        logout
      </Button>
    </div>
  );
}

export default Profile;
