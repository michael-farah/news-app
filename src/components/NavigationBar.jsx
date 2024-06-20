import { useUser } from "../contexts/UserContext";
import LoginForm from "./LoginForm";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { getUserFromCookie, setUserInCookie } from "../utils/cookieUtils";

function NavigationBar() {
  const { user, loginOpen, setLoginOpen, setUser } = useUser();
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const handleLogout = () => {
    setUser(null);
    setUserInCookie(null);
    setLoginOpen(false);
  };
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const savedUser = getUserFromCookie();
    if (savedUser) {
      setUser(savedUser);
    }
  }, [setUser]);

  return (
    <nav>
      <AppBar position="static" color="primary">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Grid container alignItems="center">
            <Typography variant="h6" color="inherit" noWrap>
              News App
            </Typography>
          </Grid>
          <Grid container justifyContent="flex-end">
            <IconButton onClick={handleLoginOpen}>
              {user ? (
                <>
                  <Typography variant="h6" color="white">
                    {user.username}
                  </Typography>
                  <Avatar
                    sx={{ ml: 2 }}
                    src={user.avatar_url}
                    style={{ border: "0.1px lightgrey solid" }}
                  />
                </>
              ) : (
                <>
                  <Typography variant="h6" color="white">
                    Login
                  </Typography>
                  <Avatar sx={{ ml: 2 }} />
                </>
              )}
            </IconButton>
          </Grid>
        </Toolbar>
        <LoginForm
          open={loginOpen}
          onClose={handleLoginClose}
          submitCookie={setUserInCookie}
          logout={handleLogout}
        />
      </AppBar>
    </nav>
  );
}

export default NavigationBar;