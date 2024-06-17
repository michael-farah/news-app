import { useEffect, useState } from "react";
import api from "../../api";
import ArticleCard from "./ArticleCard";
import { Container, Grid, Typography } from "@mui/material";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await api.getArticles;
      setArticles(data);
    };

    fetchArticles();
  }, []);

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
