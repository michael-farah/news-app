import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import api from "../api";
import Homepage from "./pages/home-page";
import ErrorPage from "./pages/error-page";
import { CircularProgress } from "@mui/material";

async function fetchArticles() {
  const { data } = await api.getArticles;
  return data;
}

function createRouter(articles) {
  return createBrowserRouter([
    {
      path: "/",
      element: <Homepage articles={articles} />,
      errorElement: <ErrorPage />,
    },
  ]);
}

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedArticles = await fetchArticles();
      setArticles(fetchedArticles);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <CircularProgress aria-busy aria-label="Loading" />
  ) : (
    <RouterProvider router={createRouter(articles)} />
  );
}

export default App;