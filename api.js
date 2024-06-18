import axios from "axios";

const api = axios.create({
  baseURL: "https://news-api-zkr3.onrender.com/api",
});

export default {
  getArticles: () => api.get("/articles"),
  getArticle: (id) => api.get(`/articles/${id}`),
  getCommentsByArticleId: (id) => api.get(`/articles/${id}/comments`),
  patchVotes: (id, votes) => api.patch(`/articles/${id}`, { inc_votes: votes }),
};