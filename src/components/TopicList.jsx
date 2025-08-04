import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  ButtonBase,
  CircularProgress,
} from "@mui/material";
import {
  CodeOutlined as CodeOutlinedIcon,
  SportsSoccerOutlined as SportsSoccerOutlinedIcon,
  DinnerDiningOutlined as DinnerDiningOutlinedIcon,
  TopicOutlined as TopicOutlinedIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { fetchTopics } from "../../api";

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

function TopicList() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchTopics()
      .then((data) => {
        // API returns { topics: [...] }
        setTopics(data.topics || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching topics:", err);
        setError("Failed to load topics. The backend API might be down.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography>Loading topics...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Topics
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {topics.map((topic) => (
          <Grid item key={topic.slug} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, m: "auto" }}>
              <ButtonBase
                component={Link}
                to={`/topic/${topic.slug}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  width: '100%',
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