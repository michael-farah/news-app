import {
  Container,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  ButtonBase,
} from "@mui/material";
import {
  CodeOutlined as CodeOutlinedIcon,
  SportsSoccerOutlined as SportsSoccerOutlinedIcon,
  DinnerDiningOutlined as DinnerDiningOutlinedIcon,
  TopicOutlined as TopicOutlinedIcon,
} from "@mui/icons-material";
import { useLoaderData, Link } from "react-router-dom";

function TopicList() {
  const { topics } = useLoaderData();

  const getIconComponent = (slug) => {
    switch (slug) {
      case "coding":
        return <CodeOutlinedIcon style={{ fontSize: 150 }} />;
      case "football":
        return <SportsSoccerOutlinedIcon style={{ fontSize: 150 }} />;
      case "cooking":
        return <DinnerDiningOutlinedIcon style={{ fontSize: 150 }} />;
      default:
        return <TopicOutlinedIcon style={{ fontSize: 150 }} />;
    }
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Topics
      </Typography>
      <Grid container spacing={2}>
        {topics.map((topic) => (
          <Grid item key={topic.slug} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, m: 1 }}>
              <ButtonBase
                component={Link}
                to={`/topic/${topic.slug}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <CardHeader
                  title={
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{ textTransform: "none", mt: 1 }}
                    >
                      {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                    </Typography>
                  }
                />
                <CardMedia
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                  }}
                >
                  {getIconComponent(topic.slug)}
                </CardMedia>
                <CardContent>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ textTransform: "none" }}
                  >
                    {topic.description}
                  </Typography>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default TopicList;