import { useParams } from "react-router-dom";
import ArticleDetails from "../components/ArticleDetails";
import { useEffect, useState } from "react";
import api from "../../api";
import { CircularProgress, Container } from "@mui/material";


function ArticlePage({ handleVote, votes }) {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.getArticle(article_id);
        setArticle(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [article_id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <ArticleDetails article={article} handleVote={handleVote} votes={votes} />
    </Container>
  );
}

export default ArticlePage;
