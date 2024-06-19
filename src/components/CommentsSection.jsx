import CommentCard from "./CommentCard";

const CommentsSection = ({ comments }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <CommentCard key={`${comment.comment_id}-${index}`} comment={comment} />
      ))}
    </>
  );
};

export default CommentsSection;