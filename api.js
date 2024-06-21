import axios from "axios";

const api = axios.create({
  baseURL: "https://news-api-zkr3.onrender.com/api",
});

export const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};

export const fetchArticles = async (topic = null) => {
  try {
    const response = await api.get("/articles", {
      params: { topic },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching articles:", err);
    throw err;
  }
};

export const fetchArticleById = async (articleId) => {
  try {
    const response = await api.get(`/articles/${articleId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching article by ID:", err);
    throw err;
  }
};

export const fetchCommentsByArticleId = async (articleId) => {
  try {
    const response = await api.get(`/articles/${articleId}/comments`);
    return response.data;
  } catch (err) {
    console.error("Error fetching comments by article ID:", err);
    throw err;
  }
};

export const postComment = async (articleId, commentData) => {
  try {
    const response = await api.post(
      `/articles/${articleId}/comments`,
      commentData,
    );
    return response.data;
  } catch (err) {
    console.error("Error posting comment:", err);
    throw err;
  }
};

export const patchVotes = async (articleId, increment) => {
  try {
    const response = await api.patch(`/articles/${articleId}`, {
      inc_votes: increment,
    });
    return response.data;
  } catch (err) {
    console.error("Error updating votes:", err);
    throw err;
  }
};

export const deleteComment = async (commentId) => {
  try {
    await api.delete(`/comments/${commentId}`);
  } catch (err) {
    console.error("Error deleting comment:", err);
    throw err;
  }
};

export const fetchTopics = async () => {
  try {
    const response = await api.get("/topics");
    return response.data;
  } catch (err) {
    console.error("Error fetching topics:", err);
    throw err;
  }
};

export default {
  deleteComment,
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  fetchTopics,
  fetchUsers,
  postComment,
  patchVotes,
};