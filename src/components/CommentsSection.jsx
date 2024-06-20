import { Box, Stack, Typography } from "@mui/material";
import CommentCard from "./CommentCard";

const CommentsSection = ({ comments, setComments }) => (
  <Box sx={{ mt: 2 }}>
    <Typography variant="h6" gutterBottom>
      Comments
    </Typography>
    <Stack spacing={2}>
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          comment={comment}
          setComments={setComments}
        />
      ))}
    </Stack>
  </Box>
);

export default CommentsSection;