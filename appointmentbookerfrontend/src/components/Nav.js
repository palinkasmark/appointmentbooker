import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

export default function Nav({ isLoggedIn }) {
  const navigate = useNavigate();

  const navigateTo = (page) => {
    navigate(`/${page}`);
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Appointment Booker</Typography>

          {isLoggedIn ? (
            <Button color="error" variant="contained" onClick={logOut}>
              LogOut
            </Button>
          ) : (
            <>
              <Button
                color="success"
                variant="contained"
                onClick={() => navigateTo("login")}
              >
                Login
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={() => navigateTo("signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
