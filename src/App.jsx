import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import api from "../api";
import Homepage from "./pages/home-page";
import ErrorPage from "./pages/error-page";
import ArticlePage from "./pages/article-page";
import Layout from "./components/layout";
import { CircularProgress } from "@mui/material";

function App() {
  const [articles, setArticles] = useState([]);
  const [votes, setVotes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const { data } = await api.getArticles();
      setArticles(data);
      const initialVotes = data.reduce((acc, article) => {
        acc[article.article_id] = article.votes;
        return acc;
      }, {});
      setVotes(initialVotes);
    } catch (error) {
      console.error("Failed to fetch articles", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleVote = async (articleId, increment) => {
    try {
      await api.patchVotes(articleId, increment);
      setVotes((prevVotes) => ({
        ...prevVotes,
        [articleId]: prevVotes[articleId] + increment,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <CircularProgress aria-busy aria-label="Loading" />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <Homepage
              articles={articles}
              votes={votes}
              handleVote={handleVote}
            />
          ),
        },
        {
          path: "articles",
          element: (
            <Homepage
              articles={articles}
              votes={votes}
              handleVote={handleVote}
            />
          ),
        },
        {
          path: "articles/:article_id",
          element: (
            <ArticlePage
              articles={articles}
              votes={votes}
              handleVote={handleVote}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;