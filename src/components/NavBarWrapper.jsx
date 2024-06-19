import NavigationBar from "./NavigationBar";
import { Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function NavBarWrapper() {
  return (
    <>
      <NavigationBar />
      <main>
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Outlet />
          </Box>
        </Container>
      </main>
    </>
  );
}

export default NavBarWrapper;