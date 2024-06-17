import axios from "axios";

const api = axios.create({
  baseURL: "https://news-api-zkr3.onrender.com/api/",
});

export default {
  getArticles: api.get("/articles"),
  patchVotes: (id, votes) => {
    return api.patch(`/articles/${id}`, { inc_votes: votes });
  },
};
