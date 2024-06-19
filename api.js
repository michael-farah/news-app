import axios from "axios";

const api = axios.create({
  baseURL: "https://news-api-zkr3.onrender.com/api",
});

export default {
  getArticles: () => api.get("/articles"),
  getArticle: (id) => api.get(`/articles/${id}`),
  postComment: async (articleId, comment) => {
    try {
      const response = await api.post(
        `/articles/${articleId}/comments`,
        comment,
      );
      return response.data;
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error;
    }
  },
  getCommentsByArticleId: (id) => api.get(`/articles/${id}/comments`),
  patchVotes: (id, votes) => api.patch(`/articles/${id}`, { inc_votes: votes }),
};