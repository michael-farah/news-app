import { Box, Stack, Typography } from "@mui/material";
import CommentCard from "./CommentCard";

const CommentsSection = ({ comments, setComments, users }) => (
  <Box sx={{ mt: 2 }}>
    <Typography variant="h6" gutterBottom>
      Comments
    </Typography>
    <Stack spacing={2}>
      {comments.map((comment) => (
        <CommentCard
          key={comment.isOptimistic ? comment.created_at : comment.comment_id}
          comment={comment}
          setComments={setComments}
          users={users}
        />
      ))}
    </Stack>
  </Box>
);

export default CommentsSection;