import ArticleCard from "./ArticleCard";
import { Container, Grid, Typography } from "@mui/material";

function ArticleList({articles}) {
  

  return (
    <Container>
      <Typography variant="h3" align="center">All Articles</Typography>
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
