import ArticleList from "../components/ArticleList";

function Homepage({ articles, votes, handleVote }) {
  return (
    <ArticleList articles={articles} votes={votes} handleVote={handleVote} />
  );
}

export default Homepage;
