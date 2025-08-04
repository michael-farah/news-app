import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import {
  Avatar,
  Card,
  CircularProgress,
  Stack,
  TextField,
  Box,
  IconButton,
  Alert,
  Typography,
  Link,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import api from "../../api";

function CommentForm({ articleId, onCommentPosted, onPostSuccess }) {
  const { user, setLoginOpen } = useUser();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onLoginClick = () => setLoginOpen(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!comment.trim()) {
      return;
    }
    if (!user) {
      onLoginClick();
      return;
    }
    setIsSubmitting(true);
    setError(null);

    const optimisticComment = {
      article_id: articleId,
      author: user.username,
      body: comment,
      votes: 0,
      created_at: new Date().toISOString(),
      isOptimistic: true,
    };
    onCommentPosted(optimisticComment);
    setComment("");

    try {
      await api.postComment(articleId, {
        username: user.username,
        body: comment,
      });
      onPostSuccess();
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
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ ml: 0.5 }}
          >
            {user ? (
              <Avatar
                alt={user.username}
                src={user.avatar_url}
                onClick={onLoginClick}
                style={{ border: "0.1px lightgrey solid" }}
              />
            ) : (
              <Avatar />
            )}
            <Typography sx={{ flex: 1 }}>
              {user ? (
                <Link
                  onClick={onLoginClick}
                  style={{ textDecoration: "none" }}
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  {user.username}
                </Link>
              ) : (
                <Stack alignItems="center" direction="row" gap={2}>
                  <Alert severity="info">
                    <Typography>
                      Please <Link onClick={onLoginClick}>login</Link> to
                      comment on this article
                    </Typography>
                  </Alert>
                </Stack>
              )}
            </Typography>
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