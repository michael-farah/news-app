import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArticleDetails from "./components/ArticleDetails";
import ArticleList from "./components/ArticleList";
import TopicList from "./components/TopicList";
import NavBarWrapper from "./components/NavBarWrapper";
import ErrorPage from "./pages/error-page";
import {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  fetchTopics,
} from "../api";
import { UserProvider } from "./contexts/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBarWrapper />,
    errorElement: <ErrorPage />,
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
      {
        path: "/topics",
        element: <TopicList />,
        loader: async () => {
          const topics = await fetchTopics();
          return topics;
        },
      },
      {
        path: "/topic/:slug",
        element: <ArticleList />,
        loader: async ({ params }) => {
          const articles = await fetchArticles(params.slug);
          return articles;
        },
      },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
