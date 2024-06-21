import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

function MobileDrawer({ mobileOpen, handleDrawerToggle }) {
  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        <ListItem>
          <ListItemButton
            component={Link}
            to="/articles"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Articles" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton
            component={Link}
            to="/topics"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Topics" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default MobileDrawer;