import { Container, Grid, Typography } from "@mui/material";
import ArticleCard from "./ArticleCard";
import { useLoaderData, useParams } from "react-router-dom";

function ArticleList() {
  const articles = useLoaderData();
  const { slug: topic } = useParams();

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        {topic
          ? `${topic.charAt(0).toUpperCase() + topic.slice(1)} Articles`
          : "All Articles"}
      </Typography>
      <Grid container spacing={2}>
        {articles.map((article) => (
          <Grid item key={article.article_id} xs={12} sm={6} md={4}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ArticleList;