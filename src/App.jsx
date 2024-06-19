import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArticleDetails from "./components/ArticleDetails";
import ArticleList from "./components/ArticleList";
import NavBarWrapper from "./components/NavBarWrapper";
import {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
} from "../api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBarWrapper />,
    children: [
      {
        path: "/",
        element: <ArticleList />,
        loader: async () => {
          const articles = await fetchArticles();
          return articles;
        },
      },
      {
        path: "/articles",
        element: <ArticleList />,
        loader: async () => {
          const articles = await fetchArticles();
          return articles;
        },
      },
      {
        path: "/articles/:articleId",
        element: <ArticleDetails />,
        id: "article-details",
        loader: async ({ params }) => {
          const article = await fetchArticleById(params.articleId);
          const comments = await fetchCommentsByArticleId(params.articleId);
          return { article, comments };
        },
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;