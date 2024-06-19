import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";

function NavigationBar() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
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
          <Typography variant="h6" color="inherit" noWrap>
            News App
          </Typography>
        </Toolbar>
      </AppBar>
    </nav>
  );
}

export default NavigationBar;