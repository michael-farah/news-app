import { Card, CardContent, Stack, Typography, Avatar } from "@mui/material";
import timeSince from "../utils/timeSince";

const CommentCard = ({ comment }) => (
  <Card>
    <CardContent>
      <Stack spacing={2} direction="row" alignItems="center">
        <Avatar alt={comment.author}>{comment.author.charAt(0)}</Avatar>
        <Typography fontWeight="bold">{comment.author}</Typography>
        <Typography>{timeSince(comment.created_at)}</Typography>
      </Stack>
      <Typography sx={{ p: "20px 0" }}>{comment.body}</Typography>
    </CardContent>
  </Card>
);

export default CommentCard;