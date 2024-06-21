import { useEffect, useState, useCallback } from "react";
import { useUser } from "../contexts/UserContext";
import LoginForm from "./LoginForm";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { getUserFromCookie, setUserInCookie } from "../utils/cookieUtils";
import MobileDrawer from "./MobileDrawer";

function NavigationBar() {
  const { user, loginOpen, setLoginOpen, setUser } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleLoginOpen = useCallback(() => setLoginOpen(true), [setLoginOpen]);
  const handleLoginClose = useCallback(
    () => setLoginOpen(false),
    [setLoginOpen],
  );
  const handleLogout = useCallback(() => {
    setUser(null);
    setUserInCookie(null);
    setLoginOpen(false);
  }, [setUser, setUserInCookie, setLoginOpen]);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevMobileOpen) => !prevMobileOpen);
  }, []);

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
              onClick={handleDrawerToggle}
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
          {!isMobile && (
            <Grid container justifyContent="center">
              <Button component={Link} to="/articles" color="inherit">
                Articles
              </Button>
              <Button component={Link} to="/topics" color="inherit">
                Topics
              </Button>
            </Grid>
          )}
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
      <MobileDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </nav>
  );
}

export default NavigationBar;
