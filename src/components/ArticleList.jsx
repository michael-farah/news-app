import { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import ArticleCard from "./ArticleCard";
import ArticleCardSkeleton from "./ArticleCardSkeleton";
import { useParams } from "react-router-dom";
import ArticleDropdown from "./ArticleDropdown";
import { fetchArticles } from "../../api";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const { slug: topic } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchArticles(topic, sortBy, order)
      .then((data) => {
        setArticles(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. The backend API might be down.");
        setLoading(false);
      });
  }, [topic, sortBy, order]);

  if (loading) {
    return (
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          {topic
            ? `${topic.charAt(0).toUpperCase() + topic.slice(1)} Articles`
            : "All Articles"}
        </Typography>
        <ArticleDropdown
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
        />
        <Grid container spacing={2}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <ArticleCardSkeleton />
            </Grid>
          ))}
        </Grid>
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
        {topic
          ? `${topic.charAt(0).toUpperCase() + topic.slice(1)} Articles`
          : "All Articles"}
      </Typography>
      <ArticleDropdown
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
      />
      <Grid container spacing={2}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <Grid item key={article.article_id} xs={12} sm={6} md={4}>
              <ArticleCard article={article} />
            </Grid>
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', width: '100%', mt: 4 }}>
            No articles found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default ArticleList;