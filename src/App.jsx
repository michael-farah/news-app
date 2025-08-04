import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArticleDetails from "./components/ArticleDetails";
import ArticleList from "./components/ArticleList";
import TopicList from "./components/TopicList";
import NavBarWrapper from "./components/NavBarWrapper";
import ErrorPage from "./pages/error-page";
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
      },
      {
        path: "/articles",
        element: <ArticleList />,
      },
      {
        path: "/articles/:articleId",
        element: <ArticleDetails />,
        id: "article-details",
      },
      {
        path: "/topics",
        element: <TopicList />,
      },
      {
        path: "/topic/:slug",
        element: <ArticleList />,
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
