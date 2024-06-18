import CommentCard from "./CommentCard";

const CommentsSection = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </>
  );
};

export default CommentsSection;