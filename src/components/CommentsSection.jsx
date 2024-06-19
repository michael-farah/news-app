import { Box, Stack, Typography } from "@mui/material";
import CommentCard from "./CommentCard";

const CommentsSection = ({ comments }) => (
  <Box sx={{ mt: 2 }}>
    <Typography variant="h6" gutterBottom>
      Comments
    </Typography>
    <Stack spacing={2}>
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </Stack>
  </Box>
);

export default CommentsSection;