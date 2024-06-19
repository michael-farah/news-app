import { useState } from "react";
import {
  Avatar,
  Card,
  CircularProgress,
  Stack,
  TextField,
  Box,
  IconButton,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import api from "../../api";

function CommentForm({ articleId, onCommentPosted }) {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!comment.trim() || !username.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const newComment = {
      article_id: articleId,
      author: username,
      body: comment,
      votes: 0,
      created_at: new Date().toISOString(),
    };

    try {
      onCommentPosted(newComment);
      setComment("");
      setUsername("");
      await api.postComment(articleId, { username, body: comment });
    } catch (err) {
      console.error("Error posting comment:", err);
      setError("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card sx={{ mt: 2 }}>
      <Box sx={{ p: "15px" }}>
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar alt={username}>{username.charAt(0).toUpperCase()}</Avatar>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ flex: 1 }}
            />
          </Stack>
          <Box sx={{ position: "relative", mt: 2 }}>
            <TextField
              sx={{ mt: 2 }}
              multiline
              fullWidth
              minRows={4}
              id="outlined-multiline"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <IconButton
              size="small"
              type="submit"
              sx={{
                position: "absolute",
                right: 8,
                bottom: 8,
                bgcolor: "white",
                color: "primary.main",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : <SendIcon />}
            </IconButton>
          </Box>
        </form>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Card>
  );
}

export default CommentForm;