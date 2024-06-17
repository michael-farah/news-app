import { useRouteError } from "react-router-dom";
import { Container, Typography } from "@mui/material";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container>
      <Typography variant="h3" align="center">
        Oops!
      </Typography>
      <Typography variant="h6" align="center">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body1" align="center" color="error">
        <i>{error.statusText || error.message}</i>
      </Typography>
    </Container>
  );
}